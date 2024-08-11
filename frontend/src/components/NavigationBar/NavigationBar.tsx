import {useContext} from "react";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.tsx";
import styles from "./NavigationBar.module.scss"
import {Navigate, NavLink} from "react-router-dom";

const NavigationBar = () => {

    const {user, logout} = useContext(AuthContext) as AuthContextType

    return (
        <>
            {user ? (
                <header className={styles.navigationBar}>
                    <>
                        <div className={"d-flex flex-column align-items-center"}>
                            <div className={styles.headerInfos}>
                                <img height={50}
                                     src={`${import.meta.env.VITE_PUBLIC_API_URL}assets/avatars/${user.avatar}.png`}
                                     alt=""/>
                                <h3>{user.username}</h3>
                                <span
                                    className={`${styles.accountType} ${user.accountType == 'free' ? styles.accountFree : styles.accountPremium}`}>
                        {user.accountType}
                    </span>
                            </div>
                            <div className={`${styles.stats}`}>
                                <div className={"d-flex flex-column align-items-center"}>98 <span>Posts</span></div>
                                <div className={"d-flex flex-column align-items-center"}>3.5k <span>Followers</span>
                                </div>
                                <div className={"d-flex flex-column align-items-center"}>1k <span>Following</span></div>
                            </div>
                            <div className={`${styles.navigation}`}>
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

                        </div>

                        <div className={styles.logout}>
                            <button onClick={logout}><i className={"fa-solid fa-right-from-bracket"}></i>Se déconnecter
                            </button>
                        </div>
                    </>
                </header>
            ): (<Navigate to={"/auth"} />)}
        </>
    );
};

export default NavigationBar;