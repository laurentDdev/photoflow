import {useContext, useState} from "react";
import {AuthContext, AuthContextType} from "../../../../../../contexts/AuthContext.tsx";
import styles from "./ProfilePageEdit.module.scss"
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Navigate} from "react-router-dom";

const ProfilePageEdit = () => {

    const {user} = useContext(AuthContext) as AuthContextType

    const [showPassword, setShowPassword] = useState(false)



    const schemaValidation = yup.object({
        username: yup.string().required("Username is required"),
        avatar: yup.mixed().required("Avatar is required"),
        password: yup.string().required("Password is required"),
        confirmPassword: yup.string().required("Confirm password is required").oneOf([yup.ref("password"), null], "Passwords must match")
    })

    const initialValues = {
        username: user ? user.username : "",
        avatar: user ? user.avatar : "",
        password: "",
        confirmPassword: ""
    }

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schemaValidation),
        defaultValues: initialValues
    })

    const onSubmit = handleSubmit((values) => {
        console.log(values)
    })

    return (
        <div className={styles.profilePageEdit}>
            <form onSubmit={onSubmit}>
                <div className={styles.inputContainer}>
                    <div className={"d-flex flex-column mb-10"}>
                        <label htmlFor="username">Pseudo</label>
                        <input className={styles.input} type="text" id="username" {...register("username")} />
                    </div>
                    <div className={"d-flex flex-column mb-10"}>
                        <label htmlFor="password" className={styles.label}>Mot de passe</label>
                        <span className={`d-flex flex-column ${styles.inputPasswordContainer}`}>
                        <input type={showPassword ? "text" : "password"} {...register("password")}
                               className={styles.input}/>
                    <i onClick={() => setShowPassword(prevState => !prevState)}
                       className={`fa-solid ${styles.iconPassword} ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    </div>
                    <div className={"d-flex flex-column mb-10"}>
                        <label htmlFor="confirmPassword" className={styles.label}>Confirmer votre mot de passe</label>
                        <span className={`d-flex flex-column ${styles.inputPasswordContainer}`}>
                        <input type={showPassword ? "text" : "password"} {...register("confirmPassword")}
                               className={styles.input}/>
                    <i onClick={() => setShowPassword(prevState => !prevState)}
                       className={`fa-solid ${styles.iconPassword} ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </span>
                        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                    </div>
                </div>
                <div className={styles.avatarInput}>

                </div>
            </form>
        </div>
    );
};

export default ProfilePageEdit;