import styles from "./ProfilePage.module.scss"
import ProfileNavigationBar from "./components/ProfileNavigationBar/ProfileNavigationBar.tsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";

const ProfilePage = () => {
    return (
        <div className={styles.profilePage}>
            <ProfileNavigationBar/>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet/>
            </Suspense>
        </div>
    );
};

export default ProfilePage;