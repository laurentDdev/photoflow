import {createContext, useContext, useEffect, useState} from "react";
import io, {Socket} from "socket.io-client";

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

    useEffect(() => {
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return () => {
            newSocket.close()
        }
    }, []);

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}