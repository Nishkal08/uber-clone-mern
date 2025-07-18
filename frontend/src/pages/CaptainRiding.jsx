import React from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useState } from 'react'
import { useRef } from 'react'
import FinishRide from '../components/FinishRide'
const CaptainRiding = () => {

  const [finishRidePopUp, setFinishRidePopUp] = useState(false)
  const finishRideRef = useRef(null)
  const finishRideCloseRef = useRef(null)
  const location = useLocation()
  const ride = location.state?.ride
  
  
  useGSAP(() => {
    if (finishRidePopUp) {
      gsap.to(finishRideRef.current, {
        y: 0,
        height: "fit-content",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(finishRideCloseRef.current, {
          opacity: 1
        })
    }
    else {
      gsap.to(finishRideRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(finishRideCloseRef.current, {
          opacity: 0
        })
    }
  }, [finishRidePopUp])

  return (
    <div>
      {/* UBER icons and all */}
      <div className="fixed flex top-1 p-4 items-center w-screen justify-between">
        <img className='w-15 top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
        <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center text-xl rounded-3xl' >
          <i class="ri-logout-box-line"></i>
        </Link>
      </div>
      {/* bg-img/Map */}
      <div className='h-screen'>
        <img className='h-4/5 w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"></img>
        {/* bottom-card */}
        <div className='h-1/5 w-full flex px-5 relative justify-between items-center'>
          <div
            className='text-center absolute top-0 left-0 right-0 text-gray-300 font-medium text-3xl cursor-pointer'
          >
            <i class="ri-arrow-up-wide-line"></i>
          </div>
          <div className='flex mt-3 justify-start gap-3 w-full'>
            <img className="h-12 w-12 object-cover rounded-full" src="https://mrwallpaper.com/images/hd/beautiful-woman-with-random-people-in-background-roumbpovzh5jzxj5.jpg"></img>
            <div className='capitalize text-xl font-semibold'>
              <p>{Math.round((ride?.distance)/1000,2)} Km</p>
              <div className='text-sm leading-3 text-gray-400'>away</div>
            </div>
          </div>
          <div className='w-full mt-3 '>
            <button
              className='w-full flex justify-center items-center bg-black text-white rounded-lg font-semibold  py-3'
              onClick={() => {
                setFinishRidePopUp(true)
              }
              }
            >
              Complete Ride
            </button>
          </div>

        </div>
        <div
          ref={finishRideRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white-100'
        >
          <FinishRide
            ride={ride}
            setFinishRidePopUp={setFinishRidePopUp}
            finishRideCloseRef={finishRideCloseRef}
          />
        </div>
      </div>

    </div>
  )
}

export default CaptainRiding  