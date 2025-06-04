import React, { use } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import axios from "axios"
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'
const UserSignUp =  () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userData, setUserData] = useState({})
    const { user , setUser } = useContext(userDataContext)
    const base_url = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()
    const submitHandler = async(e) => {
      
      e.preventDefault()
      const newUser = {
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email:email,
        password:password
      }      

      try{
        const res = await axios.post(`${base_url}/users/register`,newUser)
        if(res.status === 201){
          setUser(res.data.user)
          localStorage.setItem("token",res.data.token)
          navigate("/home")
        }
      }
      catch(err)
      {
        console.error("Registration error:", err.response?.data || err.message);
      }

      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    }
  return (
    <div className='h-screen p-7 flex flex-col gap-7'>
      <img className="w-16 mb-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
      <form onSubmit={submitHandler}>
        <h2 className='text-lg font-medium mb-2'>What's your name?</h2>
        <div className='flex gap-4'>
          <input type="text" className="bg-[#EEEEEE] p-3 text-lg w-1/2 placeholder:text-base rounded-lg  mb-5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" className="bg-[#EEEEEE] p-3 text-lg w-1/2 placeholder:text-base rounded-lg  mb-5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
        <input required
          type="email"
          placeholder="email@email.com"
          className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg  mb-7 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
        <input required type="password"
          className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg mb-7 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)}}
        />
        <button type="submit" className='rounded-lg p-3 w-full text-lg font-semibold bg-black flex justify-center items-center text-white'>Create Account</button>
      </form>

      <div>
        <p className='text-center'>
          Already have an account? <Link to='/user-login' className='text-blue-600'>Login Here</Link>
        </p>
      </div>
      <div className='absolute bottom-0 left-0 right-0 p-7'>
        <p className='text-xs leadind-tight text-gray-500'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided
        </p>
      </div>
    </div>
  )
}

export default UserSignUp