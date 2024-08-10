import styles from "./Notification.module.scss";
import {IUserNotification} from "../../../../../../apis/user.api.ts";


type Props = {
    notification: IUserNotification
}

const Notification = ({notification}: Props) => {

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
        <div  className={styles.notificationItem}>
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
    );
};

export default Notification;