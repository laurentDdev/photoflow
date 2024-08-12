import NavigationBar from "../../components/NavigationBar/NavigationBar.tsx";
import {Outlet} from "react-router-dom";
import {Suspense, useContext} from "react";
import {HomeProvider} from "../../contexts/HomeContext.tsx";
import MobileNavigationBar from "../../components/MobileNavigationBar/MobileNavigationBar.tsx";
import {SocketProvider} from "../../contexts/SocketContext.tsx";
import {ThemeContext, ThemeContextType} from "../../contexts/ThemeContext.tsx";


const HomePage = () => {

    const {theme} = useContext(ThemeContext) as ThemeContextType

    return (
        <SocketProvider>
            <div className={`d-flex`} style={{
                background: theme === "light" ? "#f0f2f5" : "#1a1a1a",
            }}>
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