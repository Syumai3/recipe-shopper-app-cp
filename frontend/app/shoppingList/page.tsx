'use client';
import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Checkbox,
  Divider,
  Center,
  Spinner,
} from '@chakra-ui/react';
import {
  useGetUserRecipesQuery,
  useMyShoppingListQuery,
} from '@/src/generated/graphql';
import { useSession } from 'next-auth/react';

export default function ShoppingList() {
  const { data: session, status } = useSession();
  const { data: recipesData } = useGetUserRecipesQuery({
    variables: {
      userId: session?.user?.id ?? '',
    },
    skip: !session?.user?.id,
  });

  const [selectedRecipes, setSelectedRecipes] = useState<Map<number, number>>(
    new Map(),
  );

  const { data: shoppingListData } = useMyShoppingListQuery({
    variables: {
      recipeIds: Array.from(selectedRecipes.keys()),
      servings: Array.from(selectedRecipes.values()),
    },
    skip: selectedRecipes.size === 0,
  });

  const handleRecipeSelect = (recipeId: number, checked: boolean) => {
    const newSelected = new Map(selectedRecipes);
    if (checked) {
      newSelected.set(recipeId, 1);
    } else {
      newSelected.delete(recipeId);
    }
    setSelectedRecipes(newSelected);
  };

  const handleServingChange = (recipeId: number, value: number) => {
    const newSelected = new Map(selectedRecipes);
    newSelected.set(recipeId, value);
    setSelectedRecipes(newSelected);
  };

  if (status === 'unauthenticated') {
    return (
      <Box
        p={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minH="200px"
        textAlign="center"
      >
        <Heading size="md" mb={4} color="gray.600">
          買い物リストを作成するにはログインが必要です
        </Heading>
      </Box>
    );
  }

  if (status === 'loading') {
    return (
      <Center h="200px">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="orange.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <Box p={5}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">買い物リスト作成</Heading>

        <Box>
          <Heading size="md" mb={4}>
            レシピを選択
          </Heading>
          <VStack align="stretch" spacing={3}>
            {recipesData?.recipesByUserId?.map((recipe) => (
              <HStack key={recipe.id} justify="space-between">
                <Checkbox
                  onChange={(e) =>
                    handleRecipeSelect(recipe.id, e.target.checked)
                  }
                >
                  {recipe.name}
                </Checkbox>
                {selectedRecipes.has(recipe.id) && (
                  <NumberInput
                    defaultValue={1}
                    min={1}
                    max={10}
                    width="100px"
                    onChange={(_, value) =>
                      handleServingChange(recipe.id, value)
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              </HStack>
            ))}
          </VStack>
        </Box>

        {shoppingListData && (
          <>
            <Divider />
            <Box>
              <Heading size="md" mb={4}>
                買い物リスト
              </Heading>
              <VStack align="stretch" spacing={2}>
                {shoppingListData.myShoppingList.map(
                  (item: any, index: any) => (
                    <HStack key={index} justify="space-between">
                      <Text>{item.ingredient.name}</Text>
                      <Text>
                        {item.totalQuantity} {item.ingredient.unit?.unit}
                      </Text>
                    </HStack>
                  ),
                )}
              </VStack>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
}
