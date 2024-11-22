import { Box, Heading } from '@chakra-ui/react';

export default function HomePage() {
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
        レシピを作って買い物リストを作れます
      </Heading>
    </Box>
  );
}
