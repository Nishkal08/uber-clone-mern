import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { captainDataContext } from '../context/CaptainContext'
const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {setCaptain} = useContext(captainDataContext)
  const submitHandler = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,{email,password})
      if(res.status === 200)
      {
          localStorage.setItem("token",res.data.token)
          console.log(res.data)
          setCaptain(res.data.captain)
          navigate("/captain-home")
      }
    }
    catch(err)
    {
      console.error("Captain Login error:", err.response?.data || err.message);
    }
  
    setEmail('')
    setPassword('')
  }
  return (
    <div className='h-screen px-7 py-5 flex flex-col gap-7'>
      <img className="w-19" src="https://www.svgrepo.com/show/505031/uber-driver.svg"></img>
      <form onSubmit={submitHandler}>
        <h3 className='text-lg font-medium mb-2'>What's our captain's email?</h3>
        <input required
          type="email"
          placeholder="email@email.com"
          className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg  mb-7 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3 className='text-lg font-medium mb-2'>What's our captain's password?</h3>
        <input required type="password"
          className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg mb-7 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button type="submit" className='rounded-lg p-3 w-full text-lg font-semibold bg-black flex justify-center items-center text-white'>Login</button>
      </form>

      <div>
        <p className='text-center'>
          Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as captain</Link>
        </p>
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-7'>
        <Link
          to='/user-login'
          className='bg-white  flex items-center justify-center text-black ring-2 font-semibold mb-3 rounded-lg p-4 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin