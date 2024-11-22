'use client';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Sidebar from '../Sidebar';

export function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        aria-label="メニューを開く"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        variant="ghost"
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent bgColor="orange.50">
          <DrawerCloseButton />
          <DrawerBody p={0}>
            <Sidebar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
