import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'hello@turborepo.local' },
    update: {
      password: passwordHash,
    },
    create: {
      email: 'hello@turborepo.local',
      name: 'Starter User',
      password: passwordHash,
    },
  });

  console.log('Database seed complete.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
