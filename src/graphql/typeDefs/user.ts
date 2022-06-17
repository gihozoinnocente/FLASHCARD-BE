import { gql } from "apollo-server"

export const userTypeDefs =gql`
 type  User{
    id:ID!
    name:String!
    email:String!
 }

 input createUserInput{
   name: String!
   email: String!
 }
`