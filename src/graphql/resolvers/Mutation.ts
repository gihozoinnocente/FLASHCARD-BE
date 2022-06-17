import { cards } from '../db';
import { User } from '../../models/User'
import { createUser } from '../../services/user.services';


export const Mutation ={
    createUser:async(parent:any, args:any, context:any) :Promise<User>=> {
       return await createUser(args.input)
    },

    createCard :(parent:any, args:any, context:any) => {
        const card = args.input
        const lastId = cards[cards.length -1].id
        card.id= lastId + 1
        cards.push(card)
        return card  
    }
};
