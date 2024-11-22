'use client';
import { useSession } from 'next-auth/react';
import {
  Box,
  Heading,
  useToast,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useCreateRecipeMutation } from '@/src/generated/graphql';
import { RecipeForm, RecipeFormData } from '../components/RecipeForm';

function CreateRecipe() {
  const { data: session, status } = useSession();
  const toast = useToast();
  const [createRecipe, { loading }] = useCreateRecipeMutation();

  const handleSubmit = async (formData: RecipeFormData) => {
    if (!session?.user?.id) {
      toast({
        title: 'ログインが必要です',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await createRecipe({
        variables: {
          input: {
            name: formData.name,
            description: formData.description,
            userId: session.user.id,
            ingredients: formData.ingredients.map((ingredient) => ({
              ingredientId: ingredient.id!,
              quantity: ingredient.quantity,
            })),
          },
        },
      });

      if (result.data) {
        toast({
          title: 'レシピを作成しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('レシピ作成エラー:', error);
    }
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
          レシピを作成するにはログインが必要です
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
    <Box w={{ base: '100%', md: '600px' }} m={5}>
      <RecipeForm
        onSubmit={handleSubmit}
        isLoading={loading}
        submitButtonText="登録"
      />
    </Box>
  );
}

export default CreateRecipe;
