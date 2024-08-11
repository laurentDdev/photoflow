import styles from "./Notification.module.scss";
import {useMemo} from "react";
import {timeSince} from "../../../../../../utils/time.ts";
import {IUserNotification} from "../../../../../../models/Notification.ts";


type Props = {
    notification: IUserNotification
}

const Notification = ({notification}: Props) => {

    const elapsedTime = useMemo(() => timeSince(new Date(notification.createdAt)), [notification.createdAt]);

    return (
        <div  className={styles.notificationItem}>
            <div>
                <div className={`d-flex flex-column ${styles.notificationLeft}`}>
                    <img height={30}
                         src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/avatars/${notification?.sender.avatar}.png`}
                         alt=""/>
                    <p>{notification.sender.username}</p>
                </div>
                <p>{notification.content}<p>{elapsedTime}</p></p>
            </div>

        </div>
    );
};

export default Notification;