import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  // Debug: log the DATABASE_URL being used
  // console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
  // console.log(
  //  "DATABASE_URL starts with:",
  //  process.env.DATABASE_URL?.substring(0, 20)
  // );

  // Explicitly pass the datasource to ensure it uses the correct URL
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
