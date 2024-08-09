import styles from "./MobileNavigationBar.module.scss"
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {createPortal} from "react-dom";

const MobileNavigationBar = () => {

    const [open, setOpen] = useState(false)

    return (
        <div className={styles.mobileNav}>
            <i className={"fa-solid fa-bars"} onClick={() => setOpen(prevState => !prevState)} ></i>
            {
                open && (
                    <>
                        <div className={styles.mobileNavContent}>
                            <ul>
                                <li><NavLink to={""} className={({isActive}) => isActive ? styles.navActive : ""}><i
                                    className={"fa-solid fa-home"}></i>Accueil</NavLink></li>
                                <li><NavLink to={"fav"}
                                             className={({isActive}) => isActive ? styles.navActive : ""}><i
                                    className={"fa-solid fa-star"}></i>Favoris</NavLink></li>
                                <li><NavLink to={"profile"}
                                             className={({isActive}) => isActive ? styles.navActive : ""}><i
                                    className={"fa-solid fa-user"}></i>Profil</NavLink></li>
                                <li><NavLink to={"settings"}
                                             className={({isActive}) => isActive ? styles.navActive : ""}><i
                                    className={"fa-solid fa-cog"}></i>Paramètres</NavLink></li>
                            </ul>
                        </div>
                        {createPortal(<span onClick={() => setOpen(false)} className={styles.mask}></span>, document.body)}
                    </>
                )
            }
        </div>
    );
};

export default MobileNavigationBar;