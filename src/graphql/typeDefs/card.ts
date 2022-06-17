import { gql } from "apollo-server"

export const cardTypeDefs =gql`
 type  Card{
    id:ID!
    title:String!
    description:String!
 }

 input createCardInput{
   title: String!
   description: String!
 }
`