import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 特定のユーザーを取得するためのリゾルバ
export const recipe = async (_: unknown, { id }: { id: string }) => {
  return prisma.recipe.findUnique({
    where: { id: Number.parseInt(id) },
    include: { user: true },
  });
};
