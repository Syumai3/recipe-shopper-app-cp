import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './schema/resolver.js';
import { typeDefs } from './schema/schema.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type MyContext = {
  prisma: PrismaClient;
};

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer<MyContext>(server, {
  listen: {
    port: parseInt(process.env.PORT || '4001'),
  },
  context: async (): Promise<MyContext> => {
    return {
      prisma,
    };
  },
});

console.log(`Server ready at: ${url}`);
