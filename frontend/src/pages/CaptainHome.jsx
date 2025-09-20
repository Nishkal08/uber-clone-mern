import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import { captainDataContext } from '../context/CaptainContext'
import LogoutButton from '../components/LogoutButton'
import gsap from 'gsap'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { RideDataContext } from '../context/RideContext'
import LiveTracking from '../components/LiveTracking'
import axios from 'axios'
export const CaptainHome = () => {
  const ridePopUpRef = useRef(null)
  const ConfirmRidePopUpRef = useRef(null)
  const ridePopUpCloseRef = useRef(null)
  const ConfirmRidePopUpCloseRef = useRef(null)
  const { captain, setCaptain } = useContext(captainDataContext)
  const { ride, setRide } = useContext(RideDataContext)
  const [ridePopUpPanel, setridePopUpPanel] = useState(false)
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
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

  const { socket } = useContext(SocketContext)
 
  useEffect(() => {
    
    if (captain?._id) {
      socket.emit("join", {
        userId: captain._id,
        userType: "captain"
      });
    }
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: latitude,
              lng: longitude
            }
          })
          try {
            const newCaptain = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
            if (newCaptain) {
              setCaptain(newCaptain.data)
            }
          } catch (error) {
            console.error("Error fetching captain data:", error);
          }
        })
      }
      else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
    setInterval(updateLocation, 1000 * 60 * 2); // Call every 2 minutes
    updateLocation();
  }, [socket,captain._id])

  socket.on("new-ride", (data) => {
    setRide(data)
    setridePopUpPanel(true)
  })

  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm-ride`, {

      rideId: ride._id,
      captainId: captain._id,

    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    setridePopUpPanel(false)
    setConfirmRidePopUpPanel(true)

  }

  useEffect(() => {
    const fetchCaptainData = async () => {
      if (!captain && localStorage.getItem('token')) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          if (response.data && response.data.captain) {
            setCaptain(response.data.captain)
          }
        } catch (error) {
          console.error("Error fetching captain data:", error)
        }
      }
    }

    fetchCaptainData()
  }, [captain, setCaptain])

  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      // toast.loading("logging out...")

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )

      await socket.disconnect();
      localStorage.removeItem("token")
      toast.success('Logged out successfully')
      navigate("/captain-login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div>
      <div>
        {captain?.socketId}
      </div>
      <div className="fixed flex top-1 p-4 items-center w-screen justify-between z-100">
        <img className='w-15 top-5 left-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
        <div className="absolute top-5 right-5 z-10">
          <LogoutButton onClick={handleLogout} />
        </div>

      </div>
      <div className='h-screen w-screen'>
        <div className='h-3/5'>
          <LiveTracking />
        </div>
        <div className='h-2/5 bg-white overflow-hidden'>
          <CaptainDetails />
        </div>
        <div
          ref={ridePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white-100'
        >
          <RidePopUp ridePopUpCloseRef={ridePopUpCloseRef}
            ride={ride}
            confirmRide={confirmRide}
            setridePopUpPanel={setridePopUpPanel}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
        </div>
        <div
          ref={ConfirmRidePopUpRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white-100'
        >
          <ConfirmRidePopup
            ride={ride}
            ConfirmRidePopUpCloseRef={ConfirmRidePopUpCloseRef}
            setridePopUpPanel={setridePopUpPanel}
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          />
        </div>
      </div>
    </div>
  )
}
