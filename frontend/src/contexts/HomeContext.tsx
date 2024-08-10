import {createContext, useContext, useState} from "react";
import {IPost} from "../models/Photo.ts";
import {useLoaderData} from "react-router-dom";
import {IUserNotification} from "../apis/user.api.ts";
import {AuthContext, AuthContextType} from "./AuthContext.tsx";

export type homeContextType = {
    posts: IPost[] | null
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | null>>,
    notifications: IUserNotification[]
    setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>
    getMyFavoritesPosts: () => IPost[]
}

export const homeContext = createContext<homeContextType | null>(null);



type Props = {
    children: React.ReactNode
}

type LoaderData = {
    posts: IPost[] | null,
    userNotifications: IUserNotification[]
}

export const HomeProvider = ({children}: Props) => {


    const {posts: postsFetch, userNotifications} = useLoaderData() as LoaderData;
    const [posts, setPosts] = useState<IPost[] | null>(postsFetch);
    const [notifications, setNotifications] = useState<IUserNotification[]>(userNotifications);
    const {user} = useContext(AuthContext) as AuthContextType

    const getMyFavoritesPosts = () => {
        if (!user) return [] as IPost[]
        return posts?.filter((post) => post.favorites.some((favorite) => favorite._id === user._id))
    }

    return (
        <homeContext.Provider value={{posts, setPosts, notifications, setNotifications, getMyFavoritesPosts}}>
            {children}
        </homeContext.Provider>
    );
};