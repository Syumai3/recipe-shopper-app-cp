import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ユーザーを作成するためのミューテーション
export const createUser = async (
  _: unknown,
  { input }: { input: { id: string; username: string; email: string } },
) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: input.id },
    });

    if (existingUser) {
      return prisma.user.update({
        where: { id: input.id },
        data: {
          username: input.username,
          email: input.email,
        },
      });
    }

    return prisma.user.create({
      data: {
        id: input.id,
        username: input.username,
        email: input.email,
      },
    });
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};
