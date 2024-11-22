import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Recipe = {
  // 特定のレシピを作成したユーザーを取得するためのリゾルバ
  createdBy: async (parent: { userId: string }) => {
    return prisma.user.findUnique({
      where: { id: parent.userId },
    });
  },
  // レシピの材料情報を取得するためのリゾルバを追加
  recipeIngredients: async (parent: { id: number }) => {
    return prisma.recipeIngredient.findMany({
      where: {
        recipeId: parent.id
      },
      include: {
        ingredient: {
          include: {
            unit: true
          }
        }
      }
    });
  }
};