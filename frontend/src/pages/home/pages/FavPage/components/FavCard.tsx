import {IPost} from "../../../../../models/Post.ts";
import styles from "./FavCard.module.scss"
import ModalPreviewPost from "../../../../../components/ModalPreviewPost/ModalPreviewPost.tsx";
import {useEffect, useState} from "react";

type Props = {
    post: IPost
    deleteFavorite: () => void,
    userId: string
}

const FavCard = ({post, deleteFavorite, userId}: Props) => {

    const [preview, setPreview] = useState<boolean>(false)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [isLiked, setIsLiked] = useState<boolean>(false)

    useEffect(() => {
        if (post.likes) {
            setIsLiked(!!post.likes.find((like) => like._id === userId))
        }
        if (post.favorites) {
            setIsFavorite(post.favorites.some((favorite) => favorite._id === userId))
        }
    }, [post.likes, post.favorites, userId]);
    return (
        <>
            <div className={styles.favCard} onClick={() => setPreview(true)}>
                <div className={styles.favCardAction} onClick={(e) => {
                    e.stopPropagation()
                    deleteFavorite()
                }}>
                    <i className={"fa-solid fa-trash"}></i>
                </div>
                <img
                    src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/posts/${post.image}`} alt=""/>

            </div>
            {
                preview &&
                <ModalPreviewPost closePreview={() => setPreview(false)} post={post} isLiked={isLiked}
                                  isFavorite={isFavorite}/>
            }
        </>

    )
        ;
};

export default FavCard;