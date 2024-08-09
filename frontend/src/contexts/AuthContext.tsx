import {createContext, useState} from "react";
import {useLoaderData} from "react-router-dom";
import {ILoginUser, loginUser, logoutUser} from "../apis/auth.api.ts";


export type IUser = {
    _id: string
    username: string
    email: string
    avatar: string
    accountType: string
}

export type AuthContextType = {
    user: IUser | null
    login: (credentials: ILoginUser) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)


type Props = {
    children: React.ReactNode
}

export const AuthProvider = ({children}: Props) => {

    const initialUser = useLoaderData() as IUser | null
    const [user, setUser] = useState<IUser | null>(initialUser)

    const login = async (credentials: ILoginUser) => {
        const user = await loginUser(credentials)
        setUser(user)
    }

    const logout = async () => {
        await logoutUser()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}