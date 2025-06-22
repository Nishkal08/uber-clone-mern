import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = ({ setFinishRidePopUp , finishRideCloseRef }) => {
    return (
        <div className='bg-white h-full w-full rounded-md overflow-auto relative py-2'>
            <div
                className='text-center text-gray-300 font-medium text-3xl cursor-pointer'
                ref={finishRideCloseRef}
                onClick={() => {
                    setFinishRidePopUp(false)
                }}
            >
                <i className="ri-arrow-down-wide-line"></i>
            </div>
            <span className='text-black text-2xl font-semibold my-3 p-4'>New Ride For You!</span>
            <div className="p-4 my-5 mx-2 rounded-xl shadow-xs bg-neutral-50 flex justify-between items-center ">
                <div className="flex gap-3 text-center justify-start items-center">
                    <img className="h-12 w-12 object-cover rounded-full" src="https://mrwallpaper.com/images/hd/beautiful-woman-with-random-people-in-background-roumbpovzh5jzxj5.jpg"></img>
                    <p className="text-lg capitalize font-semibold">Melisandre</p>
                </div>
                <div className="">
                    <p className="text-lg font-semibold">₹200</p>
                    <p className="text-sm leading-2 text-gray-500">2.2km</p>
                </div>
            </div>
            <div>

            </div>
            <div className='flex flex-col items-center'>
                <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-map-pin-2-fill text-lg"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]' >562/11-A</span>
                        <span className='tex-sm text-[#545454]'>New Ranip,Ahmedabad, Gujarat</span>
                        <span className='text-sm text-gray-400 font-md'>Pickup</span>
                        <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                    </div>
                </div>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-square-fill text-md"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]' >Third wave coffee</span>
                        <span className='tex-sm text-[#545454]'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</span>
                        <span className='text-sm text-gray-400 font-md'>Drop</span>

                        <hr className='my-3 w-full text-[#E9E9E9]'></hr>
                    </div>
                </div>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-bank-card-2-fill text-md"></i>
                    <div className='flex w-full mt-2  flex-col'>
                        <span className='text-xl font-[650]'>₹200</span>
                        <span className='tex-sm text-[#545454]'>Cash</span>
                    </div>
                </div>
                {/* bottom navigation */}
                <div className='w-full px-3 mt-6'>
                    <Link to="/captain-home"
                        className='w-full  flex justify-center items-center bg-black text-white rounded-lg font-semibold mb-2 py-3'
                    >
                        Finish Ride
                    </Link>
                    <p className='capitalize text-center text-sm text-red-500'>Click on <strong>finish ride </strong>if payment is completed  </p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide