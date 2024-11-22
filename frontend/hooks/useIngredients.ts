import { useState } from 'react';

type Ingredient = {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
};

export function useIngredients(initialIngredients?: Ingredient[]) {
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialIngredients ?? [{ id: undefined, name: '', quantity: 0, unit: '' }],
  );

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: 0, unit: '' }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length === 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | number,
  ) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return {
          ...ingredient,
          [field]:
            field === 'quantity' ? parseFloat(value.toString()) || 0 : value,
        };
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  };

  const handleIngredientSelect = (index: number, selectedIngredient: any) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      id: selectedIngredient.id,
      name: selectedIngredient.name,
      unit: selectedIngredient.unit.unit,
    };
    setIngredients(newIngredients);
  };

  return {
    ingredients,
    addIngredient,
    removeIngredient,
    updateIngredient,
    handleIngredientSelect,
  };
}
