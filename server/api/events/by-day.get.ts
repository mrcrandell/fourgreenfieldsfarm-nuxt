import { PrismaClient } from "@prisma/client";
import { parseISO, format } from "date-fns";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    const queryOptions = {
      where: {
        isActive: true,
      } as any,
      orderBy: {
        startsAt: "asc" as const,
      },
    };

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

    // Group events by day label (e.g., "Saturday, October 25, 2025")
    const grouped: Array<{ day: string; dayOfMonth: number; events: any[] }> =
      [];
    const map = new Map<string, { dayOfMonth: number; events: any[] }>();

    for (const event of events) {
      const dateObj = new Date(event.startsAt);
      const dayLabel = format(dateObj, "EEEE, MMMM d, yyyy");
      const dayOfMonth = dateObj.getDate();

      if (!map.has(dayLabel)) {
        map.set(dayLabel, { dayOfMonth, events: [] });
      }
      map.get(dayLabel)!.events.push(event);
    }

    // Convert map to array and sort by date
    for (const [day, { dayOfMonth, events }] of map.entries()) {
      grouped.push({ day, dayOfMonth, events });
    }

    grouped.sort((a, b) => {
      const aDate = new Date(a.events[0].startsAt);
      const bDate = new Date(b.events[0].startsAt);
      return aDate.getTime() - bDate.getTime();
    });

    return grouped;
  } catch (error: any) {
    console.error("Events by-day fetch error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  } finally {
    await prisma.$disconnect();
  }
});
