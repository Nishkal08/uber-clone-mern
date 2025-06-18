import React from 'react'
import { Link } from 'react-router-dom'

export const WaitingForDriver = ({ waitingForDriverCloseRef, setWaitingForDriver }) => {

    return (
        <div className='bg-white h-full w-full rounded-md overflow-auto relative  py-2'>
            <div
                className='text-center text-gray-300 font-medium text-3xl cursor-pointer'
                ref={waitingForDriverCloseRef}
                onClick={() => {
                    console.log("clicked")
                    setWaitingForDriver(false)
                }}
            >
                <i className="ri-arrow-down-wide-line"></i>
            </div>
            
            <div className='flex flex-col items-center'>
                <div className='flex w-full px-4 my-3 justify-between items-center'>
                    <img className="h-15 my-3" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                    <div>
                        <div className='text-md text-gray-500 font-md'>SANTH</div>
                        <div className='text-2xl font-bold'>KA15K00-0</div>
                        <div className='text-sm text-gray-400'>White suzuki S-presso LXI</div>
                    </div>
                </div>
                <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-map-pin-2-fill text-lg"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]' >562/11-A</span>
                        <span className='tex-sm text-[#545454]'>New Ranip,Ahmedabad, Gujarat</span>
                        <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                    </div>
                </div>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-square-fill text-md"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]' >Third wave coffee</span>
                        <span className='tex-sm text-[#545454]'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</span>
                        <hr className='my-3 w-full text-[#E9E9E9]'></hr>
                    </div>
                </div>
                <div className='w-full px-3 flex gap-5 justify-start items-center'>
                    <i class="ri-bank-card-2-fill text-md"></i>
                    <div className='flex w-full mt-2 flex-col'>
                        <span className='text-xl font-[650]'>₹200</span>
                        <span className='tex-sm text-[#545454]'>Cash</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
