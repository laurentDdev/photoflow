import {createContext, useState} from "react";
import {IPost} from "../models/Photo.ts";
import {useLoaderData} from "react-router-dom";
import {IUserNotification} from "../apis/user.api.ts";

export type homeContextType = {
    posts: IPost[] | null
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | null>>,
    notifications: IUserNotification[]
    setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>
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

    return (
        <homeContext.Provider value={{posts, setPosts, notifications, setNotifications}}>
            {children}
        </homeContext.Provider>
    );
};