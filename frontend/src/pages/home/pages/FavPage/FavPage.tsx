import styles from "./FavPage.module.scss"
import {useContext} from "react";
import {homeContext, homeContextType} from "../../../../contexts/HomeContext.tsx";
import FavCard from "./components/FavCard.tsx";
import {useNavigate} from "react-router-dom";


const FavPage = () => {

    const {getMyFavoritesPosts, toggleFavoritePost} = useContext(homeContext) as homeContextType

    const favoritesPosts = getMyFavoritesPosts()

    const navigate = useNavigate()


    return (
        <div className={styles.favPage}>
            {
                favoritesPosts.length > 0 ? favoritesPosts.map((favPost) => (
                    <FavCard key={favPost._id} post={favPost} deleteFavorite={() => toggleFavoritePost(favPost._id)} />
                )) : <p>No favorite posts</p>
            }
        </div>
    );
};

export default FavPage;