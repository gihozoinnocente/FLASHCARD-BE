import { findAllUser } from '../../services/user.services';
import { User } from '../../models/User'
import { cards } from '../db'

export const Query = {
    users: async(parent: any, args: any, context: any):Promise<User[]> => {
      return await findAllUser()
    },
    cards: (parent: any, args: any, context: any) => cards,
  };

export const Mutation ={
    createUser: (parent: any, args: any, context: any) =>{ 
    },
    createCard: (parent: any, args: any, context: any) =>{ 
    }
}