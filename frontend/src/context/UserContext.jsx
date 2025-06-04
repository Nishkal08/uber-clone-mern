import React, { Children, createContext, use, useState } from 'react'

export const userDataContext = createContext()
const UserContext = ({children}) => {
  
    const [user,setUser]=useState({
        fullname:{
            firstname:"",
            lastname:""
        },
        email:"",
    })
    return (
    <userDataContext.Provider value={{user,setUser}}>
        {children} 
        {/* children component */}
    </userDataContext.Provider>
  )
}

export default UserContext