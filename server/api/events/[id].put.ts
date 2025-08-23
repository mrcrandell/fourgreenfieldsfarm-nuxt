import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
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
    delete body.scope; // Remove scope from update data

    // Prepare update data
    const updateData = { ...body };
    if (updateData.startsAt)
      updateData.startsAt = new Date(updateData.startsAt);
    if (updateData.endsAt) updateData.endsAt = new Date(updateData.endsAt);

    if (scope === "single" || !existingEvent.recurringEventId) {
      // Update single event
      const updated = await prisma.event.update({
        where: { id },
        data: updateData,
      });
      return updated;
    }

    // Update recurring events
    const whereClause =
      scope === "future"
        ? {
            AND: [
              { recurringEventId: existingEvent.recurringEventId },
              { startsAt: { gte: existingEvent.startsAt } },
            ],
          }
        : { recurringEventId: existingEvent.recurringEventId };

    await prisma.event.updateMany({
      where: whereClause,
      data: updateData,
    });

    // Return updated events
    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: { startsAt: "asc" },
    });

    return events;
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
  } finally {
    await prisma.$disconnect();
  }
});
