import React, {useContext} from 'react';
import {AuthContext, AuthContextType} from "../contexts/AuthContext.tsx";
import {Navigate} from "react-router-dom";

type Props = {
    children: React.ReactNode
}

const ProtectedRoute = ({children}: Props) => {
    const {user} = useContext(AuthContext) as AuthContextType

    return user ? children : <Navigate to={"/auth"} />
};

export default ProtectedRoute;