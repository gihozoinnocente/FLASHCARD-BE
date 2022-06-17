// import _ from "lodash"
import { users } from '../db';

export const Mutation ={
    createUser:(parent:any, args:any, context:any) => {
        const user = args.input
        const lastId = users[users.length -1].id
        user.id= lastId + 1
        users.push(user)
        return user  
    }
};
