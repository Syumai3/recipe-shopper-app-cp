import { Box, Link as ChakraLink, VStack } from '@chakra-ui/react';
import React from 'react';

export default function Sidebar() {
  return (
    <Box w="200px" bgColor="orange.50" borderRadius={10} height="100%" p={4}>
      <Box h="60px" display="flex" alignItems="center" mb={4}>
        <ChakraLink
          href="./"
          color="gray.600"
          fontSize="xl"
          fontWeight="bold"
          _hover={{ textDecoration: 'none', color: 'gray.400' }}
        >
          Recipee
        </ChakraLink>
      </Box>
      <VStack align="start" spacing={4}>
        <ChakraLink
          href="./shoppingList"
          fontSize="lg"
          color="gray.600"
          _hover={{ textDecoration: 'none', color: 'gray.400' }}
        >
          買い物リストを作成する
        </ChakraLink>
        <ChakraLink
          href="./createRecipe"
          fontSize="lg"
          color="gray.600"
          _hover={{ textDecoration: 'none', color: 'gray.400' }}
        >
          レシピを作成する
        </ChakraLink>
        <ChakraLink
          href="./recipes"
          fontSize="lg"
          color="gray.600"
          _hover={{ textDecoration: 'none', color: 'gray.400' }}
        >
          レシピを確認する
        </ChakraLink>
      </VStack>
    </Box>
  );
}
