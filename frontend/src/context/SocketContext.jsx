import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { createContext } from "react";

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, [])
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;
