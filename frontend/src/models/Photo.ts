import {IUser} from "../contexts/AuthContext.tsx";


export interface IPost {
    author: string | IUser
    createdAt: string
    description: string
    _id: string
    name: string
    image: string
    comments:  unknown[]
    likes: number
}
