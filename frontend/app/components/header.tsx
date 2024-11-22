'use client';
import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { useCreateUserMutation } from '@/src/generated/graphql';

export default function Header() {
  const { data: session, status } = useSession();
  const [createUser, { loading, error }] = useCreateUserMutation();

  useEffect(() => {
    const handleAuthentication = async () => {
      if (status === 'authenticated' && session?.user?.id) {
        try {
          const result = await createUser({
            variables: {
              input: {
                id: session.user.id,
                username: session.user.name || 'Unknown User',
                email: session.user.email || '',
              },
            },
          });
          console.log('User save:', result.data);
        } catch (e) {
          console.error('Error saving user:', e);
        }
      }
    };
    handleAuthentication();
  }, [session, status, createUser]);
  return (
    <>
      {status === 'authenticated' ? (
        <Flex align="center" height="40px">
          <Button
            onClick={() => signOut()}
            bg="orange.50"
            color="gray.700"
            _hover={{ bg: 'orange.100' }}
            height="40px"
            mr={2}
            fontWeight="normal"
          >
            ログアウト
          </Button>
          <Box
            width="40px"
            height="40px"
            borderRadius="full"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={session.user?.image ?? '/default-avatar.png'}
              alt="User Avatar"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
        </Flex>
      ) : (
        <Button
          onClick={() => signIn('google')}
          bg="orange.500"
          color="white"
          fontWeight="bold"
          _hover={{ bg: 'orange.100' }}
          height="40px"
        >
          登録 / ログイン
        </Button>
      )}
    </>
  );
}
