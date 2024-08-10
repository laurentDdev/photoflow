import {IUser} from "../contexts/AuthContext.tsx";

const USER_API = "/api/users/"

export type IUserNotification = {
    _id: string
    sender: IUser
    receiver: IUser
    content: string
    createdAt: string
}

export const getUserNotifications = async () => {
    const response = await fetch(`${USER_API}notifications`, {
        method: "GET"
    })

    const body = await response.json()

    if (response.ok) {
        return body
    } else {
        if (body) {
            throw body
        } else {
            throw new Error("Erreur lors de la récupération des notifications")
        }
    }
}