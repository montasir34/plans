import { PrismaClient } from "@prisma/client";
import bc from 'bcrypt'
async function hash_password(passwordText) {
    return await bc.hash(passwordText, 10);
}
const prisma = new PrismaClient();

async function main() {
  const sharedPassword = await hash_password('plan.123'); // Use hashed passwords in production

  await prisma.user.createMany({
    data: [
      {
        username: "Manager",
        password: sharedPassword, // Shared password
        email: "manager@plan.com",
        role: "MANAGER",
      },
      {
        username: "Supervisor 1",
        password: sharedPassword, // Shared password
        email: "supervisor1@plan.com",
        role: "SUPERVISOR",
      },
      {
        username: "Supervisor 2",
        password: sharedPassword, // Shared password
        email: "supervisor2@plan.com",
        role: "SUPERVISOR",
      },
      {
        username: "Supervisor 3",
        password: sharedPassword, // Shared password
        email: "supervisor3@plan.com",
        role: "SUPERVISOR",
      },
    ],
  });

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
