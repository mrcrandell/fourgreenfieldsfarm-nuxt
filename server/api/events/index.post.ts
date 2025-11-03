import { RRule } from "rrule";
// import { v4 as uuidv4 } from "uuid";
import { verifyAuth } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  // Verify authentication first
  const user = await verifyAuth(event);
  const prisma = usePrisma();

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

  if (endsAt < startsAt) {
    throw createError({
      statusCode: 400,
      message: "endsAt must be after or equal to startsAt",
    });
  }

  // Prepare data for database - only include schema fields
  const eventData = {
    name: body.name,
    slug: body.slug,
    startsAt,
    endsAt,
    description: body.description || null,
    hauntedBy: body.hauntedBy || null,
    isAllDay: body.isAllDay ?? false,
    isHasEndsAt: body.isHasEndsAt ?? false,
    isFeatured: body.isFeatured ?? false,
    isActive: body.isActive ?? true,
    recurrenceRule: body.recurrenceRule || null,
  };

  try {
    if (!body.recurrenceRule) {
      // Create single event
      const event = await prisma.event.create({
        data: eventData,
      });
      return { ...event, createdBy: user.email };
    }

    // Handle recurring events
    const rule = RRule.fromString(body.recurrenceRule);
    const repeatDates = rule.all();
    const duration = endsAt.getTime() - startsAt.getTime();

    // Add debugging
    console.log("RRule string:", body.recurrenceRule);
    console.log("Generated dates:", repeatDates.length, repeatDates);

    if (repeatDates.length === 0) {
      throw createError({
        statusCode: 400,
        message: "Invalid recurrence rule - no dates generated",
      });
    }

    if (repeatDates.length === 1) {
      // Only one occurrence, create as single event
      const event = await prisma.event.create({
        data: {
          ...eventData,
          startsAt: repeatDates[0],
          endsAt: new Date(repeatDates[0].getTime() + duration),
        },
      });
      return { ...event, createdBy: user.email };
    }

    // Multiple occurrences - create parent with first date and children with remaining dates
    const parentEvent = await prisma.event.create({
      data: {
        ...eventData,
        startsAt: repeatDates[0],
        endsAt: new Date(repeatDates[0].getTime() + duration),
      },
    });

    // Create the recurring events as children of the parent event
    const childEvents = await prisma.$transaction(
      repeatDates.slice(1).map((date) =>
        prisma.event.create({
          data: {
            ...eventData,
            startsAt: date,
            endsAt: new Date(date.getTime() + duration),
            recurringEventId: parentEvent.id,
          },
        })
      ),
    );

    // Return all events including the parent
    return { events: [parentEvent, ...childEvents], createdBy: user.email };
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
  }
});
