import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 全てのレシピを取得するためのリゾルバ
export const recipes = async () => {
  return prisma.recipe.findMany({
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
