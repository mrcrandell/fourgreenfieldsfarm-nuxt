import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  // Only seed in production
  if (process.env.NODE_ENV === "production") {
    console.log("Starting production database seed...");
    const plainPassword = process.env.DEFAULT_USER_PASSWORD || "changeme";
    const passwordHash = await argon2.hash(plainPassword);

    // Create users
    const users = await Promise.all([
      prisma.user.upsert({
        where: { email: "me@mattcrandell.com" },
        update: {},
        create: {
          id: "f7b3eb6a-4d78-11f0-9fe2-0242ac120002",
          name: "Matt Crandell",
          email: "me@mattcrandell.com",
          password: passwordHash,
        },
      }),
      prisma.user.upsert({
        where: { email: "fourgreenfieldsman@yahoo.com" },
        update: {},
        create: {
          id: "fe34b668-4d78-11f0-9fe2-0242ac120002",
          name: "Kevin Courtney",
          email: "fourgreenfieldsman@yahoo.com",
          password: passwordHash,
        },
      }),
    ]);

    console.log({ users });
  } else {
    console.log("Skipping seed in development environment");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
