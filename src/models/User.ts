import { card } from './card'
export type User ={
    id?:number
    name:string
    email:string
    password:string
    card?:card[]
}