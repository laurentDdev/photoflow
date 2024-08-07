import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";

const HomePage = () => {
    return (
        <div className={"d-flex"}>
            <NavigationBar />
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default HomePage;