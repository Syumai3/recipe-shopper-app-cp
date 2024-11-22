import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 全てのユーザーを取得するためのリゾルバ
export const users = async () => {
  return prisma.user.findMany({
    include: { recipes: true },
  });
};
