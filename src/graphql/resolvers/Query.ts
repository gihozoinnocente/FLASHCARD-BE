import { users } from '../db'
import { cards } from '../db'

export const Query = {
    users: (parent: any, args: any, context: any) => users,
    cards: (parent: any, args: any, context: any) => cards,
  };

export const Mutation ={
    createUser: (parent: any, args: any, context: any) =>{ 
    },
    createCard: (parent: any, args: any, context: any) =>{ 
    }
}