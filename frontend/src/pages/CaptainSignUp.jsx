import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { captainDataContext } from '../context/CaptainContext'
import axios from "axios"

const CaptainSignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [captainData, setCaptainData] = useState({})
  const [vehicleType, setvehicleType] = useState("")
  const [vehicleCapacity, setvehicleCapacity] = useState("")
  const [vehiclePlate, setvehiclePlate] = useState("")
  const [vehicleColor, setvehicleColor] = useState("")
  const navigate = useNavigate()


  const { captain, setCaptain } = useContext(captainDataContext)
  const submitHandler = async(e) => {

    e.preventDefault()
    // Handle login logic here
    const newCaptain = { 
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle:{
        plate: vehiclePlate,
        color: vehicleColor,
        vehicleType: vehicleType,
        capacity: vehicleCapacity
      }
    }
    
    try{
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,newCaptain)
      console.log(res.data,"entered")
      if(res.status === 201){
        setCaptain(res.data.captain)
        setCaptainData(res.data.captain)
        localStorage.setItem("token",res.data.token)
        console.log(captainData)
        navigate("/captain-home")
      }
    }
    catch(err)
    {
      console.log("Captain Sign up error : ",err.message)
    }
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setvehicleType("")
    setvehicleCapacity("")
    setvehiclePlate("")
    setvehicleColor("")
  }
  return (
    <div className='h-screen flex flex-col relative'>
      <div className='flex-1 px-7 py-5 flex flex-col gap-7'>
        <img className="w-19" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Driver" />
        <form onSubmit={submitHandler}>
          <h2 className='text-lg font-medium mb-2'>What's Our Captains's name?</h2>
          <div className='flex gap-4'>
            <input type="text" className="bg-[#EEEEEE] p-3 text-lg w-1/2 placeholder:text-base rounded-lg  mb-5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" className="bg-[#EEEEEE] p-3 text-lg w-1/2 placeholder:text-base rounded-lg  mb-5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's Our captain's email?</h3>
          <input required
            type="email"
            placeholder="email@email.com"
            className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg  mb-7 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className='text-lg font-medium mb-2'>What's Our captain's password?</h3>
          <input required type="password"
            className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg mb-7 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />

          {/* Vehicle Info Group */}
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-4'>
            <select
              required
              className="bg-[#EEEEEE] p-3 text-md w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={vehicleType}
              onChange={e => setvehicleType(e.target.value)}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="car">Car</option>
            </select>
            <input
              required
              type="text"
              placeholder="Vehicle Color"
              className="bg-[#EEEEEE] p-3 text-md w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={vehicleColor}
              onChange={e => setvehicleColor(e.target.value)}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              type="text"
              placeholder="Vehicle Plate"
              className="bg-[#EEEEEE] p-3 text-md w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={vehiclePlate}
              onChange={e => setvehiclePlate(e.target.value)}
            />
            <input
              required
              type="number"
              min="1"
              placeholder="Vehicle Capacity"
              className="bg-[#EEEEEE] p-3 text-md w-1/2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={vehicleCapacity}
              onChange={e => setvehicleCapacity(e.target.value)}
            />
          </div>

          <button type="submit" className='rounded-lg p-3 w-full text-lg font-semibold bg-black flex justify-center items-center text-white'>Create Account</button>
        </form>

        <div>
          <p className='text-center'>
            Already have an account? <Link to='/captain-login' className='text-blue-600'>Login Here</Link>
          </p>
          <p className='text-xs leading-tight text-gray-500 text-center mt-2'>
            By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignUp