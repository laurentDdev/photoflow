import {NavLink} from "react-router-dom";
import styles from "./ProfileNavigationBar.module.scss"

const ProfileNavigationBar = () => {
    return (
        <ul className={styles.profileNavigation}>
            <NavLink to={""} end className={({isActive}) => isActive ? styles.active : ""}><i className={"fa-solid fa-user"}></i>Profile</NavLink>
            <NavLink to={"posts"} end className={({isActive}) => isActive ? styles.active : ""}><i className={"fa-solid fa-image"}></i>Posts</NavLink>
        </ul>
    );
};

export default ProfileNavigationBar;