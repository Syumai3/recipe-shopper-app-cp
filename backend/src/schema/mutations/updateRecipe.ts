import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ユーザーを作成するためのミューテーション
export const updateRecipe = async (
  _: unknown,
  {
    input,
  }: {
    input: {
      id: number;
      name: string;
      description?: string;
      ingredients: Array<{
        ingredientId: number;
        quantity: number;
      }>;
    };
  },
) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const updatedRecipe = await tx.recipe.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          // 一旦既存の材料関連をすべて削除
          recipeIngredients: {
            deleteMany: {},
          },
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

      await tx.recipeIngredient.createMany({
        data: input.ingredients.map((ing) => ({
          recipeId: updatedRecipe.id,
          ingredientId: ing.ingredientId,
          quantity: ing.quantity,
        })),
      });

      return await tx.recipe.findUnique({
        where: { id: input.id },
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
    });
  } catch (error) {
    console.error('Recipe update error:', error);
    throw new Error('レシピの更新に失敗しました');
  }
};
