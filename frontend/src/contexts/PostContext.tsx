import {createContext, useState} from "react";
import {IPost} from "../models/Photo.ts";
import {useLoaderData} from "react-router-dom";

export type postContextType = {
    posts: IPost[] | null
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | null>>
}

export const postContext = createContext<postContextType | null>(null);



type Props = {
    children: React.ReactNode
}


export const PostProvider = ({children}: Props) => {


    const postsFetch = useLoaderData() as IPost[];
    console.log(postsFetch)
    const [posts, setPosts] = useState<IPost[] | null>(postsFetch);

    return (
        <postContext.Provider value={{posts, setPosts}}>
            {children}
        </postContext.Provider>
    );
};