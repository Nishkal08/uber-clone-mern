import React from 'react'
import { Link } from 'react-router-dom'

export const LookingForDriver = ({ pickup, destination,vehicleType, fares,vehicleFoundCloseRef, setVehicleFound }) => {

    return (
        <div className='bg-white h-full w-full rounded-md overflow-auto relative  py-2'>
            <div
                className='text-center text-gray-300 font-medium text-3xl cursor-pointer'
                ref={vehicleFoundCloseRef}
                onClick={() => {
                    console.log("clicked")
                    setVehicleFound(false)
                }}
            >
                <i className="ri-arrow-down-wide-line"></i>
            </div>
            <span className='text-black text-2xl font-semibold mt-3 p-4'>Looking for a captain</span>
            <div className='flex flex-col items-center'>
                <img className="h-25 my-3" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-map-pin-2-fill text-lg"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-lg font-[650]' >Pickup</span>
                        <span className='tex-sm text-[#545454]'>{pickup}</span>
                        <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                    </div>
                </div>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-square-fill text-md"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-lg font-[650]' >Destination</span>
                        <span className='tex-sm text-[#545454]'>{destination}</span>
                        <hr className='my-3 w-full text-[#E9E9E9]'></hr>
                    </div>
                </div>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-bank-card-2-fill text-md"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]'>₹{fares[vehicleType] || fares?.moto}</span>
                        <span className='tex-sm text-[#545454]'>Cash</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
