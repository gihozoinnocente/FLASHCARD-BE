import { PrismaClient } from "@prisma/client";
// import { cards } from "../graphql/db";
import{ User } from '../models/User'
const prisma = new PrismaClient();
export const createUser = async (user:User):Promise<User> =>{
    return await prisma.user.create({
        data:user
    })
}

export const findAllUser = async():Promise<User[]> =>{
    return await prisma.user.findMany({
        include:{
            flashcards:true
        }
       
    })
}