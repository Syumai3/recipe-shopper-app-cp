import { PrismaClient } from '@prisma/client';
import { MyContext } from '../../index.js';

const prisma = new PrismaClient();

// 材料を検索するためのリゾルバ
export const searchIngredients = async (
  _: unknown,
  { searchTerm }: { searchTerm: string },
  context: MyContext,
) => {
  const ingredients = await context.prisma.ingredient.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
    },
    include: { unit: true },
  });
  return ingredients;
};
