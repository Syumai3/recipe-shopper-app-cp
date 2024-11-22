import { useSearchIngredientsLazyQuery } from '@/src/generated/graphql';
import { useDebounceCallback } from '@react-hook/debounce';
import { useState, useRef, useEffect } from 'react';

export function useIngredientSearch() {
  const [searchIngredients, { data: searchData }] =
    useSearchIngredientsLazyQuery();
  const [selectedIngredientIndex, setSelectedIngredientIndex] = useState<
    number | null
  >(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const debouncedSearch = useDebounceCallback((searchTerm: string) => {
    if (searchTerm.length > 0) {
      searchIngredients({ variables: { searchTerm } });
    }
  }, 500);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setSelectedIngredientIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return {
    searchData,
    selectedIngredientIndex,
    setSelectedIngredientIndex,
    listRef,
    debouncedSearch,
  };
}
