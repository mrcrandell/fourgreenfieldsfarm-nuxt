import { parseISO } from "date-fns";
// import prisma from "../../../lib/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const prisma = usePrisma();

  try {
    const queryOptions: any = {
      orderBy: {
        startsAt: "asc",
      },
      where: {
        isActive: true,
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
    if (query.startsAt) {
      queryOptions.where.startsAt = {
        gte: parseISO(query.startsAt as string),
      };
    }
    if (query.endsAt) {
      queryOptions.where.endsAt = {
        lte: parseISO(query.endsAt as string),
      };
    }

    const events = await prisma.event.findMany(queryOptions);

    return events;
  } catch (error: any) {
    console.error("Events fetch error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
