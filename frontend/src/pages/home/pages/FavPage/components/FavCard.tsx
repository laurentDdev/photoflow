import {IPost} from "../../../../../models/Photo.ts";
import styles from "./FavCard.module.scss"

type Props = {
    post: IPost
}

const FavCard = ({post}: Props) => {
    return (
        <div className={styles.favCard} >
            <img  src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/posts/${post.image}`} alt=""/>
        </div>
    );
};

export default FavCard;