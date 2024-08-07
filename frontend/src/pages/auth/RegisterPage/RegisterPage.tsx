import styles from "./RegisterPage.module.scss"
import RegisterForm from "./RegisterForm/RegisterForm.tsx";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/auth")
    }

    return (
        <div className={`d-flex ${styles.register}`}>
            <RegisterForm handleLogin={handleLogin} />
            <div className={`${styles.background} d-flex justify-content-center flex-column align-items-center`}>
                <h2>Bienvenue sur photoflow !</h2>
                <p>Vous avez déjà un compte ?</p>
                <button className={"btn btn-primary"} onClick={handleLogin}>Se connecter</button>
            </div>
        </div>
    );
};

export default RegisterPage;