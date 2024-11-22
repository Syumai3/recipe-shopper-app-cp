import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RecipeForm, RecipeFormData } from './RecipeForm';
import {
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} from '@/src/generated/graphql';
import { GetUserRecipesQuery } from '@/src/generated/graphql';
import { DeleteRecipeDialog } from './DeleteRecipeDialog';

type EditRecipeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  recipe: NonNullable<
    NonNullable<GetUserRecipesQuery['recipesByUserId']>[number]
  >;
};

export function EditRecipeDialog({
  isOpen,
  onClose,
  recipe,
}: EditRecipeDialogProps) {
  const toast = useToast();
  const [updateRecipe, { loading }] = useUpdateRecipeMutation();
  const [deleteRecipe, { loading: deleteLoading }] = useDeleteRecipeMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSubmit = async (formData: RecipeFormData) => {
    try {
      const result = await updateRecipe({
        variables: {
          input: {
            id: recipe.id,
            name: formData.name,
            description: formData.description,
            ingredients: formData.ingredients.map((ingredient) => ({
              ingredientId: ingredient.id!,
              quantity: ingredient.quantity,
            })),
          },
        },
      });

      if (result.data) {
        toast({
          title: 'レシピを更新しました',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('レシピ更新エラー:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRecipe({
        variables: {
          id: recipe.id,
        },
        update: (cache) => {
          cache.modify({
            fields: {
              recipesByUserId(existingRecipes = [], { readField }) {
                return existingRecipes.filter(
                  (recipeRef: any) => recipe.id !== readField('id', recipeRef),
                );
              },
            },
          });
        },
      });

      toast({
        title: 'レシピを削除しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsDeleteDialogOpen(false);
      onClose();
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        description: '削除に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const initialData: RecipeFormData = {
    name: recipe.name,
    description: recipe.description || '',
    ingredients: recipe.recipeIngredients.map((ri) => ({
      id: ri.ingredient.id,
      name: ri.ingredient.name,
      quantity: ri.quantity,
      unit: ri.ingredient.unit?.unit || '',
    })),
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxW="800px">
          <ModalHeader>レシピの編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <RecipeForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isLoading={loading}
              submitButtonText="更新"
            />
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button
                colorScheme="red"
                onClick={() => setIsDeleteDialogOpen(true)}
                isLoading={deleteLoading}
              >
                削除
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <DeleteRecipeDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
        recipeName={recipe.name}
        isLoading={deleteLoading}
      />
    </>
  );
}
