import { PrismaClient } from '@prisma/client';
import { MyContext } from '../../index.js';

const prisma = new PrismaClient();

// レシピから買い物リストを生成するリゾルバ
export const myShoppingList = async (
  _: unknown,
  { recipeIds, servings }: { recipeIds: number[]; servings: number[] },
) => {
  const recipes = await prisma.recipe.findMany({
    where: {
      id: { in: recipeIds },
    },
    include: {
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
  // 材料ごとに数量を集計
  const ingredientTotals = new Map();

  recipes.forEach((recipe, index) => {
    recipe.recipeIngredients.forEach((ri) => {
      const key = ri.ingredient.id;
      const currentTotal = ingredientTotals.get(key) || {
        ingredient: ri.ingredient,
        totalQuantity: 0,
      };
      currentTotal.totalQuantity += ri.quantity * servings[index];
      ingredientTotals.set(key, currentTotal);
    });
  });

  return Array.from(ingredientTotals.values());
};
