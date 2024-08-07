
import {Outlet} from "react-router-dom";
import {Suspense} from "react";

const AuthPage = () => {
    return (
        <Suspense>
            <Outlet/>
        </Suspense>
    );
};

export default AuthPage;