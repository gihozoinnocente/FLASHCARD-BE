import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { context } from "./context";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

export const server = new ApolloServer({
    schema,
    context,
    // introspection:true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

const port = process.env.PORT || 3000;

server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server is ready at ${url}`);
});
