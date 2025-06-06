import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    cache: new InMemoryCache(),
});
export default apolloClient;