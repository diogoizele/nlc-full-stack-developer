/**
 * This script is only used to facilitate the application test, creating a initial user.
 * In a production application, this script shouldn't be exist.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const ADMIN_EMAIL = "admin@mail.com";
const ADMIN_PASS = "admin";
const SALT_ROUNDS = 10;

async function main() {
  const admin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!admin) {
    const hash = bcrypt.hashSync(ADMIN_PASS, SALT_ROUNDS);

    await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: hash,
      },
    });
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
    process.exit(0);
  });
