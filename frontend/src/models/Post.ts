
import {IPostComment} from "../apis/post.api.ts";
import {IUser} from "./User.ts";


export interface IPost {
    author: string | IUser
    createdAt: string
    description: string
    _id: string
    name: string
    image: string
    comments:  IPostComment[]
    likes: IUser[],
    favorites: IUser[]
}
