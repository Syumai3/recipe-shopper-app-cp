import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { useRef } from 'react';

type DeleteRecipeDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  recipeName: string;
  isLoading: boolean;
};

export function DeleteRecipeDialog({
  isOpen,
  onClose,
  onDelete,
  recipeName,
  isLoading,
}: DeleteRecipeDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            レシピの削除
          </AlertDialogHeader>

          <AlertDialogBody>
            本当に「{recipeName}」を削除しますか？この操作は取り消せません。
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button
                colorScheme="red"
                onClick={onDelete}
                isLoading={isLoading}
              >
                削除
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
