import styles from "./HeaderBar.module.scss"
import {useContext, useMemo, useState} from "react";
import Notification from "../Notification/Notification.tsx";
import {IUserNotification} from "../../../../../../models/Notification.ts";
import {ThemeContext, ThemeContextType} from "../../../../../../contexts/ThemeContext.tsx";


type Props = {
    filter: string,
    setFilter: (value: string) => void,
    toggleModalPhoto: () => void,
    notifications: IUserNotification[]
}

const HeaderBar = ({filter, setFilter, toggleModalPhoto, notifications}: Props) => {


    const [openNotification, setOpenNotification] = useState<boolean>(false)
    const {theme} = useContext(ThemeContext) as ThemeContextType
    const getRecentNotifications = useMemo(() => {
        const now = new Date()
        const oneMinuteAgo = new Date(now.getTime() - 60 * 1000)


        return notifications.filter((notification => {
            const notificationDate = new Date(notification.createdAt)
            return notificationDate > oneMinuteAgo
        }))
    }, [notifications]);




    return (
        <div className={styles.headerBar}>
            <div className={styles.inputFilter}>
                <i className={"fa-solid fa-search"}></i>
                <input type="text" onChange={(e) => setFilter(e.target.value)} value={filter}
                       placeholder={"Recherchez"}/>
            </div>
            <div className={`${styles.headerAction} ${theme !== "light" && styles.dark}`}>
                <span onClick={toggleModalPhoto}><i className={"fa-solid fa-plus"}></i></span>
                <span onClick={() => setOpenNotification(prevState => !prevState)} className={styles.notificationIcon}><i className={"fa-solid fa-bell"}></i>
                    {getRecentNotifications.length > 0 && <span>{getRecentNotifications.length}</span>}

                    {openNotification && (
                        <div className={styles.notificationsContainer} onMouseLeave={() => setOpenNotification(false)}>
                            {
                               notifications.length > 0 ? (
                                   notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((notification) => (
                                       <Notification notification={notification} theme={theme} />
                                   ))
                               ): <p>Vous n'avez aucune notification</p>
                            }
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
};

export default HeaderBar;