import styles from "./Comment.module.scss"
import {IPostComment} from "../../../apis/post.api.ts";
// import {useMemo} from "react";
import {timeSince} from "../../../utils/time.ts";


type Props = {
    comment: IPostComment
}

const Comment = ({comment}: Props) => {



    // const elapsedTime = useMemo(() => timeSince(new Date(comment.createdAt)), [comment.createdAt]);


    return (
        <div className={styles.comment}>
            <div className={styles.commentHeader}>
                <img height={40}
                     src={`${import.meta.env.VITE_PUBLIC_API_URL}assets/avatars/${comment.author.avatar}.png`} alt=""/>
                <p>{comment.author.username}</p>
            </div>
            <div className={styles.commentContent}>
                <p>{comment.comment}</p>
                <div>
                    <p>{timeSince(new Date(comment.createdAt))}</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;