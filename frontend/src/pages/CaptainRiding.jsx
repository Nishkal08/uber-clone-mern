import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveRouteTracking from '../components/LiveRouteTracking'
import { MapContext } from '../context/MapContext'
import { captainDataContext } from '../context/CaptainContext'

const CaptainRiding = () => {
  const [finishRidePopUp, setFinishRidePopUp] = useState(false)
  const finishRideRef = useRef(null)
  const finishRideCloseRef = useRef(null)
  const location = useLocation()
  const ride = location.state?.ride
  const pickup = location.state?.pickup
  const drop = location.state?.drop
  const { setPickupLocation, setDropLocation, setCaptainLocation } = useContext(MapContext)
  const { captain } = useContext(captainDataContext);
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

  useEffect(() => {
    setCaptainLocation(captain?.location);

    setPickupLocation(pickup)
    setDropLocation(drop)
  }, [ride, setPickupLocation, setDropLocation])

  return (
    <div>
      <div className="fixed flex top-1 p-4 items-center w-screen justify-between z-20">
        <img className='h-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber" />
        <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center text-xl rounded-3xl'>
          <i className="ri-logout-box-line"></i>
        </Link>
      </div>
      <div className='h-screen'>
        <LiveRouteTracking className="absolute" />
        <div className='fixed bottom-0 left-0 w-full z-10'>
          <div className='w-full bg-white flex flex-col px-5 pt-4 pb-6 rounded-t-2xl shadow-2xl'>
            <div className='flex justify-center mb-2'>
              <div className='text-gray-300 font-medium text-3xl cursor-pointer'>
                <i className="ri-arrow-up-wide-line"></i>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-4'>
                <img className="h-12 w-12 object-cover rounded-full" src="https://mrwallpaper.com/images/hd/beautiful-woman-with-random-people-in-background-roumbpovzh5jzxj5.jpg" alt="User" />
                <div>
                  <div className='text-xl font-semibold capitalize'>{Math.round((ride?.distance) / 1000, 2)} Km</div>
                  <div className='text-sm leading-3 text-gray-400'>Away</div>
                </div>
              </div>
              <button
                className='h-12 w-1/4 px-6 flex justify-center items-center bg-black text-white rounded-lg font-semibold'
                onClick={() => setFinishRidePopUp(true)}
              >
                Complete Ride
              </button>
            </div>
          </div>
        </div>
        <div
          ref={finishRideRef}
          className='fixed w-full z-30 bottom-0 translate-y-full bg-white-100'
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