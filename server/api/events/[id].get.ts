import { verifyAuth } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const prisma = usePrisma();
  const id = event.context.params?.id;

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Event ID is required",
    });
  }

  try {
    // Find the event
    const foundEvent = await prisma.event.findUnique({
      where: { id },
    });

    if (!foundEvent) {
      throw createError({
        statusCode: 404,
        message: "Event not found",
      });
    }

    // If event is inactive, check if user is authenticated
    if (!foundEvent.isActive) {
      try {
        // Try to verify auth - if it fails, user is not authenticated
        await verifyAuth(event);
        // User is authenticated, allow access to inactive event
      } catch {
        // User is not authenticated, deny access to inactive event
        throw createError({
          statusCode: 401,
          message: "Unauthorized: Cannot access inactive events",
        });
      }
    }

    // Event is active or user is authenticated, return the event
    return foundEvent;
  } catch (error: unknown) {
    console.error("Event fetch error:", error);
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
