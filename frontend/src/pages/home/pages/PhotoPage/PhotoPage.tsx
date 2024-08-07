import HeaderBar from "./components/HeaderBar/HeaderBar.tsx";
import {lazy, useState} from "react";
import {createPortal} from "react-dom";

const ModalAddPicture = lazy(() => import("./components/ModalAddPicture/ModalAddPicture.tsx"))


const PhotoPage = () => {

    const [filter, setFilter] = useState<string>("");

    const [openModalPhoto, setOpenModalPhoto] = useState<boolean>(false);

    const updateFilter = (value: string) => {
        setFilter(value);
    }

    const toggleModalPhoto = () => {
        setOpenModalPhoto(prevState => !prevState);
    }

    const addNewPhotos = () => {
        console.log("Add new photos")
    }

    const showNotifications = () => {
        console.log("Show notifications")
    }

    return (
        <>
            <div className={"flex-fill p-20"}>
                <HeaderBar filter={filter} setFilter={updateFilter} toggleModalPhoto={toggleModalPhoto}
                           showNotifications={showNotifications}/>
            </div>
            {
                openModalPhoto && createPortal(<ModalAddPicture toggleModalPhoto={toggleModalPhoto}/>, document.body)
            }
        </>
    );
};

export default PhotoPage;