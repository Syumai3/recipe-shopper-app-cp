import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ユーザーIDに基づいてレシピを取得するクエリ
export const recipesByUserId = async (
  _: unknown,
  { userId }: { userId: string },
) => {
  return prisma.recipe.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true,
      recipeIngredients: {
        include: {
          ingredient: {
            include: {
              unit: true,
            },
          },
        },
      },
    },
  });
};
