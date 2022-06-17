import { users, cards } from '../db';

export const Mutation ={
    createUser:(parent:any, args:any, context:any) => {
        const user = args.input
        const lastId = users[users.length -1].id
        user.id= lastId + 1
        users.push(user)
        return user  
    },

    createCard :(parent:any, args:any, context:any) => {
        const card = args.input
        const lastId = cards[cards.length -1].id
        card.id= lastId + 1
        cards.push(card)
        return card  
    }
};
