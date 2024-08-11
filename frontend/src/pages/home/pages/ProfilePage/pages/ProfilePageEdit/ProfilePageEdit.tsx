import {useContext, useEffect, useState} from "react";
import {AuthContext, AuthContextType} from "../../../../../../contexts/AuthContext.tsx";
import styles from "./ProfilePageEdit.module.scss"
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom";
import {updateProfile} from "../../../../../../apis/user.api.ts";

const ProfilePageEdit = () => {

    const {user, setUser} = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

    const schemaValidation = yup.object({
        username: yup.string().required("Pseudo requis").min(3, "Pseudo trop court").max(10, "Pseudo trop long"),
        avatar: yup.mixed().required("Avatar is required"),
        password: yup.string(),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "Les mot de passe ne correspondent pas")
    })

    const initialValues = {
        username: user ? user.username : "",
        avatar: "",
        password: "",
        confirmPassword: ""
    }

    const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(schemaValidation),
        defaultValues: initialValues
    })

    const watchImage = watch("avatar")
    useEffect(() => {
        if (watchImage) {
            const imageList = watchImage as FileList
            const image = imageList[0]
            setAvatarUrl(URL.createObjectURL(image))
        }
    }, [watchImage]);

    const onSubmit = handleSubmit(async (values) => {
        const formData = new FormData()
        const imageList = values.avatar as FileList
        const image = imageList[0]

        formData.append("username", values.username)
        if (image) {
            formData.append("avatar", image)
        }
        if (values.password && values.confirmPassword && values.password === values.confirmPassword) {
            formData.append("password", values.password)
        }

        try {
            const updatedUser = await updateProfile(formData)

            if (updatedUser) {
                setUser(updatedUser)
            }

            console.log(updatedUser)
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (e.message == "Unauthorized") {
                navigate("/auth")
            }
        }

        console.log(values)
    })

    return (
        <div className={styles.profilePageEdit}>
            <form onSubmit={onSubmit}>
                <h1 className={styles.title}>Modifier votre profil</h1>
                <div>
                    <div className={styles.inputContainer}>
                        <div className={"d-flex flex-column mb-10"}>
                            <label htmlFor="username">Pseudo</label>
                            <input className={styles.input} type="text" id="username" {...register("username")} />
                            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
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
                            <label htmlFor="confirmPassword" className={styles.label}>Confirmer votre mot de
                                passe</label>
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
                        <div>
                            <label htmlFor="avatar">
                                {!avatarUrl ? (
                                    <>
                                        <img height={200}
                                             src={`${import.meta.env.VITE_PUBLIC_API_URL}/assets/avatars/${user?.avatar}.png`}
                                             alt="avatar"/>
                                        <i className={"fa-solid fa-edit"}></i>
                                        <input type="file" id={"avatar"} accept={"image/png,image/jpeg"}
                                               hidden {...register("avatar")} />
                                    </>
                                ) : (
                                    <>
                                        <img height={200} src={avatarUrl} alt="avatar"/>
                                        <i className={"fa-solid fa-xmark"} onClick={(e) => {
                                            e.stopPropagation()
                                            setAvatarUrl(null)
                                            setValue("avatar", "")
                                        }}></i>
                                    </>
                                )}
                            </label>

                            {errors.avatar && <p className={styles.error}>{errors.avatar.message}</p>}
                        </div>
                    </div>
                </div>
                <button className={`btn btn-reverse-primary flex-fill`} type={"submit"}>Enregistrer</button>
            </form>

        </div>
    );
};

export default ProfilePageEdit;