import { gql } from "apollo-server-express";

export const mutationTypeDefs =gql`
    type Mutation{
        createUser(input:createUserInput!): User
        createCard(input:createCardInput!): Card
    }
`