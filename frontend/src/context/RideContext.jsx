import React from 'react'
import { createContext, useState } from 'react'


export const RideDataContext = createContext();

const RideContext = ({children}) => {
    const [ride , setRide] = useState({
        pickup: "",
        destination: "",
        vehicleType: "",
        fare: 0,
        distance: 0,
        duration: 0,
        user:"",
        captain:"",
        otp:""
    })
    return (
        <>
            <RideDataContext.Provider value={{ ride, setRide }}>
                {children}
            </RideDataContext.Provider>
        </>
    )
}
export default RideContext