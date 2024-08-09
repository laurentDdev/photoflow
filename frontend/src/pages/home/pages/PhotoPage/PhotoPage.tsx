import HeaderBar from "./components/HeaderBar/HeaderBar.tsx";
import {lazy, useContext, useEffect, useMemo, useState} from "react";
import {createPortal} from "react-dom";
import {IPost} from "../../../../models/Photo.ts";
import {Navigate, useLoaderData, useNavigate} from "react-router-dom";
import PostCard from "./components/PostCard/PostCard.tsx";
import styles from "./PhotoPage.module.scss"
import {AuthContext, AuthContextType, IUser} from "../../../../contexts/AuthContext.tsx";
import {favoritePost, likePost} from "../../../../apis/post.api.ts";
import {postContext, postContextType} from "../../../../contexts/PostContext.tsx";
import {useSocket} from "../../../../contexts/SocketContext.tsx";

const ModalAddPicture = lazy(() => import("./components/ModalAddPicture/ModalAddPicture.tsx"))


const PhotoPage = () => {

    const socket = useSocket()

    const {user} = useContext(AuthContext) as AuthContextType
    const {posts, setPosts} = useContext(postContext) as postContextType


    const [filter, setFilter] = useState<string>("");
    const [openModalPhoto, setOpenModalPhoto] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (socket) {
            socket.socket?.on("likePost", (data) => {
                console.log("Data from likePost")
                console.log(data)

                // Set data.likes to the post that has the same id as data._id
                setPosts(posts && posts.map((post) => {
                    if (post._id === data.postId) {
                        return {...post, likes: data.likes}
                    }
                    return post
                }))

            })
        }
    }, [socket]);

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
                setPosts(posts && posts.map((post) => {
                    if (post._id === postId) {
                        return updatePost
                    }
                    return post
                }))
            }
        } catch (e) {
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
                setPosts(posts && posts.map((post) => {
                    if (post._id === postId) {
                        return updatePost
                    }
                    return post
                }))
            }
        }catch (e) {
            if (e.message == "Unauthorized") {
                navigate("/auth")
            }
            console.error(e)
        }
    }

    const showNotifications = () => {
        console.log("Show notifications")
    }

    return (
        <>
            {!user ? <Navigate to={"/auth"} /> : (
                <div className={styles.photoPage}>
                    <HeaderBar filter={filter} setFilter={updateFilter} toggleModalPhoto={toggleModalPhoto}
                               showNotifications={showNotifications}/>
                    <div className={`${styles.postContainer}`}>
                        {posts && posts.filter((p) => (p.author as IUser).username.toLowerCase().startsWith(filter.toLowerCase())).map((post) => (
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