'use client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  List,
  ListItem,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { useIngredientSearch } from '@/hooks/useIngredientSearch';
import { useIngredients } from '@/hooks/useIngredients';
import { useRecipeForm } from '@/hooks/useRecipeForm';

type Ingredient = {
  id?: number;
  name: string;
  quantity: number;
  unit: string;
};

export type RecipeFormData = {
  name: string;
  description: string;
  ingredients: Ingredient[];
};

type RecipeFormProps = {
  initialData?: RecipeFormData;
  onSubmit: (data: RecipeFormData) => Promise<void>;
  submitButtonText?: string;
  isLoading?: boolean;
};

export function RecipeForm({
  initialData,
  onSubmit,
  submitButtonText = '登録',
  isLoading = false,
}: RecipeFormProps) {
  const {
    recipeName,
    setRecipeName,
    description,
    setDescription,
    handleSubmit,
  } = useRecipeForm(initialData);

  const {
    ingredients,
    addIngredient,
    removeIngredient,
    updateIngredient,
    handleIngredientSelect,
  } = useIngredients(initialData?.ingredients);

  const {
    searchData,
    selectedIngredientIndex,
    setSelectedIngredientIndex,
    listRef,
    debouncedSearch,
  } = useIngredientSearch();

  const handleIngredientSearch = (index: number, term: string) => {
    updateIngredient(index, 'name', term);
    setSelectedIngredientIndex(index);
    debouncedSearch(term);
  };

  return (
    <Stack spacing={3} w="100%" maxW={{ base: '100%', md: '600px' }} mx="auto">
      <FormControl>
        <FormLabel htmlFor="recipe-name">レシピ名</FormLabel>
        <Input
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          id="recipe-name"
          w="100%"
          variant="outline"
        />
      </FormControl>

      <FormControl>
        <FormLabel>材料</FormLabel>
        <VStack
          align="stretch"
          minH={{ base: '200px', md: '300px' }}
          maxH={{ base: '300px', md: '400px' }}
          overflowY="auto"
          borderWidth={1}
          borderRadius="md"
          p={2}
        >
          {ingredients.map((ingredient, index) => (
            <Box position="relative" key={index}>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={2}>
                <Input
                  placeholder="材料名"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientSearch(index, e.target.value)
                  }
                  onFocus={() => setSelectedIngredientIndex(index)}
                />
                <Input
                  placeholder="数量"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    updateIngredient(index, 'quantity', e.target.value)
                  }
                />
                <Input placeholder="単位" value={ingredient.unit} readOnly />
                <IconButton
                  aria-label="Remove ingredient"
                  icon={<DeleteIcon />}
                  onClick={() => removeIngredient(index)}
                  size="sm"
                />
              </Stack>
              {selectedIngredientIndex === index &&
                searchData?.searchIngredients && (
                  <List
                    ref={listRef}
                    position="absolute"
                    zIndex={1}
                    bg="white"
                    borderWidth={1}
                    borderRadius="md"
                    width="100%"
                    maxH="200px"
                    overflowY="auto"
                  >
                    {searchData.searchIngredients.map((searchIngredient) => (
                      <ListItem
                        key={searchIngredient.id}
                        onClick={() =>
                          handleIngredientSelect(index, searchIngredient)
                        }
                        p={2}
                        _hover={{ bg: 'gray.100' }}
                        cursor="pointer"
                      >
                        {searchIngredient.name}(
                        {searchIngredient.unit?.unit || '単位なし'})
                      </ListItem>
                    ))}
                  </List>
                )}
            </Box>
          ))}
        </VStack>
        <Button leftIcon={<AddIcon />} onClick={addIngredient} mt={2} size="sm">
          材料を追加
        </Button>
      </FormControl>

      <FormLabel htmlFor="description">説明</FormLabel>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="description"
        variant="outline"
      />

      <Box display="flex" justifyContent="flex-end">
        <Button
          colorScheme="orange"
          w="100px"
          onClick={() => handleSubmit(onSubmit, ingredients)}
          isLoading={isLoading}
        >
          {submitButtonText}
        </Button>
      </Box>
    </Stack>
  );
}
