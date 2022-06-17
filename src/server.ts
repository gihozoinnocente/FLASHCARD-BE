import { typeDefs } from "./graphql/typeDefs/index";
import { resolvers } from "./graphql/resolvers"
import { ApolloServer } from "apollo-server";
// import { tradeTokenForUser } from './helper/auth-helpers';

// const HEADER_NAME = 'authorization'
const startApolloServer = (): void=>{
    new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}: any) => {
          const token: string = req.headers.authorization || ''
          return {token: token}
        }
       
    }).listen().then(({ url }) => {
        console.log("Server is up at " + url);
      });
}

export default startApolloServer