import {useForm} from "react-hook-form";
import {Link, Navigate} from "react-router-dom";
import styles from "./LoginForm.module.scss"
import {useContext, useState} from "react";

import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {AuthContext, AuthContextType} from "../../../../../contexts/AuthContext.tsx";

type Props = {
    handleRegister: () => void
}

const LoginForm = ({handleRegister}: Props) => {

    const {login, user} = useContext(AuthContext) as AuthContextType

    const [showPassword, setShowPassword] = useState(false)

    const validationSchema = yup.object({
        email: yup.string().email("Email invalide").required("Email requis"),
        password: yup.string().required("Mot de passe requis").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Mot de passe invalide"),
    })

    const initialValues = {
        email: "",
        password: ""
    }

    const {
        register,
        handleSubmit,
        clearErrors,
        setError,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues
    })

    const onSubmit = handleSubmit(async (values) => {

        try {
            clearErrors()
            await login(values)
        }catch (e) {
            console.log(e)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setError("generic", {
                type: "generic",
                message: "Erreur lors de la connexion"
            })
        }
    })

    return (
        <>
            {user ? <Navigate to={"/"} /> : (
                <div className={"d-flex flex-column justify-content-center align-items-center flex-fill"}>
                    <h2 className={"mb-20"}>Se connecter</h2>
                    <div className={`flex-column mb-20 ${styles.registerMd}`}>
                        <p className={"mb-10"}>Vous n'avez pas encore de compte ?</p>
                        <button className={"btn btn-reverse-primary"} onClick={handleRegister}>S'inscrire</button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className={"d-flex flex-column mb-20"}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input type="email" {...register("email")} className={styles.input}/>
                            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                        </div>
                        <div className={"d-flex flex-column mb-10"}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <span className={`d-flex flex-column ${styles.inputPasswordContainer}`}>
                        <input type={showPassword ? "text" : "password"} {...register("password")}
                               className={styles.input}/>
                    <i onClick={() => setShowPassword(prevState => !prevState)}
                       className={`fa-solid ${styles.iconPassword} ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                            {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                        </div>
                        <Link className={styles.requestPassword} to={""}>Mot de passe oublié ?</Link>
                        <div className={"d-flex flex-column"}>
                            <button type={"submit"}
                                    className={`btn btn-reverse-primary flex-fill ${styles.btnLogin}`}>Se
                                connecter
                            </button>
                            {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                errors.generic && <p className={styles.error}>{errors.generic.message}</p>}
                        </div>
                    </form>
                </div>
            )
            }
        </>

    );
};

export default LoginForm;