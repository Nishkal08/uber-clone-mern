import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation , useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

const Riding = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const ride = location.state?.ride
    const { socket } = useContext(SocketContext)
    console.warn("ride : ",ride);
    socket.on("ride-ended",() => {
        navigate("/home")
    })
    return (
        <div>
            <img className='w-15 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            <Link to='/home' className='fixed top-5 right-5 h-10 w-10 flex items-center justify-center text-xl bg-white p-3 rounded-full ' >
                <i class="ri-home-2-line"></i>
            </Link>
            <div className='h-screen w-screen'>
                <img className='h-1/2 w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"></img>
                <div className='h-1/2'>
                    <div className='flex flex-col'>
                        <div className='flex w-full px-4 my-3 justify-between items-center'>
                            <img className="h-15 my-3" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                            <div>
                                <div className='text-md text-gray-500 font-md'>{ride.captain?.fullname?.firstname + " " + ride.captain?.fullname?.lastname}</div>
                                <div className='text-2xl font-bold'>{ride.captain?.vehicle?.plate}</div>
                                <div className='text-sm text-gray-400'>{ride.captain?.vehicle?.vehicleType}</div>
                            </div>
                        </div>
                        <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                        <div className='w-full px-3 flex gap-5 justify-start items-center'>
                            <i class="ri-map-pin-2-fill text-lg"></i>
                            <div className='flex w-full mt-2 flex-col'>
                                <span className='text-xl font-[650]' >Drop Off Location</span>
                                <span className='tex-sm text-[#545454]'>{ride?.destination}</span>
                                <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                            </div>
                        </div>
                        <div className='w-full px-3 flex gap-5 justify-start items-center'>
                            <i class="ri-bank-card-2-fill text-md"></i>
                            <div className='flex w-full mt-2 flex-col'>
                                <span className='text-xl font-[650]'>₹{ride?.fare}</span>
                                <span className='tex-sm text-[#545454]'>Cash</span>
                            </div>
                        </div>
                        <div className='w-full px-3 mt-6'>
                            <button

                                className='w-full flex flex-col justify-center items-center bg-black text-white rounded-lg font-semibold mb-4 py-3'
                            >
                                Make A Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding