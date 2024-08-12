import styles from "./Comment.module.scss"
import {IPostComment} from "../../../apis/post.api.ts";
import {useMemo} from "react";
import {timeSince} from "../../../utils/time.ts";


type Props = {
    comment: IPostComment
    theme: string
}

const Comment = ({comment, theme}: Props) => {


    const elapsedTime = useMemo(() => timeSince(new Date(comment.createdAt)), [comment.createdAt]);


    return (
        <div className={`${styles.comment}`} style={{
            background: theme === "light" ? "#f0f2f5" : "#1a1a1a",
        }}>
            <div className={styles.commentHeader}>
                <img height={40}
                     src={`${import.meta.env.VITE_PUBLIC_API_URL}assets/avatars/${comment.author.avatar}.png`} alt=""/>
                <p style={{
                    color: theme === "light" ? "#000" : "#fff"
                }}>{comment.author.username}</p>
            </div>
            <div className={styles.commentContent}>
                <p>{comment.comment}</p>
                <div>
                    <p>{elapsedTime}</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;