import {IPost} from "../../../../../models/Photo.ts";
import styles from "./FavCard.module.scss"

type Props = {
    post: IPost
    deleteFavorite: () => void
}

const FavCard = ({post, deleteFavorite}: Props) => {


    return (
        <div className={styles.favCard}>
            <div className={styles.favCardAction} onClick={deleteFavorite}>
                <i className={"fa-solid fa-trash"}></i>
            </div>
            <img
                src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/posts/${post.image}`} alt=""/>

        </div>
    );
};

export default FavCard;