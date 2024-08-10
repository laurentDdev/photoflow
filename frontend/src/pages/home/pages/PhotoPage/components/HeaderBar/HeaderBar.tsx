import styles from "./HeaderBar.module.scss"
import {IUserNotification} from "../../../../../../apis/user.api.ts";
import {useMemo, useState} from "react";


type Props = {
    filter: string,
    setFilter: (value: string) => void,
    toggleModalPhoto: () => void,
    notifications: IUserNotification[]
}

const HeaderBar = ({filter, setFilter, toggleModalPhoto, notifications}: Props) => {


    const [openNotification, setOpenNotification] = useState<boolean>(false)

    const getRecentNotifications = useMemo(() => {
        const now = new Date()
        const oneMinuteAgo = new Date(now.getTime() - 60 * 1000)


        return notifications.filter((notification => {
            const notificationDate = new Date(notification.createdAt)
            return notificationDate > oneMinuteAgo
        }))
    }, [notifications]);

    function timeSince(date: Date) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return "il y a " + interval + " ans";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return "il y a " + interval + " mois";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return "il y a " + interval + " jours";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return "il y a " + interval + " heures";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return "il y a " + interval + " minutes";
        }
        return "il y a " + Math.floor(seconds) + " secondes";
    }


    return (
        <div className={styles.headerBar}>
            <div className={styles.inputFilter}>
                <i className={"fa-solid fa-search"}></i>
                <input type="text" onChange={(e) => setFilter(e.target.value)} value={filter}
                       placeholder={"Recherchez"}/>
            </div>
            <div className={styles.headerAction}>
                <span onClick={toggleModalPhoto}><i className={"fa-solid fa-plus"}></i></span>
                <span onClick={() => setOpenNotification(prevState => !prevState)} className={styles.notificationIcon}><i className={"fa-solid fa-bell"}></i>
                    {getRecentNotifications.length > 0 && <span>{getRecentNotifications.length}</span>}

                    {openNotification && (
                        <div className={styles.notificationsContainer} onMouseLeave={() => setOpenNotification(false)}>
                            {
                               notifications.length > 0 ? (
                                   notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((notification) => (
                                       <div key={notification._id} className={styles.notificationItem}>
                                           <div>
                                               <div className={`d-flex flex-column ${styles.notificationLeft}`}>
                                                   <img height={30}
                                                        src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/avatars/${notification?.sender.avatar}.png`}
                                                        alt=""/>
                                                   <p>{notification.sender.username}</p>
                                               </div>
                                               <p>{notification.content}<p>Recu il y
                                                   a {timeSince(new Date(notification.createdAt))}</p></p>
                                           </div>

                                       </div>
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