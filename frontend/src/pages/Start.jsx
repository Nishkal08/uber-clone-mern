import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Start = () => {
    return (
        <div className="h-screen flex flex-col justify-between">
            <div className='h-3/4 bg-[url("https://images.unsplash.com/photo-1588260369134-d64f66c5730b?q=80&w=2252&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]
        bg-cover bg-center'>
                <img className="w-16 m-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            </div>
            <div className='h-1/4 px-4 py-4 bg-white'>
                <h2 className='text-3xl mb-5 font-bold'>Get Started With Uber</h2>
                <Link to="/user-login" className='w-full h-1/2 mt-5 flex items-center justify-center bg-black text-white text-base font-semibold rounded border'
                >Continue</Link>
            </div>
        </div>
    )
}

export default Start