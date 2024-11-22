import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

if (process.env.NODE_ENV === 'development') {
  console.log('GraphQL Endpoint:', process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);
}

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4001/graphql',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
