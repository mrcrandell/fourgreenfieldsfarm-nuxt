import { verifyAuth } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  // Verify authentication first
  const user = await verifyAuth(event);
  const prisma = usePrisma();

  const body = await readBody(event);
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Event ID is required",
    });
  }

  try {
    // Find the event
    const existingEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      throw createError({
        statusCode: 404,
        message: "Event not found",
      });
    }

    const scope = body.scope ?? "single";

    // Prepare update data - only include schema fields
    const updateData: any = {
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      hauntedBy: body.hauntedBy || null,
      isAllDay: body.isAllDay,
      isHasEndsAt: body.isHasEndsAt,
      isFeatured: body.isFeatured,
      isActive: body.isActive,
      recurrenceRule: body.recurrenceRule || null,
    };

    if (body.startsAt) {
      updateData.startsAt = new Date(body.startsAt);
    }
    if (body.endsAt) {
      updateData.endsAt = new Date(body.endsAt);
    }

    if (scope === "single" || !existingEvent.recurringEventId) {
      // Update single event
      const updated = await prisma.event.update({
        where: { id },
        data: updateData,
      });
      return { ...updated, updatedBy: user.email };
    }

    // Update recurring events
    if (scope === "future") {
      // For future scope, we need to update each event individually to preserve intervals
      const futureEvents = await prisma.event.findMany({
        where: {
          AND: [
            { recurringEventId: existingEvent.recurringEventId },
            { startsAt: { gte: existingEvent.startsAt } },
          ],
        },
        orderBy: { startsAt: "asc" },
      });

      // Calculate the time difference if dates are being updated
      let startTimeDifference = 0;
      let endTimeDifference = 0;

      if (body.startsAt) {
        const originalStart = existingEvent.startsAt;
        const newStart = new Date(body.startsAt);
        startTimeDifference = newStart.getTime() - originalStart.getTime();
      }

      if (body.endsAt) {
        const originalEnd = existingEvent.endsAt;
        const newEnd = new Date(body.endsAt);
        endTimeDifference = newEnd.getTime() - originalEnd.getTime();
      }

      // Update each event individually
      const updatedEvents = await Promise.all(
        futureEvents.map(async (futureEvent) => {
          const eventUpdateData = { ...updateData };

          // If we're updating dates, preserve the interval from the original event
          if (body.startsAt && futureEvent.id !== existingEvent.id) {
            eventUpdateData.startsAt = new Date(
              futureEvent.startsAt.getTime() + startTimeDifference,
            );
          }
          if (body.endsAt && futureEvent.id !== existingEvent.id) {
            eventUpdateData.endsAt = new Date(
              futureEvent.endsAt.getTime() + endTimeDifference,
            );
          }

          return await prisma.event.update({
            where: { id: futureEvent.id },
            data: eventUpdateData,
          });
        }),
      );

      return { events: updatedEvents, updatedBy: user.email };
    } else {
      // For "all" scope, we can still use updateMany since we want all events to be identical
      const whereClause = { recurringEventId: existingEvent.recurringEventId };

      await prisma.event.updateMany({
        where: whereClause,
        data: updateData,
      });

      const events = await prisma.event.findMany({
        where: whereClause,
        orderBy: { startsAt: "asc" },
      });

      return { events, updatedBy: user.email };
    }
  } catch (error: unknown) {
    console.error("Event update error:", error);
    if (error instanceof Error && "statusCode" in error) {
      const errWithStatus = error as Error & { statusCode?: number };
      throw createError({
        statusCode: errWithStatus.statusCode || 500,
        message: error.message || "Internal server error",
      });
    } else {
      throw createError({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  }
});
