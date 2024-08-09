import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import styles from "./RegisterForm.module.scss"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerUser} from "../../../../apis/auth.api.ts";

type Props = {
    handleLogin: () => void
}

const RegisterForm = ({handleLogin}: Props) => {
    const [showPassword, setShowPassword] = useState(false)

    const validationSchema = yup.object({
        email: yup.string().email("Email invalide").required("Email requis"),
        password: yup.string().required("Mot de passe requis").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Mot de passe invalide"),
        pseudo: yup.string().required("Pseudo requis").min(3, "Pseudo trop court").max(10, "Pseudo trop long")
    })

    const initalValues = {
        pseudo: "",
        email: "",
        password: ""
    }

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initalValues
    })

    const onSubmit = handleSubmit(async (values) => {

        try {
            clearErrors()
            await registerUser({username: values.pseudo, email: values.email, password: values.password})
            handleLogin()
        }catch (e) {
            console.log(e)

            if (e.error == "User already exists") {
                setError("email", {
                    type: "manual",
                    message: "Cet email est déjà utilisé"
                })
            } else {
                // @ts-ignore

                setError("generic", {
                    type: "generic",
                    message: "Erreur lors de l'inscription"
                })
            }


        }
    })

    return (
        <div className={"d-flex flex-column justify-content-center align-items-center flex-fill"}>
            <h1 className={"mb-20"}>S'inscrire</h1>
            <div className={`flex-column mb-20 ${styles.registerMd}`}>
                <p className={"mb-10"}>Vous avez deja un compte ?</p>
                <button className={"btn btn-reverse-primary"} onClick={handleLogin}>Se connecter</button>
            </div>
            <form onSubmit={onSubmit}>
                <div className={"d-flex flex-column mb-10"}>
                    <label htmlFor="pseudo" className={styles.label}>pseudo</label>
                    <input type="text" {...register("pseudo")} className={styles.input}/>
                    {errors.pseudo && <p className={styles.error}>{errors.pseudo.message}</p>}
                </div>
                <div className={"d-flex flex-column mb-10"}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" {...register("email")} className={styles.input}/>
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div className={"d-flex flex-column mb-10"}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <span className={`d-flex flex-column ${styles.inputPasswordContainer}`}>
                        <input type={showPassword ? "text" : "password"} {...register("password")}
                               className={styles.input}/>
                    <i onClick={() => setShowPassword(prevState => !prevState)}
                       className={`fa-solid ${styles.iconPassword} ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                <div className={"d-flex flex-column"}>
                    <button type={"submit"} disabled={isSubmitting} className={"btn btn-reverse-primary flex-fill"}>
                        S'inscrire
                    </button>
                    {errors.generic && <p className={styles.error}>{errors.generic.message}</p>}
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;