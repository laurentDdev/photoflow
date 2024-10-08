import {createContext, useContext, useState} from "react";
import {IPost} from "../models/Post.ts";
import {useLoaderData, useNavigate} from "react-router-dom";
import {AuthContext, AuthContextType} from "./AuthContext.tsx";
import {favoritePost, likePost, commentPost as commentPostApi} from "../apis/post.api.ts";
import {IUserNotification} from "../models/Notification.ts";

export type homeContextType = {
    posts: IPost[] | null
    setPosts: React.Dispatch<React.SetStateAction<IPost[] | null>>,
    notifications: IUserNotification[]
    setNotifications: React.Dispatch<React.SetStateAction<IUserNotification[]>>
    getMyFavoritesPosts: () => IPost[] | [],
    toggleFavoritePost: (postId: string) => void
    addPost: (post: IPost) => void
    toggleLike: (postId: string) => void
    commentPost: (postId: string, comment: string, callback: () => void) => void
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


    const navigate = useNavigate()
    const {posts: postsFetch, userNotifications} = useLoaderData() as LoaderData;
    const [posts, setPosts] = useState<IPost[] | null>(postsFetch);
    const [notifications, setNotifications] = useState<IUserNotification[]>(userNotifications);
    const {user} = useContext(AuthContext) as AuthContextType

    const getMyFavoritesPosts = () => {
        if (user) {
            return posts?.filter((post) => post.favorites.some((favorite) => favorite._id === user._id)) || []
        }
        return posts || []
    }

    const addPost = (post: IPost) => {
        setPosts(prev => {
            if (!prev) return prev;
            return [post, ...prev]
        })
    }

    const commentPost = async (postId: string, comment: string, callback: () => void) => {
        try {
            const savedComment = await commentPostApi(postId, comment)
            if (savedComment) {
                setPosts(prevState => {
                    if (!prevState) return prevState
                    return prevState.map((p) => {
                        if (p._id === postId) {
                            return {
                                ...p,
                                comments: [savedComment, ...p.comments ]
                            }
                        }
                        return p
                    })
                })
            }
            callback()
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (e.message == "Unauthorized") {
                navigate("/auth")
            }
            console.error(e)
        }
    }

    const toggleFavoritePost = async (postId: string) => {
        try {
            const updatePost = await favoritePost(postId)
            if (updatePost) {
                setPosts(prev => {
                    if (!prev) return prev;
                    return prev.map((post) => {
                        if (post._id === postId) {
                            return updatePost
                        }
                        return post
                    })
                })
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (e.message == "Unauthorized") {
                navigate("/auth")
            }
            console.error(e)
        }
    }

    const toggleLike = async (postId: string) => {
        try {
            const updatePost = await likePost(postId)
            if (updatePost) {
                setPosts(prevState => {
                    if (!prevState) return prevState; // Si prevState est null, on le retourne tel quel
                    return prevState.map((p) => {
                        if (p._id === updatePost._id) {
                            return {
                                ...p,
                                likes: updatePost.likes,
                            };
                        }
                        return p;
                    });
                });
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (e.message == "Unauthorized") {
                navigate("/auth")
            }
            console.error(e)
        }
    }

    return (
        <homeContext.Provider value={{
            posts,
            setPosts,
            notifications,
            setNotifications,
            getMyFavoritesPosts,
            toggleFavoritePost,
            addPost,
            toggleLike,
            commentPost
        }}>
            {children}
        </homeContext.Provider>
    );
};