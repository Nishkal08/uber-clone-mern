import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { userDataContext } from '../context/UserContext'
import { GoogleLogin } from '@react-oauth/google'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useContext(userDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password
      })

      if (res.status === 200) {
        toast.success('Login successful!');
        localStorage.setItem("token", res.data.token)
        setUser(res.data.user)
        navigate("/home")
      }
    }
    catch (err) {
      console.error("User Login error:", err.response?.data || err.message);

      if (err.response?.status === 400 || err.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (err.response?.status === 404) {
        toast.error('User not found');
      } else if (err.response?.status >= 500) {
        toast.error('Server error. Please try again later');
      } else if (!err.response) {
        toast.error('Network error. Check your connection');
      } else {
        const errorMessage = err.response?.data?.message || 'Login failed. Please try again';
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false)
      setEmail('')
      setPassword('')
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {

    const idToken = credentialResponse?.credential //gives idToken
    if (!idToken) {
      toast.error('Google did not return a credential')
      return
    }

    setIsLoading(true)
    try {
      await toast.promise(
        axios.post(`${import.meta.env.VITE_BASE_URL}/users/google-login`,
          {
            idToken,
          }
        ),
        {
          loading: "logging in with Google...",
          success: (res) => {
            if (res.status === 200) {
              localStorage.setItem("token", res.data.token);
              setUser(res.data.user);
              navigate("/home");
              return "Google login successfull!";
            }
          },
          error: (err) => {

            if (err.response?.status === 404) {
              navigate("/user-signup");
              return "User not found. Redirecting to signup...";
            }

            return "Google login failed";
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className='h-screen p-7 flex flex-col gap-7'>

      <img className="w-16 mb-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber logo" />

      <form onSubmit={submitHandler}>
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
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {password.length > 0 && password.length < 6 && (
          <p className="text-red-500 text-sm mb-5">Password must be at least 6 characters long</p>
        )}

        {(password.length === 0 || password.length >= 6) && (
          <div className="mb-7"></div>
        )}

        <button
          type="submit"
          className='rounded-lg p-3 w-full text-lg font-semibold bg-black flex justify-center items-center text-white disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="w-full">
          <div
            className="w-full flex justify-center items-center"
            style={{ minHeight: '56px' }} // Match your button height
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google sign in failed")}
              size="large"
              theme="outline"
              text="signin_with"
              shape="rectangular"
              logo_alignment="center"
              width="100%"
              style={{
                width: '100%',
                minWidth: '100%'
              }}
            />
          </div>
        </div>

      </form>


      <div className='absolute bottom-0 left-0 right-0 p-7'>
        <div>
          <p className='text-center'>
            New here? <Link to='/user-signup' className='text-blue-600'>Create new Account</Link>
          </p>
        </div>
        <Link
          to='/captain-login'
          className='bg-white flex  items-center justify-center text-black ring-2 font-semibold mt-3 rounded-lg p-4 w-full text-lg placeholder:text-base'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin