import { gql } from "apollo-server"

export const cardTypeDefs =gql`
 type  Card{
    id:ID!
    title:String!
    description:String!
    user:User!
    userId: Int!
 }

 input createCardInput{
   title: String!
   description: String!
 }
`