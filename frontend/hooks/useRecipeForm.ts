import { useState } from 'react';

type RecipeFormData = {
  name: string;
  description: string;
};

export function useRecipeForm(initialData?: RecipeFormData) {
  const [recipeName, setRecipeName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(
    initialData?.description ?? '',
  );

  const handleSubmit = async (
    onSubmit: (data: any) => Promise<void>,
    ingredients: any[],
  ) => {
    await onSubmit({
      name: recipeName,
      description,
      ingredients,
    });
  };

  return {
    recipeName,
    setRecipeName,
    description,
    setDescription,
    handleSubmit,
  };
}
