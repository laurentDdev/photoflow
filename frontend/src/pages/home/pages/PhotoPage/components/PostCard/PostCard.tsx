import styles from "./PostCard.module.scss"
import { IPost} from "../../../../../../models/Photo.ts";


type Props = {
    post: IPost
}

const PostCard = ({post}: Props) => {
    return (
        <div className={"card"}>
            {post.name}
        </div>
    );
};

export default PostCard;