import { DateTimeResolver } from 'graphql-scalars';
import { Mutation } from './mutations/index.js';
import { Recipe } from './resolvers/Recipe.js';
import { User } from './resolvers/User.js';
import { Query } from './queries/index.js';

export const resolvers = {
  DateTime: DateTimeResolver,
  Query,
  Mutation,
  User,
  Recipe,
};
