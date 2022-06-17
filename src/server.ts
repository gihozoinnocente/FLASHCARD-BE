import { typeDefs } from "./graphql/typeDefs/index";
import { resolvers } from "./graphql/resolvers"
import { ApolloServer } from "apollo-server";
// import { tradeTokenForUser } from './helper/auth-helpers';

// const HEADER_NAME = 'authorization'
const startApolloServer = (): void=>{
    new ApolloServer({
        typeDefs,
        resolvers,
        // context: async ({ req }) => {
        //     let authToken = null
        //     let currentUser = null
        
        //     try {
        //       authToken = req.headers[HEADER_NAME]
        
        //       if (authToken) {
        //         currentUser = await tradeTokenForUser(authToken)
        //       }
        //     } catch (e) {
        //       console.warn(`Unable to authenticate using auth token: ${authToken}`)
        //     }
        
        //     return {
        //       authToken,
        //       currentUser
        //     }
          // }
    }).listen().then(({ url }) => {
        console.log("Server is up at " + url);
      });
}

export default startApolloServer