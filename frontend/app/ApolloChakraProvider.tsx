"use client";

import { client } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

export default function ApolloChakraProvider({
	children,
}: { children: React.ReactNode }) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider>{children}</ChakraProvider>
		</ApolloProvider>
	);
}
