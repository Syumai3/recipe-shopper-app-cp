import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 特定のユーザーを取得するためのリゾルバ
export const user = async (_: unknown, { id }: { id: string }) => {
  return prisma.user.findUnique({
    where: { id },
    include: { recipes: true },
  });
};
