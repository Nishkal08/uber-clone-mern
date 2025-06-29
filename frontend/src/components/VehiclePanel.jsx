import React, { useState } from 'react'
import { useRef } from 'react'


export const VehiclePanel = ({ vehiclePanelCloseRef,setVehicleType, distanceTime, fares, setVehiclePanel, setConfirmRide }) => {
    const handleClick=(vehicle) => {
        setConfirmRide(true)
        setVehiclePanel(false)
        setVehicleType(vehicle)
    }
    
    return (
        <div className='bg-white h-full w-full rounded-md overflow-auto relative px-3 py-2'>
            <div
                className='text-center text-gray-900 font-medium text-3xl cursor-pointer'
                ref={vehiclePanelCloseRef}
                onClick={() =>
                    setVehiclePanel(false)}
            >
                <i className="ri-arrow-down-wide-line"></i>
            </div>
            <h3 className='text-2xl font-semibold mb-5 mt-3'>Choose a Vehicle</h3>
            {/* Vehicle card container */}
            <div className='flex flex-col h-fit items-center gap-3 '>
                <div onClick={() => handleClick("motorcycle")}
                    key="1" className='h-fit p-3 active:border-black active:border-3 rounded-xl w-full'>
                    <div className='flex justify-between items-center gap-2 w-full'>
                        <img className="h-15 w-15 object-contain" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"></img>
                        <div className='flex flex-col'>
                            <div className='flex gap-2 items-baseline-last'>
                                <span className='text-xl font-semibold'>Moto</span>
                                <i className="ri-user-3-fill">1</i>
                            </div>
                            <span className='text-sm'>{distanceTime.duration?.text} away</span>
                            <span className='text-sm text-gray-600'>Affordable and compact rides</span>
                        </div>
                        <div className='text-lg font-semibold'>₹{fares?.moto}</div>
                    </div>
                </div>
                <div onClick={() => handleClick("car")} key="2" className='h-fit p-3 active:border-black active:border-3 rounded-xl w-full'>
                    <div className='flex justify-between items-center gap-2 w-full'>
                        <img className="h-15 w-15 object-contain" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"></img>
                        <div className='flex flex-col'>
                            <div className='flex gap-2 items-baseline-last'>
                                <span className='text-xl font-semibold'>UberGo</span>
                                <i className="ri-user-3-fill">4</i>
                            </div>
                            <span className='text-sm'>{distanceTime.duration?.text} away</span>
                            <span className='text-sm text-gray-600'>Affordable and compact rides</span>
                        </div>
                        <div className='text-lg font-semibold'>₹{fares?.car}</div>
                    </div>
                </div>
                <div onClick={() => handleClick("auto")} key="3" className='h-fit p-3 active:border-black active:border-3 rounded-xl w-full'>
                    <div className='flex justify-between items-center gap-2 w-full'>
                        <img className="h-15 w-15 object-contain" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"></img>
                        <div className='flex flex-col'>
                            <div className='flex gap-2 items-baseline-last'>
                                <span className='text-xl font-semibold'>UberAuto</span>
                                <i className="ri-user-3-fill h-1 w-1">3</i>
                            </div>
                            <span className='text-sm'>{distanceTime.duration?.text} away</span>
                            <span className='text-sm text-gray-600'>Affordable and compact rides</span>
                        </div>
                        <div className='text-lg font-semibold'>₹{fares?.auto}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
