import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// レシピを削除するためのミューテーション
export const deleteRecipe = async (_: unknown, { id }: { id: number }) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const recipe = await tx.recipe.findUnique({
        where: { id },
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

      if (!recipe) {
        throw new Error('Recipe not found');
      }

      await tx.recipeIngredient.deleteMany({
        where: {
          recipeId: id,
        },
      });

      await tx.recipe.delete({
        where: { id },
      });

      return recipe;
    });
  } catch (error) {
    console.error('Recipe deletion error:', error);
    throw new Error('レシピの削除に失敗しました');
  }
};
