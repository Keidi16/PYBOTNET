import { PrismaClient } from '@prisma/client';
import { ADMIN_DATA } from './data';

const prisma = new PrismaClient();

export async function main() {
  const adminAlreadyExists = await prisma.user.findMany({
    where: {
      roles: { has: 'super' },
    },
  });

  if (adminAlreadyExists.length === 0) {
    await prisma.user.create({
      data: ADMIN_DATA,
    });
  }

  return;
}

main()
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
