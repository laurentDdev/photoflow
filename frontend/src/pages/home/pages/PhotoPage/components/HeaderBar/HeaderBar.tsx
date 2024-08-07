import styles from "./HeaderBar.module.scss"
import {IUserNotification} from "../../../../../../apis/user.api.ts";
import {useMemo} from "react";


type Props = {
    filter: string,
    setFilter: (value: string) => void,
    toggleModalPhoto: () => void,
    notifications: IUserNotification[]
}

const HeaderBar = ({filter, setFilter, toggleModalPhoto, notifications}: Props) => {


    console.log(notifications)

    const getRecentNotifications = useMemo(() => {
        const now = new Date()
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

        return notifications.filter((notification => {
            const notificationDate = new Date(notification.createdAt)
            return notificationDate > oneDayAgo
        }))
    }, [notifications]);



    return (
        <div className={styles.headerBar}>
            <div className={styles.inputFilter}>
                <i className={"fa-solid fa-search"}></i>
                <input type="text" onChange={(e) => setFilter(e.target.value)} value={filter} placeholder={"Recherchez"}/>
            </div>
            <div className={styles.headerAction}>
                <span onClick={toggleModalPhoto}><i className={"fa-solid fa-plus"}></i></span>
                <span className={styles.notification}><i className={"fa-solid fa-bell"}></i><span></span>{getRecentNotifications.length}</span>
            </div>
        </div>
    );
};

export default HeaderBar;