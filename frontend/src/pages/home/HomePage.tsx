import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import {HomeProvider} from "../../contexts/HomeContext.tsx";
import MobileNavigationBar from "../../components/MobileNavigationBar/MobileNavigationBar.tsx";
import {SocketProvider} from "../../contexts/SocketContext.tsx";

const HomePage = () => {
    return (
        <SocketProvider>
            <div className={"d-flex"}>
                <NavigationBar/>
                <MobileNavigationBar/>
                <HomeProvider>
                    <Suspense fallback={<div>Loading...</div>}>

                        <Outlet/>

                    </Suspense>
                </HomeProvider>
            </div>
        </SocketProvider>
    );
};

export default HomePage;