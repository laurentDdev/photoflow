import HeaderBar from "./components/HeaderBar/HeaderBar.tsx";
import {lazy, useContext, useMemo, useState} from "react";
import {createPortal} from "react-dom";
import {IPost} from "../../../../models/Photo.ts";
import {useLoaderData} from "react-router-dom";
import PostCard from "./components/PostCard/PostCard.tsx";
import styles from "./PhotoPage.module.scss"
import {AuthContext, AuthContextType} from "../../../../contexts/AuthContext.tsx";

const ModalAddPicture = lazy(() => import("./components/ModalAddPicture/ModalAddPicture.tsx"))


const PhotoPage = () => {

    const {user} = useContext(AuthContext) as AuthContextType

    const postsFetch = useLoaderData() as IPost[];

    const [filter, setFilter] = useState<string>("");

    const [openModalPhoto, setOpenModalPhoto] = useState<boolean>(false);

    const [posts, setPosts] = useState<IPost[]>(postsFetch);

    const updateFilter = (value: string) => {
        setFilter(value);
    }

    const toggleModalPhoto = () => {
        setOpenModalPhoto(prevState => !prevState);
    }

    const addNewPost = (newPost: IPost) => {
        setPosts(prevState => [...prevState, newPost])
    }

    const showNotifications = () => {
        console.log("Show notifications")
    }

    return (
        <>
            <div className={"flex-fill p-20"}>
                <HeaderBar filter={filter} setFilter={updateFilter} toggleModalPhoto={toggleModalPhoto}
                           showNotifications={showNotifications}/>
                <div className={styles.postContainer}>
                    {posts && posts.filter((p) => p.name.toLowerCase().startsWith(filter.toLowerCase())).map((post) => (
                        <PostCard key={post._id} post={post} user={user} />
                    ))}
                </div>
            </div>
            {
                openModalPhoto && createPortal(<ModalAddPicture addNewPost={addNewPost} toggleModalPhoto={toggleModalPhoto}/>, document.body)
            }
        </>
    );
};

export default PhotoPage;