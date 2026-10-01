import { endOfDay, parseISO, startOfDay } from "date-fns";
// import prisma from "../../../lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const prisma = usePrisma();

  try {
    const showPastEvents = query.showPastEvents === "true";
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const queryOptions: any = {
      orderBy: {
        startsAt: "asc",
      },
      where: {
        isActive: true,
        ...(showPastEvents ? {} : {
          startsAt: {
            gte: today,
          },
        }),
      },
    };

    // Handle pagination
    if (query.limit) {
      queryOptions.take = parseInt(query.limit as string);
    }
    if (query.offset) {
      queryOptions.skip = parseInt(query.offset as string);
    }

    // Handle date filtering
    if (query.startsAt || query.endsAt) {
      queryOptions.where.startsAt = {
        ...(query.startsAt
          ? { gte: startOfDay(parseISO(query.startsAt as string)) }
          : queryOptions.where.startsAt),
        ...(query.endsAt
          ? { lte: endOfDay(parseISO(query.endsAt as string)) }
          : {}),
      };
    }

    // Get total count with the same where conditions but without pagination
    const totalEvents = await prisma.event.count({
      where: queryOptions.where,
    });

    const events = await prisma.event.findMany(queryOptions);

    return {
      events,
      total: totalEvents,
    };
  } catch (error: any) {
    console.error("Events fetch error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
