import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const User = {
	// 特定のユーザーのレシピを取得するためのリゾルバ
	recipes: async (parent: { id: string }) => {
		return prisma.recipe.findMany({
			where: { userId: parent.id },
		});
	},
};
