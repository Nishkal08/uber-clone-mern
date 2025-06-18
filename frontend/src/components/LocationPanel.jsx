import React from 'react'
import { useRef } from 'react';
import gsap from 'gsap';
export const LocationPanel = ({ setVehiclePanel, setPanelOpen }) => {


    const locations = [
        {
            
            "name": "Third wave coffee",
            "address": "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
        },
        {
            "name": "Third wave coffee",
            "address": "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
        },
        {
            "name": "Third wave coffee",
            "address": "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
        },
        {
            "name": "Third wave coffee",
            "address": "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
        },
        {
            "name": "Third wave coffee",
            "address": "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
        }
    ]
    return (
        <div>
            {
                locations.map((ele, idx) => {
                    return (
                        <div key={idx} 
                        onClick={() => {
                            setPanelOpen(false),
                            setVehiclePanel(true)
                        }}
                        className='flex items-center mb-2 justify-start bg-white w-full px-3 pt-3'>
                            <h4><i className="bg-[#EEEEEE]  rounded-full p-2.5 mr-3 ri-map-pin-2-fill"></i></h4>
                            <div>
                                <h4 className='text-lg font-semibold'>{ele.name}</h4>
                                <div className='text-md'>{ele.address}</div>
                                <hr className='mt-3 text-[#F6F6F6]'></hr>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
