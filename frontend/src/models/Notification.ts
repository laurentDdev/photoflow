import {IUser} from "./User.ts";

export type IUserNotification = {
    _id: string
    sender: IUser
    receiver: IUser
    content: string
    createdAt: string
}