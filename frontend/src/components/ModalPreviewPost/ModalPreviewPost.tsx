import {createPortal} from "react-dom";
import {IPost} from "../../models/Post.ts";
import styles from "./ModalPreviewPost.module.scss"
import {useContext, useEffect, useRef, useState} from "react";
import {homeContext, homeContextType} from "../../contexts/HomeContext.tsx";
import Comment from "./components/Comment.tsx";

type Props = {
    post: IPost,
    isLiked: boolean,
    isFavorite: boolean,
    closePreview: () => void
}

const ModalPreviewPost = ({post, isLiked, isFavorite, closePreview}: Props) => {

    const {toggleLike, toggleFavoritePost, commentPost} = useContext(homeContext) as homeContextType
    const commentContainer = useRef<HTMLDivElement>(null)

    const [comment, setComment] = useState<string>("")

    const handleComment = () => {
        commentPost(post._id, comment, () => {
            setComment("")
        })
    }

    useEffect(() => {
        if (commentContainer.current) {
            commentContainer.current.scrollTo(0,0)
        }
    }, [post.comments]);

    return (
        createPortal(<div className={styles.modalPreviewCard}>
            <div>
                <img height={300} src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/posts/${post.image}`} alt=""/>
                <p>{post.description}</p>
                <div className={styles.modalPreviewCardAction}>
                    <div>
                        {
                            isLiked ?
                                <i className={"fa-solid fa-heart"} onClick={() => toggleLike(post._id)}></i>
                                :
                                <i className={"fa-regular fa-heart"} onClick={() => toggleLike(post._id)}></i>
                        }
                        <i className={"fa-solid fa-share"}></i>
                    </div>
                    {
                        isFavorite ?
                            <i className={"fa-solid fa-bookmark"} onClick={() => toggleFavoritePost(post._id)}></i>
                            : <i className={"fa-regular fa-bookmark"} onClick={() => toggleFavoritePost(post._id)}></i>
                    }
                </div>

            </div>
            <div className={styles.modalPreviewCardContent}>
                <div className={styles.modalPreviewCardContentHeader}>
                    <div className={"d-flex align-items-center"}>
                        <img height={50}
                             src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/avatars/${typeof post.author !== "string" ? post.author?.avatar + '.png' : ''}`}
                             alt=""/>
                        <span>{typeof post.author !== "string" ? post.author?.username : ''}</span>
                    </div>
                    <i className={"fa-solid fa-xmark"} onClick={closePreview}></i>
                </div>
                <div className={styles.modalPreviewCardContentComment}>
                    <div className={styles.modalPreviewCardContentCommentItem} ref={commentContainer} >
                        {
                            post.comments.length > 0 && post.comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((comment) => (
                                <Comment key={comment._id} comment={comment}/>
                            ))
                        }
                    </div>
                    <div className={styles.inputSearch}>
                        <i className={`fa-solid fa-search ${styles.search}`}></i>
                        <input type="text"
                               placeholder={"Tapez votre commentaire"} value={comment} onChange={(e) => setComment(e.target.value)} />
                        <i onClick={handleComment} className={`fa-solid fa-paper-plane ${styles.send}`}></i>
                    </div>
                </div>

            </div>
        </div>, document.body)
    );
};

export default ModalPreviewPost;