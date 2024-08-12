import styles from "./SettingsPage.module.scss"
import {useContext} from "react";
import {ThemeContext, ThemeContextType} from "../../../../contexts/ThemeContext.tsx";

const SettingsPage = () => {

    const {toggleTheme, theme} = useContext(ThemeContext) as ThemeContextType

    return (
        <div className={`${styles.settingsPage} ${theme !== "light" && styles.dark}`}>
            <div>
                <h1>Paramètres</h1>
                <div className={styles.settingsContainer}>
                    <div className={styles.langues}>
                        <h3 className={"mb-10"}>Choisir la langues</h3>
                        <select>
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <div className={styles.themes}>
                        <h3 className={"mb-10"}>Choisir le thème</h3>
                    {/* switch for dark mode   */}
                        <label className={styles.switch}>
                            <input type="checkbox" onChange={toggleTheme} checked={theme !== "light"} />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;