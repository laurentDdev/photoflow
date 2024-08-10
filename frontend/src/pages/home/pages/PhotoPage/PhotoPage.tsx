import HeaderBar from "./components/HeaderBar/HeaderBar.tsx";
import {lazy, useContext, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {IPost} from "../../../../models/Photo.ts";
import {Navigate} from "react-router-dom";
import PostCard from "./components/PostCard/PostCard.tsx";
import styles from "./PhotoPage.module.scss"
import {AuthContext, AuthContextType, IUser} from "../../../../contexts/AuthContext.tsx";
import {homeContext, homeContextType} from "../../../../contexts/HomeContext.tsx";
import {useSocket} from "../../../../contexts/SocketContext.tsx";
import {IUserNotification} from "../../../../apis/user.api.ts";

const ModalAddPicture = lazy(() => import("./components/ModalAddPicture/ModalAddPicture.tsx"))


const PhotoPage = () => {

    const socket = useSocket()

    const {user} = useContext(AuthContext) as AuthContextType
    const {posts, setPosts,toggleLike, addPost,toggleFavoritePost, notifications: userNotifications} = useContext(homeContext) as homeContextType

    const [filter, setFilter] = useState<string>("");
    const [openModalPhoto, setOpenModalPhoto] = useState<boolean>(false);


    const [notifications, setNotifications] = useState<IUserNotification[]>(userNotifications);

    useEffect(() => {
        if (socket) {
            socket.socket?.on("likePost", (data) => {

                setPosts(posts && posts.map((post) => {
                    if (post._id === data.postId) {
                        return {...post, likes: data.likes}
                    }
                    return post
                }))
            })

            socket.socket?.on("receiveNotification", (data) => {
                console.log(data)
                setNotifications([data, ...notifications])
            })

        }

        return () => {
            socket?.socket?.off("likePost")
            socket?.socket?.off("receiveNotification")
        }
    }, [socket, posts, setPosts, notifications]);

    const updateFilter = (value: string) => {
        setFilter(value);
    }

    const toggleModalPhoto = () => {
        setOpenModalPhoto(prevState => !prevState);
    }




    return (
        <>
            {!user ? <Navigate to={"/auth"}/> : (
                <div className={styles.photoPage}>
                    <HeaderBar filter={filter} setFilter={updateFilter} toggleModalPhoto={toggleModalPhoto}
                               notifications={notifications}/>
                    <div className={`${styles.postContainer}`}>
                        {posts && posts.filter((p: IPost) => (p.author as IUser).username.toLowerCase().startsWith(filter.toLowerCase())).map((post: IPost) => (
                            <PostCard key={post._id} post={post} user={user} toggleLike={toggleLike}
                                      toggleFavorite={toggleFavoritePost}/>
                        ))}
                    </div>
                </div>
            )}

            {
                openModalPhoto && createPortal(<ModalAddPicture addNewPost={addPost}
                                                                toggleModalPhoto={toggleModalPhoto}/>, document.body)
            }
        </>
    );
};

export default PhotoPage;