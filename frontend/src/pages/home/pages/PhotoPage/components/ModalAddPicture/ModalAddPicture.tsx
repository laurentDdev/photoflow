import styles from "./ModalAddPicture.module.scss"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {createPost} from "../../../../../../apis/post.api.ts"; 
import {useNavigate} from "react-router-dom";
import {IPost} from "../../../../../../models/Post.ts";

type Props = {
    toggleModalPhoto: () => void
    addNewPost: (newPhoto: IPost) => void
}

const ModalAddPicture = ({toggleModalPhoto, addNewPost}: Props) => {

    const navigate = useNavigate()

    const validationSchema = yup.object({
        name: yup.string().required("Le nom est obligatoire").min(3, "Le nom doit contenir au moins 3 caractères"),
        description: yup.string().required("La description est obligatoire").min(10, "La description doit contenir au moins 10 caractères"),
        image: yup.mixed().required("L'image est obligatoire")
    })

    const [imageUrl, setImageUrl] = useState<string | null>(null)

    const initialValues = {
        name: "",
        description: "",
        image: ""
    }

    const {register,clearErrors,reset,watch, handleSubmit,setValue, formState: {errors,isSubmitting}} = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues,
    })

    const watchImage = watch("image")
    useEffect(() => {
        if(watchImage) {
            const imageList = watchImage as FileList
            const image = imageList[0]
            setImageUrl(URL.createObjectURL(image))
        }
    }, [watchImage]);

    const onSubmit = handleSubmit(async (values) => {
        const name = values.name
        const description = values.description
        const imageList = values.image as FileList
        const image = imageList[0]

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("image", image)

        try {
            const createdPost = await createPost(formData)
            if (createdPost) {
                clearErrors()
                reset()
                setImageUrl(null)
                toggleModalPhoto()

                addNewPost(createdPost)
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (e.message == "Unauthorized") {
                navigate("/auth")
            }
        }
    })


    return (
        <div className={styles.modalPicture}>
            <div className={styles.modalPictureHeader}>
                <p>Publication d'une photo</p>
                <i className={"fa-solid fa-xmark"} onClick={toggleModalPhoto}></i>
            </div>
            <div>
                <form onSubmit={onSubmit} className={styles.form}>
                    <div className={`${styles.inputFile}`}>
                        {
                            imageUrl ? (
                                <div className={styles.pictureSelected}>
                                    <img alt={"image selectionné"} src={imageUrl} height={100}/>
                                    <span className={"btn btn-danger"} onClick={() => {
                                        setImageUrl(null)
                                        setValue("image", "")
                                    }}>Annuler</span>
                                </div>
                            ) : (
                                <label className={styles.picture} htmlFor="image">
                                    <i className={"fa-solid fa-photo-film"}></i>
                                    Choisir une image
                                </label>
                            )
                        }
                        <input type="file" id={"image"} accept={"image/png,image/jpeg"} {...register("image")} />
                        {errors.image && <p>{errors.image.message}</p>}
                    </div>
                    <div className={"d-flex flex-column mb-20"}>
                        <label className={styles.label}>Nom</label>
                        <input className={styles.input} type="text" {...register("name")} />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>
                    <div className={"d-flex flex-column mb-20"}>
                        <label className={styles.label}>Description</label>
                        <textarea className={styles.textarea} {...register("description")} rows={10}></textarea>
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>
                    <button type={"submit"} disabled={isSubmitting} className={"btn btn-reverse-primary"}>Publier <i className={"fa-solid fa-camera"}></i>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ModalAddPicture;