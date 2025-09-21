import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { captainDataContext } from '../context/CaptainContext'
import axios from "axios"
import toast from 'react-hot-toast'

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
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()

  const { captain, setCaptain } = useContext(captainDataContext)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    // Handle login logic here
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        plate: vehiclePlate,
        color: vehicleColor,
        vehicleType: vehicleType,
        capacity: vehicleCapacity
      }
    }
    try {
      setIsLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain)
      console.log(res.data, "entered")
      if (res.status === 201) {
        setCaptain(res.data.captain)
        setCaptainData(res.data.captain)
        localStorage.setItem("token", res.data.token)
        console.log(captainData)
        navigate("/captain-home")
      }
    }
    catch (err) {
      if (err.response?.status === 400) {
        const errorMessage = err.response?.data?.message || 'Invalid registration data';
        toast.error(errorMessage);
      } else if (err.response?.status === 409) {
        toast.error('Email already exists. Please use a different email');
      } else if (err.response?.status >= 500) {
        toast.error('Server error. Please try again later');
      } else if (!err.response) {
        toast.error('Network error. Check your connection');
      } else {
        const errorMessage = err.response?.data?.message || 'Registration failed. Please try again';
        toast.error(errorMessage);
      }

      console.log("Captain Sign up error : ", err.message)
    }
    finally {
      setIsLoading(false)
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setvehicleType("")
      setvehicleCapacity("")
      setvehiclePlate("")
      setvehicleColor("")
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length >= 0 && value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='flex-1 px-7 py-5'>
        <div className='max-w-lg mx-auto'>
          <img className="w-19 mb-7" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Uber Driver" />
          
          <form onSubmit={submitHandler} className='space-y-6'>
            <div>
              <h2 className='text-lg font-medium mb-2'>What's Our Captain's name?</h2>
              <div className='flex gap-4'>
                <input 
                  type="text" 
                  className="bg-[#EEEEEE] p-3 text-lg w-1/2 placeholder:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="First Name" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required
                />
                <input 
                  type="text" 
                  className="bg-[#EEEEEE] p-3 text-lg w-1/2 placeholder:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                  placeholder="Last Name" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  required
                />
              </div>
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2'>What's Our captain's email?</h3>
              <input 
                required
                type="email"
                placeholder="email@email.com"
                className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2'>What's Our captain's password?</h3>
              <input 
                required 
                type="password"
                className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder='password'
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>

            <div>
              <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
              <div className='space-y-4'>
                <div className='flex gap-4'>
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
                <div className='flex gap-4'>
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
              </div>
            </div>

            <button
              type="submit"
              className='rounded-lg p-3 w-full text-lg font-semibold bg-black flex justify-center items-center text-white disabled:opacity-50'
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p>
              Already have an account? <Link to='/captain-login' className='text-blue-600 hover:underline'>Login Here</Link>
            </p>
          </div>

          <div className='mt-4 mb-8'>
            <p className='text-xs leading-tight text-gray-500 text-center'>
              By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignUp