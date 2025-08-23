import { PrismaClient } from "@prisma/client";
import { RRule } from "rrule";
import { v4 as uuidv4 } from "uuid";

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
    const masterId = uuidv4();
    const duration = endsAt.getTime() - startsAt.getTime();

    // Create all recurring events
    const events = await prisma.event.createMany({
      data: repeatDates.map((date) => ({
        ...body,
        startsAt: date,
        endsAt: new Date(date.getTime() + duration),
        recurringEventId: masterId,
        recurrenceRule: body.recurrenceRule,
      })),
    });

    return events;
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
