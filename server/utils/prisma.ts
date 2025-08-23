import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// will be auto-imported into the server API endpoints
export function usePrisma() {
  return prisma;
}
