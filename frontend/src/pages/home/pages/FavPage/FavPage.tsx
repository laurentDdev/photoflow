import styles from "./FavPage.module.scss"
import {useContext} from "react";
import {homeContext, homeContextType} from "../../../../contexts/HomeContext.tsx";
import FavCard from "./components/FavCard.tsx";


const FavPage = () => {

    const {getMyFavoritesPosts} = useContext(homeContext) as homeContextType

    const favoritesPosts = getMyFavoritesPosts()

    console.log(favoritesPosts)

    return (
        <div className={styles.favPage}>
            {
                favoritesPosts.length > 0 ? favoritesPosts.map((favPost) => (
                    <FavCard key={favPost._id} post={favPost}/>
                )) : <p>No favorite posts</p>
            }
        </div>
    );
};

export default FavPage;