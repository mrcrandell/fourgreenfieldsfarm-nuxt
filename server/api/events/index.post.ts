import { PrismaClient } from "@prisma/client";
import { RRule } from "rrule";
// import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Basic validation
  if (!body.name || !body.slug || !body.startsAt || !body.endsAt) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  // Validate dates
  const startsAt = new Date(body.startsAt);
  const endsAt = new Date(body.endsAt);

  if (endsAt <= startsAt) {
    throw createError({
      statusCode: 400,
      message: "endsAt must be after startsAt",
    });
  }

  try {
    if (!body.recurrenceRule) {
      // Create single event
      const event = await prisma.event.create({
        data: {
          ...body,
          startsAt,
          endsAt,
        },
      });
      return event;
    }

    // Handle recurring events
    const rule = RRule.fromString(body.recurrenceRule);
    const repeatDates = rule.all();
    const duration = endsAt.getTime() - startsAt.getTime();

    // Create the parent event first
    const parentEvent = await prisma.event.create({
      data: {
        ...body,
        startsAt,
        endsAt,
      },
    });

    if (repeatDates.length <= 1) {
      return parentEvent;
    }

    // Create the recurring events as children of the parent event
    const childEvents = await prisma.$transaction(
      repeatDates.slice(1).map((date) =>
        prisma.event.create({
          data: {
            ...body,
            startsAt: date,
            endsAt: new Date(date.getTime() + duration),
            recurringEventId: parentEvent.id,
            recurrenceRule: body.recurrenceRule,
          },
        })
      )
    );

    // Return all events including the parent
    return [parentEvent, ...childEvents];
  } catch (error: unknown) {
    console.error("Event creation error:", error);
    let statusCode = 500;
    let message = "Internal server error";
    if (typeof error === "object" && error !== null) {
      if (
        "statusCode" in error &&
        typeof (error as { statusCode?: unknown }).statusCode === "number"
      ) {
        statusCode = (error as { statusCode: number }).statusCode;
      }
      if (
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
      ) {
        message = (error as { message: string }).message;
      }
    }
    throw createError({
      statusCode,
      message,
    });
  } finally {
    await prisma.$disconnect();
  }
});
