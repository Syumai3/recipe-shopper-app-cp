import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: String!
    username: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    recipes: [Recipe!]
    menus: [Menu!]!
  }

  type Recipe {
    id: Int!
    name: String!
    description: String
    recipeIngredients: [RecipeIngredient!]!
    createdBy: User!
    userId: String!
  }

  type RecipeIngredient {
    ingredient: Ingredient!
    quantity: Float!
  }

  type Menu {
    id: Int!
    name: String!
    description: String
    startDate: DateTime!
    endDate: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
  }

  input CreateUserInput {
    id: String!
    username: String!
    email: String!
  }

  input IngredientInput {
    ingredientId: Int!
    quantity: Float!
    # unit: String!
  }

  input CreateRecipeInput {
    name: String!
    description: String
    ingredients: [IngredientInput!]!
    userId: String!
  }

  type Ingredient {
    id: Int!
    name: String!
    category: String
    unit: Unit
  }

  type Unit {
    id: Int!
    unit: String!
  }

  type ShoppingListItem {
    ingredient: Ingredient!
    totalQuantity: Float!
  }

  input UpdateRecipeInput {
    id: Int!
    name: String!
    description: String
    ingredients: [IngredientInput!]!
  }

  type Query {
    user(id: String!): User
    users: [User!]!
    recipe(id: Int!): Recipe
    recipes: [Recipe!]!
    recipesByUserId(userId: String!): [Recipe!]!
    searchIngredients(searchTerm: String!): [Ingredient!]!
    myShoppingList(recipeIds: [Int!]!, servings: [Int!]!): [ShoppingListItem!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createRecipe(input: CreateRecipeInput!): Recipe!
    updateRecipe(input: UpdateRecipeInput!): Recipe!
    deleteRecipe(id: Int!): Recipe!
  }
`;
