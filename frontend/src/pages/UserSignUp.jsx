import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import axios from "axios"
import toast from 'react-hot-toast'
import { userDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom'

const UserSignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = useContext(userDataContext)
    const base_url = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        
        if (value.length >= 0 && value.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }

        try {
            const res = await axios.post(`${base_url}/users/register`, newUser)
            if (res.status === 201) {
                toast.success('Account created successfully!')
                setUser(res.data.user)
                localStorage.setItem("token", res.data.token)
                navigate("/home")
            }
        }
        catch (err) {
            console.error("User Sign up error:", err.response?.data || err.message);
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
        } finally {
            setIsLoading(false)
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setPasswordError('')
        }
    }

    return (
        <div className='h-screen p-7 flex flex-col gap-7'>
            <img className="w-16 mb-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />
            
            <form onSubmit={submitHandler}>
                <h2 className='text-lg font-medium mb-2'>What's your name?</h2>
                <div className='flex gap-4'>
                    <input 
                        required
                        type="text" 
                        className="bg-[#EEEEEE] p-3 text-lg w-1/2 placeholder:text-base rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                        placeholder="First Name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isLoading}
                    />
                    <input 
                        required
                        type="text" 
                        className="bg-[#EEEEEE] p-3 text-lg w-1/2 placeholder:text-base rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" 
                        placeholder="Last Name" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                <input 
                    required
                    type="email"
                    placeholder="email@email.com"
                    className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg mb-7 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />

                <h3 className='text-lg font-medium mb-2'>What's your password?</h3>
                <input 
                    required 
                    type="password"
                    className="bg-[#EEEEEE] p-3 text-lg w-full placeholder:text-base rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder='password'
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                />

                {passwordError && (
                    <p className="text-red-500 text-sm mb-5">{passwordError}</p>
                )}
                
                {!passwordError && (
                    <div className="mb-7"></div>
                )}

                <button 
                    type="submit" 
                    className='rounded-lg p-3 w-full text-lg font-semibold bg-black flex justify-center items-center text-white disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <div>
                <p className='text-center'>
                    Already have an account? <Link to='/user-login' className='text-blue-600'>Login Here</Link>
                </p>
            </div>

            <div className='absolute bottom-0 left-0 right-0 p-7'>
                <p className='text-xs leading-tight text-gray-500'>
                    By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided
                </p>
            </div>
        </div>
    )
}

export default UserSignUp