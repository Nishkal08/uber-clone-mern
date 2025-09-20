import axios from 'axios'
import React, { use } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { MapContext } from '../context/MapContext'
const ConfirmRidePopup = ({ ride, ConfirmRidePopUpCloseRef, setridePopUpPanel, setConfirmRidePopUpPanel }) => {
    const [OTP, setOTP] = useState("")
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Starting ride...")
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
                {
                    rideId: ride._id,
                    otp: OTP
                },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (res.status === 200 || res.status === 201) {
                setConfirmRidePopUpPanel(false);
                setridePopUpPanel(false);
                navigate("/captain-ride", {
                    state: {
                        ride: res.data,
                        pickup: ride.pickup,
                        drop: ride.destination
                    }
                });
            } else {
                console.warn("Unexpected response status:", res);
                console.log("Otp error response:", res.data);
            }
        } catch (err) {
            if(err?.response?.status == 404 || err?.response?.status == 400)
            {
                toast.error("Invalid OTP, please try again.");
            }

            console.error("Error starting ride:", err);
        }
    };

    const ignoreHandler = () => {
        setConfirmRidePopUpPanel(false);
        setridePopUpPanel(false);
    }
    return (
        <div className='bg-white h-screen w-full rounded-md overflow-auto relative py-2'>
            <div
                className='text-center text-gray-300 font-medium text-3xl cursor-pointer'
                ref={ConfirmRidePopUpCloseRef}
                onClick={() => {
                    setConfirmRidePopUpPanel(false)
                }}
            >
                <i className="ri-arrow-down-wide-line"></i>
            </div>
            <span className='text-black text-2xl capitalize font-semibold my-3 p-4'>Confirm to start ride!</span>
            <div className="p-4 my-5 mx-2 rounded-xl shadow-xs bg-neutral-50 flex justify-between items-center ">
                <div className="flex gap-3 text-center justify-start items-center">
                    <img className="h-12 w-12 object-cover rounded-full" src="https://mrwallpaper.com/images/hd/beautiful-woman-with-random-people-in-background-roumbpovzh5jzxj5.jpg"></img>
                    <p className="text-lg capitalize font-semibold">{ride?.user?.fullname?.firstname + " " + ride.user?.fullname?.lastname}</p>
                </div>
                <div className="">
                    <p className="text-xl font-semibold">{Math.round((ride?.distance) / 1000, 2)} km</p>
                    <p className="text-sm leading-2 text-gray-500">₹{ride?.fare}</p>
                </div>
            </div>
            <div>

            </div>
            <div className='flex flex-col items-center'>
                <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-map-pin-2-fill text-lg"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]' >Pickup Location</span>
                        <span className='tex-sm text-[#545454]'>{ride?.pickup}</span>
                        <span className='text-sm text-gray-400 font-md'>Pickup</span>
                        <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                    </div>
                </div>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-square-fill text-md"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]' >Drop Off Location</span>
                        <span className='tex-sm text-[#545454]'>{ride?.destination}</span>
                        <span className='text-sm text-gray-400 font-md'>Drop</span>

                        <hr className='my-3 w-full text-[#E9E9E9]'></hr>
                    </div>
                </div>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-bank-card-2-fill text-md"></i>
                    <div className='flex w-full mt-2  flex-col'>
                        <span className='text-xl font-[650]'>₹{ride?.fare}</span>
                        <span className='tex-sm text-[#545454]'>Cash</span>
                    </div>
                </div>
                <div className='w-full flex flex-col justify-between px-3 mt-6'>
                    <form onSubmit={submitHandler}>
                        {/* OTP */}
                        <input placeholder="Enter OTP"
                            value={OTP}
                            onChange={(e) => { setOTP(e.target.value) }}
                            className="bg-[#EEEEEE] font-mono p-3 text-lg w-full  placeholder:text-base rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        ></input>
                        <button
                            className='w-full flex justify-center items-center bg-black text-white rounded-lg font-semibold mb-4 py-3'
                        >
                            Confirm
                        </button>
                    </form>
                    <button
                        className='w-full flex justify-center items-center bg-neutral-50  border-black border-2 rounded-lg font-semibold mb-4 py-3'
                        onClick={ignoreHandler}
                    >
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopup