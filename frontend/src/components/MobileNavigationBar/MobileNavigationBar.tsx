import styles from "./MobileNavigationBar.module.scss"

const MobileNavigationBar = () => {
    return (
        <div className={styles.mobileNav}>
            <i className={"fa-solid fa-bars"}></i>
        </div>
    );
};

export default MobileNavigationBar;