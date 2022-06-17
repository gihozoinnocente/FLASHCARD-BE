import { users } from '../db'

export const Query = {
    users: (parent: any, args: any, context: any) => users,
  };

export const Mutation ={
    createUser: (parent: any, args: any, context: any) =>{
        
    }
}