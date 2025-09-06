import React from 'react'
import { useRef } from 'react';
import gsap from 'gsap';
    import Loader from './Loader';
export const LocationPanel = ({ loading, activeField, setPickup, setDestination, suggestions }) => {


    const handleClick = (suggestion) => {
        if (activeField === "pickup") {
            setPickup(suggestion.description)
        } else {
            setDestination(suggestion.description)
        }
    }


    return (
            <div>
                {suggestions?.map((ele, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleClick(ele)}
                        className="flex items-center mb-2 justify-start bg-white w-full px-3 pt-3"
                    >
                        <h4>
                            <i className="bg-[#EEEEEE] rounded-full p-2.5 mr-3 ri-map-pin-2-fill"></i>
                        </h4>
                        <div>
                            <h4 className="text-lg font-semibold">{ele.structured_formatting.main_text}</h4>
                            <div className="text-md">{ele.description}</div>
                            <hr className="mt-3 text-[#F6F6F6]" />
                        </div>
                    </div>
                ))}
            </div>
    );
}
