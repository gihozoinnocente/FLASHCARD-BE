import { gql } from 'apollo-server';
export const queryTypeDefs =gql`
type Query{
    users:[User!]
}
`
export const cardqueryTypeDefs =gql`
type Query{
    cards:[Card!]
}
`