// src/schema/mutations/index.ts
import { createUser } from './createUser.js';
import { createRecipe } from './createRecipe.js';
import { updateRecipe } from './updateRecipe.js';
import { deleteRecipe } from './deleteRecipe.js';

export const Mutation = {
  createUser,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
