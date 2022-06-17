import { gql } from 'apollo-server';
export const queryTypeDefs =gql`
type Query{
    users:[User!]
}
`