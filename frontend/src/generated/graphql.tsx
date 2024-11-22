import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateRecipeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  ingredients: Array<IngredientInput>;
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  category?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  unit?: Maybe<Unit>;
};

export type IngredientInput = {
  ingredientId: Scalars['Int']['input'];
  quantity: Scalars['Float']['input'];
};

export type Menu = {
  __typename?: 'Menu';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRecipe: Recipe;
  createUser: User;
  deleteRecipe: Recipe;
  updateRecipe: Recipe;
};


export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateRecipeArgs = {
  input: UpdateRecipeInput;
};

export type Query = {
  __typename?: 'Query';
  myShoppingList: Array<ShoppingListItem>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  recipesByUserId: Array<Recipe>;
  searchIngredients: Array<Ingredient>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryMyShoppingListArgs = {
  recipeIds: Array<Scalars['Int']['input']>;
  servings: Array<Scalars['Int']['input']>;
};


export type QueryRecipeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRecipesByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QuerySearchIngredientsArgs = {
  searchTerm: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type Recipe = {
  __typename?: 'Recipe';
  createdBy: User;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  recipeIngredients: Array<RecipeIngredient>;
  userId: Scalars['String']['output'];
};

export type RecipeIngredient = {
  __typename?: 'RecipeIngredient';
  ingredient: Ingredient;
  quantity: Scalars['Float']['output'];
};

export type ShoppingListItem = {
  __typename?: 'ShoppingListItem';
  ingredient: Ingredient;
  totalQuantity: Scalars['Float']['output'];
};

export type Unit = {
  __typename?: 'Unit';
  id: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
};

export type UpdateRecipeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  ingredients: Array<IngredientInput>;
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  menus: Array<Menu>;
  recipes?: Maybe<Array<Recipe>>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type CreateRecipeMutationVariables = Exact<{
  input: CreateRecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', id: number, name: string, description?: string | null, userId: string, recipeIngredients: Array<{ __typename?: 'RecipeIngredient', quantity: number, ingredient: { __typename?: 'Ingredient', id: number, name: string, unit?: { __typename?: 'Unit', id: number, unit: string } | null } }>, createdBy: { __typename?: 'User', id: string, username: string } } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, username: string, email: string } };

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRecipeMutation = { __typename?: 'Mutation', deleteRecipe: { __typename?: 'Recipe', id: number, name: string, description?: string | null, recipeIngredients: Array<{ __typename?: 'RecipeIngredient', quantity: number, ingredient: { __typename?: 'Ingredient', id: number, name: string, unit?: { __typename?: 'Unit', unit: string } | null } }> } };

export type UpdateRecipeMutationVariables = Exact<{
  input: UpdateRecipeInput;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe: { __typename?: 'Recipe', id: number, name: string, description?: string | null, recipeIngredients: Array<{ __typename?: 'RecipeIngredient', quantity: number, ingredient: { __typename?: 'Ingredient', id: number, name: string, unit?: { __typename?: 'Unit', unit: string } | null } }> } };

export type GetRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: number, name: string, description?: string | null }> };

export type GetUserRecipesQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserRecipesQuery = { __typename?: 'Query', recipesByUserId: Array<{ __typename?: 'Recipe', id: number, name: string, description?: string | null, createdBy: { __typename?: 'User', username: string }, recipeIngredients: Array<{ __typename?: 'RecipeIngredient', quantity: number, ingredient: { __typename?: 'Ingredient', id: number, name: string, unit?: { __typename?: 'Unit', unit: string } | null } }> }> };

export type MyShoppingListQueryVariables = Exact<{
  recipeIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  servings: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type MyShoppingListQuery = { __typename?: 'Query', myShoppingList: Array<{ __typename?: 'ShoppingListItem', totalQuantity: number, ingredient: { __typename?: 'Ingredient', id: number, name: string, unit?: { __typename?: 'Unit', unit: string } | null } }> };

export type SearchIngredientsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type SearchIngredientsQuery = { __typename?: 'Query', searchIngredients: Array<{ __typename?: 'Ingredient', id: number, name: string, unit?: { __typename?: 'Unit', id: number, unit: string } | null }> };


export const CreateRecipeDocument = gql`
    mutation createRecipe($input: CreateRecipeInput!) {
  createRecipe(input: $input) {
    id
    name
    description
    userId
    recipeIngredients {
      ingredient {
        id
        name
        unit {
          id
          unit
        }
      }
      quantity
    }
    createdBy {
      id
      username
    }
  }
}
    `;
export type CreateRecipeMutationFn = Apollo.MutationFunction<CreateRecipeMutation, CreateRecipeMutationVariables>;

/**
 * __useCreateRecipeMutation__
 *
 * To run a mutation, you first call `useCreateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecipeMutation, { data, loading, error }] = useCreateRecipeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecipeMutation, CreateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument, options);
      }
export type CreateRecipeMutationHookResult = ReturnType<typeof useCreateRecipeMutation>;
export type CreateRecipeMutationResult = Apollo.MutationResult<CreateRecipeMutation>;
export type CreateRecipeMutationOptions = Apollo.BaseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteRecipeDocument = gql`
    mutation DeleteRecipe($id: Int!) {
  deleteRecipe(id: $id) {
    id
    name
    description
    recipeIngredients {
      quantity
      ingredient {
        id
        name
        unit {
          unit
        }
      }
    }
  }
}
    `;
export type DeleteRecipeMutationFn = Apollo.MutationFunction<DeleteRecipeMutation, DeleteRecipeMutationVariables>;

/**
 * __useDeleteRecipeMutation__
 *
 * To run a mutation, you first call `useDeleteRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecipeMutation, { data, loading, error }] = useDeleteRecipeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecipeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument, options);
      }
export type DeleteRecipeMutationHookResult = ReturnType<typeof useDeleteRecipeMutation>;
export type DeleteRecipeMutationResult = Apollo.MutationResult<DeleteRecipeMutation>;
export type DeleteRecipeMutationOptions = Apollo.BaseMutationOptions<DeleteRecipeMutation, DeleteRecipeMutationVariables>;
export const UpdateRecipeDocument = gql`
    mutation UpdateRecipe($input: UpdateRecipeInput!) {
  updateRecipe(input: $input) {
    id
    name
    description
    recipeIngredients {
      quantity
      ingredient {
        id
        name
        unit {
          unit
        }
      }
    }
  }
}
    `;
export type UpdateRecipeMutationFn = Apollo.MutationFunction<UpdateRecipeMutation, UpdateRecipeMutationVariables>;

/**
 * __useUpdateRecipeMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeMutation, { data, loading, error }] = useUpdateRecipeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument, options);
      }
export type UpdateRecipeMutationHookResult = ReturnType<typeof useUpdateRecipeMutation>;
export type UpdateRecipeMutationResult = Apollo.MutationResult<UpdateRecipeMutation>;
export type UpdateRecipeMutationOptions = Apollo.BaseMutationOptions<UpdateRecipeMutation, UpdateRecipeMutationVariables>;
export const GetRecipesDocument = gql`
    query GetRecipes {
  recipes {
    id
    name
    description
  }
}
    `;

/**
 * __useGetRecipesQuery__
 *
 * To run a query within a React component, call `useGetRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
      }
export function useGetRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export function useGetRecipesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRecipesQuery, GetRecipesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecipesQuery, GetRecipesQueryVariables>(GetRecipesDocument, options);
        }
export type GetRecipesQueryHookResult = ReturnType<typeof useGetRecipesQuery>;
export type GetRecipesLazyQueryHookResult = ReturnType<typeof useGetRecipesLazyQuery>;
export type GetRecipesSuspenseQueryHookResult = ReturnType<typeof useGetRecipesSuspenseQuery>;
export type GetRecipesQueryResult = Apollo.QueryResult<GetRecipesQuery, GetRecipesQueryVariables>;
export const GetUserRecipesDocument = gql`
    query GetUserRecipes($userId: String!) {
  recipesByUserId(userId: $userId) {
    id
    name
    description
    createdBy {
      username
    }
    recipeIngredients {
      quantity
      ingredient {
        id
        name
        unit {
          unit
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserRecipesQuery__
 *
 * To run a query within a React component, call `useGetUserRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserRecipesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserRecipesQuery(baseOptions: Apollo.QueryHookOptions<GetUserRecipesQuery, GetUserRecipesQueryVariables> & ({ variables: GetUserRecipesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserRecipesQuery, GetUserRecipesQueryVariables>(GetUserRecipesDocument, options);
      }
export function useGetUserRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserRecipesQuery, GetUserRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserRecipesQuery, GetUserRecipesQueryVariables>(GetUserRecipesDocument, options);
        }
export function useGetUserRecipesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserRecipesQuery, GetUserRecipesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserRecipesQuery, GetUserRecipesQueryVariables>(GetUserRecipesDocument, options);
        }
export type GetUserRecipesQueryHookResult = ReturnType<typeof useGetUserRecipesQuery>;
export type GetUserRecipesLazyQueryHookResult = ReturnType<typeof useGetUserRecipesLazyQuery>;
export type GetUserRecipesSuspenseQueryHookResult = ReturnType<typeof useGetUserRecipesSuspenseQuery>;
export type GetUserRecipesQueryResult = Apollo.QueryResult<GetUserRecipesQuery, GetUserRecipesQueryVariables>;
export const MyShoppingListDocument = gql`
    query MyShoppingList($recipeIds: [Int!]!, $servings: [Int!]!) {
  myShoppingList(recipeIds: $recipeIds, servings: $servings) {
    ingredient {
      id
      name
      unit {
        unit
      }
    }
    totalQuantity
  }
}
    `;

/**
 * __useMyShoppingListQuery__
 *
 * To run a query within a React component, call `useMyShoppingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyShoppingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyShoppingListQuery({
 *   variables: {
 *      recipeIds: // value for 'recipeIds'
 *      servings: // value for 'servings'
 *   },
 * });
 */
export function useMyShoppingListQuery(baseOptions: Apollo.QueryHookOptions<MyShoppingListQuery, MyShoppingListQueryVariables> & ({ variables: MyShoppingListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyShoppingListQuery, MyShoppingListQueryVariables>(MyShoppingListDocument, options);
      }
export function useMyShoppingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyShoppingListQuery, MyShoppingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyShoppingListQuery, MyShoppingListQueryVariables>(MyShoppingListDocument, options);
        }
export function useMyShoppingListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyShoppingListQuery, MyShoppingListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyShoppingListQuery, MyShoppingListQueryVariables>(MyShoppingListDocument, options);
        }
export type MyShoppingListQueryHookResult = ReturnType<typeof useMyShoppingListQuery>;
export type MyShoppingListLazyQueryHookResult = ReturnType<typeof useMyShoppingListLazyQuery>;
export type MyShoppingListSuspenseQueryHookResult = ReturnType<typeof useMyShoppingListSuspenseQuery>;
export type MyShoppingListQueryResult = Apollo.QueryResult<MyShoppingListQuery, MyShoppingListQueryVariables>;
export const SearchIngredientsDocument = gql`
    query SearchIngredients($searchTerm: String!) {
  searchIngredients(searchTerm: $searchTerm) {
    id
    name
    unit {
      id
      unit
    }
  }
}
    `;

/**
 * __useSearchIngredientsQuery__
 *
 * To run a query within a React component, call `useSearchIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchIngredientsQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useSearchIngredientsQuery(baseOptions: Apollo.QueryHookOptions<SearchIngredientsQuery, SearchIngredientsQueryVariables> & ({ variables: SearchIngredientsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchIngredientsQuery, SearchIngredientsQueryVariables>(SearchIngredientsDocument, options);
      }
export function useSearchIngredientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchIngredientsQuery, SearchIngredientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchIngredientsQuery, SearchIngredientsQueryVariables>(SearchIngredientsDocument, options);
        }
export function useSearchIngredientsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchIngredientsQuery, SearchIngredientsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchIngredientsQuery, SearchIngredientsQueryVariables>(SearchIngredientsDocument, options);
        }
export type SearchIngredientsQueryHookResult = ReturnType<typeof useSearchIngredientsQuery>;
export type SearchIngredientsLazyQueryHookResult = ReturnType<typeof useSearchIngredientsLazyQuery>;
export type SearchIngredientsSuspenseQueryHookResult = ReturnType<typeof useSearchIngredientsSuspenseQuery>;
export type SearchIngredientsQueryResult = Apollo.QueryResult<SearchIngredientsQuery, SearchIngredientsQueryVariables>;