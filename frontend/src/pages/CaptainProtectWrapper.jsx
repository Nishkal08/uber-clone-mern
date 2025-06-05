import React, { useContext, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Loader } from '../components/Loader'

export const CaptainProtectWrapper = ({children}) => {
    const { user, setUser } = useContext(userDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    
    useEffect(() => {
        if(!token)
        {
            navigate("/captain-login")
        }
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })

                if (res.status == 200 || res.status == 201) {
                    console.log(res.status)
                    setUser(res.data)
                    setIsLoading(false)
                }
            }
            catch(err)
            {
                console.log("Captain wrapper error : ",err.message)
                localStorage.removeItem("token")
                navigate("/captain-login")
            }
    }
    fetchData()
    }, [ token ])
    if(isLoading)
    {
        return <Loader />
    }

    return (
        <>
            {children}
        </>
    )
}
