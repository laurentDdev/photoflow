import HeaderBar from "./components/HeaderBar/HeaderBar.tsx";
import {lazy, useContext, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {IPost} from "../../../../models/Photo.ts";
import {Navigate, useNavigate} from "react-router-dom";
import PostCard from "./components/PostCard/PostCard.tsx";
import styles from "./PhotoPage.module.scss"
import {AuthContext, AuthContextType, IUser} from "../../../../contexts/AuthContext.tsx";
import {favoritePost, likePost} from "../../../../apis/post.api.ts";
import {homeContext, homeContextType} from "../../../../contexts/HomeContext.tsx";
import {useSocket} from "../../../../contexts/SocketContext.tsx";
import {IUserNotification} from "../../../../apis/user.api.ts";

const ModalAddPicture = lazy(() => import("./components/ModalAddPicture/ModalAddPicture.tsx"))


const PhotoPage = () => {

    const socket = useSocket()

    const {user} = useContext(AuthContext) as AuthContextType
    const {posts, setPosts, notifications: userNotifications} = useContext(homeContext) as homeContextType

    const [filter, setFilter] = useState<string>("");
    const [openModalPhoto, setOpenModalPhoto] = useState<boolean>(false);


    const [notifications, setNotifications] = useState<IUserNotification[]>(userNotifications);

    const navigate = useNavigate();

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

    const addNewPost = (newPost: IPost) => {

        if (!posts) {
            return
        }

        setPosts([newPost, ...posts])
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

    const toggleFavorite = async (postId: string) => {
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


    return (
        <>
            {!user ? <Navigate to={"/auth"}/> : (
                <div className={styles.photoPage}>
                    <HeaderBar filter={filter} setFilter={updateFilter} toggleModalPhoto={toggleModalPhoto}
                               notifications={notifications}/>
                    <div className={`${styles.postContainer}`}>
                        {posts && posts.filter((p: IPost) => (p.author as IUser).username.toLowerCase().startsWith(filter.toLowerCase())).map((post: IPost) => (
                            <PostCard key={post._id} post={post} user={user} toggleLike={toggleLike}
                                      toggleFavorite={toggleFavorite}/>
                        ))}
                    </div>
                </div>
            )}

            {
                openModalPhoto && createPortal(<ModalAddPicture addNewPost={addNewPost}
                                                                toggleModalPhoto={toggleModalPhoto}/>, document.body)
            }
        </>
    );
};

export default PhotoPage;