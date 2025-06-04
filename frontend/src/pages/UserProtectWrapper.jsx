import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios"
import { userDataContext } from '../context/UserContext'
import { Loader } from '../components/Loader'
const UserProtectWrapper = ({ children }) => {

  const { user, setUser } = useContext(userDataContext)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if ([200, 201].includes(res.status)) {
        setUser(res.data);
        setIsLoading(false);  
      }
    } catch (err) {
      console.error("User Protect Wrapper error:", err.message);
      localStorage.removeItem("token");//If token is expired
      navigate("/user-login");
    }
  };

  fetchData(); 
}, [token]);



  if (isLoading) {
    return <Loader />
  }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper 