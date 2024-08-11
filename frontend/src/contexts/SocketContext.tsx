import {createContext, useContext, useEffect, useState} from "react";
import io, {Socket} from "socket.io-client";
import {AuthContext, AuthContextType} from "./AuthContext.tsx";

export type SocketContextType = {
    socket: Socket | null
}

export const SocketContext = createContext<SocketContextType | null>(null)


type Props = {
    children: React.ReactNode
}

export const useSocket = () => {
    return useContext(SocketContext) as SocketContextType
}

export const SocketProvider = ({children}: Props) => {

    const [socket, setSocket] = useState<Socket | null>(null)
    const {user} = useContext(AuthContext) as AuthContextType

    useEffect(() => {
        const newSocket = io("http://power.edu-hopeheberg.fr:3001/", {
            query: {userId: user?._id}
        })
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, []);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}