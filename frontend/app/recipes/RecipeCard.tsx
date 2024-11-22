import { useState } from 'react';
import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react';
import { GetUserRecipesQuery } from '@/src/generated/graphql';
import { EditRecipeDialog } from '../components/EditRecipeDialog';

export type RecipeCardProps = {
  recipe: NonNullable<
    NonNullable<GetUserRecipesQuery['recipesByUserId']>[number]
  >;
};

function RecipeCard({ recipe }: RecipeCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <Card
        cursor="pointer"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
        onClick={() => setIsEditDialogOpen(true)}
      >
        <CardHeader>
          <Heading size="md">{recipe.name}</Heading>
        </CardHeader>
        <CardBody>
          <Text noOfLines={2} color="gray.600">
            {recipe.description || '説明なし'}
          </Text>
        </CardBody>
      </Card>

      <EditRecipeDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        recipe={recipe}
      />
    </>
  );
}

export default RecipeCard;
