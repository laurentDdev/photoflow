import styles from "./PostCard.module.scss"
import {IPost} from "../../../../../../models/Post.ts";
import {useEffect, useMemo, useState} from "react";
import ModalPreviewPost from "../../../../../../components/ModalPreviewPost/ModalPreviewPost.tsx";
import {timeSince} from "../../../../../../utils/time.ts";
import {IUser} from "../../../../../../models/User.ts";


type Props = {
    post: IPost,
    user: IUser,
    toggleLike: (postId: string) => void
    toggleFavorite: (postId: string) => void
}

const PostCard = ({post, user, toggleLike, toggleFavorite}: Props) => {

    const [isLiked, setIsLiked] = useState<boolean>(false)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [preview, setPreview] = useState<boolean>(false)

    const elapsedTime = useMemo(() => timeSince(new Date(post.createdAt)), [post.createdAt]);


    useEffect(() => {
        if (post.likes) {
            setIsLiked(!!post.likes.find((like) => like._id === user._id))
        }
        if (post.favorites) {
            setIsFavorite(post.favorites.some((favorite) => favorite._id === user._id))
        }
    }, [post.likes, user._id, post.favorites]);

    return (
        <>
            <div className={`card p-10 ${styles.card}`}>
                <div className={`d-flex align-items-center ${styles.cardHeader} mb-10`}>
                    <img height={50}
                         src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/avatars/${typeof post.author !== "string" ? post.author?.avatar + '.png' : ''}`}
                         alt=""/>
                    <span>{typeof post.author !== "string" ? post.author?.username : ''}</span>
                </div>
                <div className={styles.postImageContainer} onDoubleClick={() => toggleLike(post._id)}>
                    <img className={styles.postImage}
                         src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/posts/${post.image}`}
                         alt=""/>
                </div>
                <div>
                    <div className={styles.cardAction}>
                        <div>
                            {
                                isLiked ?
                                    <i className={"fa-solid fa-heart"} onClick={() => toggleLike(post._id)}></i>
                                    :
                                    <i className={"fa-regular fa-heart"} onClick={() => toggleLike(post._id)}></i>
                            }
                            <i className={"fa-regular fa-comment"} onClick={() => setPreview(true)}></i>
                            <i className={"fa-solid fa-share"}></i>

                        </div>
                        {
                            isFavorite ?
                                <i className={"fa-solid fa-bookmark"} onClick={() => toggleFavorite(post._id)}></i>
                                : <i className={"fa-regular fa-bookmark"} onClick={() => toggleFavorite(post._id)}></i>
                        }

                    </div>
                </div>
                <div className={styles.cardFooter}>
                    <div className={`d-flex align-items-center ${styles.cardFooterLike}`}>
                        <p>{post.likes.length} Likes...</p>
                        <ul className={"d-flex"}>
                            {
                                post.likes.slice(0, 2).map((like) => (
                                    <img key={like._id} height={15}
                                         src={`${import.meta.env.VITE_PUBLIC_API_URL}assets/avatars/${like.avatar}.png`}
                                         alt=""/>
                                ))
                            }
                        </ul>

                    </div>
                    <div className={styles.cardFooterDate}>
                        <p className={"mb-10"}>{post.name.length > 15 ? post.name.slice(0, 15) + "..." : post.name}</p>
                        <div>
                            <p>{elapsedTime}</p>
                        </div>
                    </div>
                </div>
            </div>
            {
                preview && <ModalPreviewPost closePreview={() => setPreview(false)} post={post} isLiked={isLiked} isFavorite={isFavorite} />
            }
        </>
    );
};

export default PostCard;