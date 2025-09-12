import React, { useState, useContext } from 'react'
import { RideDataContext } from '../context/RideContext'
import CardLoader from './CardLoader'
import { toast, ToastContainer, Bounce } from 'react-toastify'

export const ConfirmRide = ({
    pickup,
    createRide,
    vehicleType,
    destination,
    setConfirmRide,
    fares,
    confirmRidePanelClose

}) => {
    const { ride, setRide } = useContext(RideDataContext)
    const handleConfirmRide = async () => {
        try {
            const ride = await createRide(pickup, destination, vehicleType)
            setRide({ ride })
        } catch (err) {
            console.log("Error creating ride", err)
        }
        if (ride) {
            toast.success('Ride confirmed', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                toastClassName: "w-[50vw] max-w-[400px]",
                bodyClassName: "text-sm break-words w-full"
            });

        }

    }

    return (
        <div className='bg-white h-full w-full rounded-md overflow-auto relative py-2'>
            <div
                className='text-center text-gray-300 font-medium text-3xl cursor-pointer'
                ref={confirmRidePanelClose}
                onClick={() => setConfirmRide(false)}
            >
                <i className="ri-arrow-down-wide-line"></i>
            </div>

            <span className='text-black text-2xl font-semibold mt-3 p-4'>Confirm your Ride</span>

            <div className='flex flex-col items-center'>
                <img
                    className="h-25 my-3"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
                    alt=""
                />
                <hr className='mt-2 w-full text-[#E9E9E9]' />

                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i className="ri-map-pin-2-fill text-lg"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-lg font-[650]'>Pickup</span>
                        <span className='text-sm text-[#545454]'>{pickup}</span>
                        <hr className='mt-2 w-full text-[#E9E9E9]' />
                    </div>
                </div>

                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i className="ri-square-fill text-md"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-lg font-[650]'>Destination</span>
                        <span className='text-sm text-[#545454]'>{destination}</span>
                        <hr className='my-3 w-full text-[#E9E9E9]' />
                    </div>
                </div>

                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i className="ri-bank-card-2-fill text-md"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]'>₹{fares[vehicleType] || fares?.moto}</span>
                        <span className='text-sm text-[#545454]'>Cash</span>
                    </div>
                </div>

                <div className='w-full px-3 mt-6'>
                    <button
                        onClick={handleConfirmRide}
                        className='w-full flex justify-center items-center bg-black text-white rounded-lg font-semibold mb-4 py-3'
                    >
                        Confirm
                    </button>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    )
}
