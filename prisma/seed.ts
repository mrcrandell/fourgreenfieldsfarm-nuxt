import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

async function main() {
  if (process.env.FORCE_SEED === "true") {
    console.log("Starting database seed...");
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
    console.log("Skipping seed - FORCE_SEED not set to true");
  }
}

await main();
