import{ User } from './User'
export type card ={
    id:number
    title:string
    description:string
    user?:User
    userId:number
   }



export type cardInput ={
 title:string
 description:string
 userId:number
}