import styles from "./FavPage.module.scss"
import {useContext} from "react";
import {homeContext, homeContextType} from "../../../../contexts/HomeContext.tsx";
import FavCard from "./components/FavCard.tsx";
import {AuthContext, AuthContextType} from "../../../../contexts/AuthContext.tsx";


const FavPage = () => {

    const {getMyFavoritesPosts, toggleFavoritePost} = useContext(homeContext) as homeContextType
    const {user} = useContext(AuthContext) as AuthContextType
    const favoritesPosts = getMyFavoritesPosts()

    return (
        <>
            <div className={styles.favPage}>
                {
                    favoritesPosts.length > 0 ? favoritesPosts.map((favPost) => (
                        <FavCard key={favPost._id} userId={user ? user._id : ""} post={favPost}
                                 deleteFavorite={() => toggleFavoritePost(favPost._id)}/>
                    )) : <p>No favorite posts</p>
                }
            </div>
        </>

    )
        ;
};

export default FavPage;