import { verifyAuth } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  // Verify authentication first
  const user = await verifyAuth(event);
  const prisma = usePrisma();

  const id = event.context.params?.id;
  const query = getQuery(event);
  const scope = (query.scope as string) ?? "single";

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

    if (scope === "single" || !existingEvent.recurringEventId) {
      // Delete single event
      await prisma.event.delete({
        where: { id },
      });
      return {
        success: true,
        message: "Event deleted successfully",
        deletedBy: user.email,
      };
    }

    // Delete recurring events based on scope
    const whereClause = scope === "future"
      ? {
        AND: [
          { recurringEventId: existingEvent.recurringEventId },
          { startsAt: { gte: existingEvent.startsAt } },
        ],
      }
      : { recurringEventId: existingEvent.recurringEventId };

    // Get count of events to be deleted
    const countToDelete = await prisma.event.count({
      where: whereClause,
    });

    // Delete the events
    await prisma.event.deleteMany({
      where: whereClause,
    });

    return {
      success: true,
      message: `${countToDelete} event(s) deleted successfully`,
      deletedBy: user.email,
      count: countToDelete,
    };
  } catch (error: unknown) {
    console.error("Event deletion error:", error);
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
