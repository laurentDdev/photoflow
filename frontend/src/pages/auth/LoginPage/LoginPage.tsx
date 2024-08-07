import styles from "./LoginPage.module.scss"
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate()

    const handleRegister = () => {
        navigate("register")
    }

    return (
        <div className={`d-flex ${styles.login}`}>
            <div className={`${styles.background} d-flex justify-content-center flex-column align-items-center`}>
                <h2>Content de vous revoir !</h2>
                <p>Vous n'avez pas encore de compte ?</p>
                <button className={"btn btn-primary"} onClick={handleRegister}>S'inscrire</button>
            </div>
            <LoginForm handleRegister={handleRegister} />
        </div>
    );
};

export default LoginPage;