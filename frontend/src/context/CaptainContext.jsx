import React from 'react'
import { createContext, useState } from 'react'

export const captainDataContext = createContext();

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState({
        fullname: {
            firstname: "",
            lastname: ""
        },
        email: "",
    })
    return (
        <>
            <captainDataContext.Provider value={{ captain, setCaptain }}>
                {children}
            </captainDataContext.Provider>
        </>
    )
}


export default CaptainContext