import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
export const CaptainHome = () => {
  const ridePopUpRef = useRef(null)
  const ConfirmRidePopUpRef = useRef(null)
  const ridePopUpCloseRef = useRef(null)
  const ConfirmRidePopUpCloseRef = useRef(null)
  
  const [ridePopUpPanel, setridePopUpPanel] = useState(false)
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(true)
  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpRef.current, {
        y: 0,
        height: "fit-content",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(ridePopUpCloseRef.current, {
          opacity: 1
        })
    }
    else {
      gsap.to(ridePopUpRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(ridePopUpCloseRef.current, {
          opacity: 0
        })
    }
  }, [ridePopUpPanel])

  useGSAP(() => {
    if (ConfirmRidePopUpPanel) {
      gsap.to(ConfirmRidePopUpRef.current, {
        y: 0,
        height: "fit-content",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(ConfirmRidePopUpCloseRef.current, {
          opacity: 1
        })
    }
    else {
      gsap.to(ConfirmRidePopUpRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(ConfirmRidePopUpCloseRef.current, {
          opacity: 0
        })
    }
  }, [ConfirmRidePopUpPanel])
return (
  <div>
    <div className="fixed flex top-1 p-4 items-center w-screen justify-between">
      <img className='w-15 top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
      <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center text-xl rounded-3xl' >
        <i class="ri-logout-box-line"></i>
      </Link>
    </div>
    <div className='h-screen w-screen'>
      <img className='h-3/5 w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"></img>
      <div className='h-2/5 overflow-hidden'>
        <CaptainDetails />
      </div>
      <div
        ref={ridePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white-100'
      >
        <RidePopUp ridePopUpCloseRef={ridePopUpCloseRef}
          setridePopUpPanel={setridePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>

      <div
        ref={ConfirmRidePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white-100'
      >
        <ConfirmRidePopup 
          ConfirmRidePopUpCloseRef={ConfirmRidePopUpCloseRef}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
          />
      </div>
    </div>
  </div>
)
}
