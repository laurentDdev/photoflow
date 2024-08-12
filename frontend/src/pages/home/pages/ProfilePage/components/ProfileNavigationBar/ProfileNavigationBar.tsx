import {NavLink} from "react-router-dom";
import styles from "./ProfileNavigationBar.module.scss"
import {ThemeContext, ThemeContextType} from "../../../../../../contexts/ThemeContext.tsx";
import {useContext} from "react";

const ProfileNavigationBar = () => {

    const {theme} = useContext(ThemeContext) as ThemeContextType

    return (
        <ul className={`${styles.profileNavigation} ${theme !== "light" && styles.dark}`}>
            <NavLink to={""} end className={({isActive}) => isActive ? styles.active : ""}><i className={"fa-solid fa-user"}></i>Profile</NavLink>
            {/*<NavLink to={"posts"} end className={({isActive}) => isActive ? styles.active : ""}><i className={"fa-solid fa-image"}></i>Posts</NavLink>*/}
        </ul>
    );
};

export default ProfileNavigationBar;