import styles from "./HeaderBar.module.scss"


type Props = {
    filter: string,
    setFilter: (value: string) => void,
    toggleModalPhoto: () => void,
    showNotifications: () => void
}

const HeaderBar = ({filter, setFilter, toggleModalPhoto, showNotifications}: Props) => {


    return (
        <div className={styles.headerBar}>
            <div className={styles.inputFilter}>
                <i className={"fa-solid fa-search"}></i>
                <input type="text" onChange={(e) => setFilter(e.target.value)} value={filter} placeholder={"Recherchez"}/>
            </div>
            <div className={styles.headerAction}>
                <span onClick={toggleModalPhoto}><i className={"fa-solid fa-plus"}></i></span>
                <span onClick={showNotifications}><i className={"fa-solid fa-bell"}></i></span>
            </div>
        </div>
    );
};

export default HeaderBar;