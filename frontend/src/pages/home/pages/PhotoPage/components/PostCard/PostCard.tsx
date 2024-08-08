import styles from "./PostCard.module.scss"
import {IPost} from "../../../../../../models/Photo.ts";
import {IUser} from "../../../../../../contexts/AuthContext.tsx";
import {useEffect, useState} from "react";


type Props = {
    post: IPost,
    user: IUser
}

const PostCard = ({post, user}: Props) => {

    const [isLiked, setIsLiked] = useState<boolean>(false)

    useEffect(() => {
        if (post.likes) {
            setIsLiked(post.likes.some((like) => like._id === user._id))
        }
    }, [post.likes, user._id]);

    const toggleLike = async () => {

    }

    return (
        <div className={"card p-10"}>
            <div className={`d-flex align-items-center ${styles.cardHeader} mb-10`}>
                <img height={50}
                     src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/avatars/${typeof post.author !== "string" ? post.author?.avatar + '.png' : ''}`}
                     alt=""/>
                <span>{typeof post.author !== "string" ? post.author?.username : ''}</span>
            </div>
            <img className={styles.postImage} src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/posts/${post.image}`}
                 alt=""/>
            <div className={""}>
                <div className={styles.cardAction}>
                    <div>
                        {
                            isLiked ?
                                <i className={"fa-solid fa-heart"}></i>
                                :
                                <i className={"fa-regular fa-heart"}></i>
                        }
                        <i className={"fa-regular fa-comment"}></i>
                        <i className={"fa-solid fa-share"}></i>
                    </div>
                    <i className={"fa-regular fa-bookmark"}></i>
                </div>
            </div>
        </div>
    );
};


// fa-solid fa-heart
// fa-solid fa-comment
// fa-solid fa-share
// fa-solid fa-bookmark

export default PostCard;