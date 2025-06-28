import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import axios from 'axios';
import { LocationPanel } from '../components/LocationPanel';
import { VehiclePanel } from '../components/VehiclePanel';
import { ConfirmRide } from '../components/ConfirmRide';
import { LookingForDriver } from '../components/LookingForDriver';
import { WaitingForDriver } from '../components/WaitingForDriver';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import Loader2 from '../components/Loader2';
const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRide, setConfirmRide] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  // const [panel, setpanel] = useState(second)
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")

  const findMyTrip = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const vehiclePanelRef = useRef(null)
  const vehiclePanelCloseRef = useRef(null)

  const vehicleFoundRef = useRef(null)
  const vehicleFoundCloseRef = useRef(null)

  const confirmRidePanel = useRef(null)
  const confirmRidePanelClose = useRef(null)

  const waitingForDriverRef = useRef(null)
  const waitingForDriverCloseRef = useRef(null)

  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState("")

  const [fares, setFares] = useState({})
  const [distanceTime, setDistanceTime] = useState({})
  const [loading, setLoading] = useState(false)

  const SubmitHandler = () => {
    e.preventDefault()
  }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {

      const suggestions = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
        params: {
          location: pickup
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      setPickupSuggestions(suggestions.data)
    }
    catch (err) {
      console.log("Error fetching pickup suggestions", err.response?.data || err.message)
    }

  }
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const suggestions = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/
get-suggestions`, {
        params: {
          location: destination
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      setDestinationSuggestions(suggestions.data)


    }
    catch (err) {
      console.log("Error fetching destination suggestions", err.response?.data || err.message)
    }
  }
  const handleButtonClick = async (e) => {
    e.preventDefault()
    if (!pickup || !destination) {
      toast.error('Pickup and Destination locations are required', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return
    }
    try {
      setLoading(true)
      const fares = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fares`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: {
          pickup: pickup,
          destination: destination
        }
      })

      const distanceTime = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-distance-time`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: {
          origin: pickup,
          destination: destination
        }
      })
      console.log("Fares:", fares.data)
      console.log("Distance and Time:", distanceTime.data)
      setFares(fares.data)
      setDistanceTime(distanceTime.data)
      setLoading(false)
      setPanelOpen(false)
      setVehiclePanel(true)
    } catch (error) {
      console.log("Error fetching fares and distance/time", error);
    }
  }



  useGSAP(function () {
    if (panelOpen) {
      gsap.to(findMyTrip.current, {
        height: "fit-content",
      })
      gsap.to(panelRef.current, {
        y: 0,
        height: "80%",
        duration: 0.8,
        ease: "power2.out",
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        y: '100%',
        height: "0%",
        padding: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      console.log("------", vehiclePanel)
      gsap.to(vehiclePanelRef.current, {
        y: 0,
        height: "70vh",
        duration: 0.8,
        ease: "power2.in"
      })
      gsap.to(vehiclePanelCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      })
      gsap.to(vehiclePanelCloseRef.current, {
        opacity: 0
      })
    }
  }, [vehiclePanel])

  useGSAP(() => {
    if (confirmRide) {
      gsap.to(confirmRidePanel.current, {
        y: 0,
        height: "fit-content",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(confirmRidePanelClose.current, {
          opacity: 1
        })
    }
    else {
      gsap.to(confirmRidePanel.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(confirmRidePanelClose.current, {
          opacity: 0
        })
    }
  }, [confirmRide])

  useGSAP(() => {
    if (vehicleFound) {
      console.log("Entered vehicle found", vehicleFound)
      gsap.to(vehicleFoundRef.current, {
        y: 0,
        height: "fit-content",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(vehicleFoundCloseRef.current, {
          opacity: 1
        })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(vehicleFoundCloseRef.current, {
          opacity: 0
        })
    }
  }, [vehicleFound])

  useGSAP(() => {
    if (waitingForDriver) {

      gsap.to(waitingForDriverRef.current, {
        y: 0,
        height: "fit-content",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(waitingForDriverCloseRef.current, {
          opacity: 1
        })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      }),
        gsap.to(waitingForDriverCloseRef.current, {
          opacity: 0
        })
    }
  }, [waitingForDriver])
  return (
    <div className='relative h-screen'>
      <img className='w-15 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"></img>
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        {/* Trip card */}
        <div ref={findMyTrip} className='bg-white min-h-fit p-5 relative' >
          <h5
            className='absolute top-3 right-3'
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
          >
            <i class="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => { SubmitHandler(e) }}>
            <input type="text"
              onClick={() => {
                setPanelOpen(true)
                setActiveField("pickup")
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#EEEEEE] font-medium w-full text-md text-gray-950 
              py-3 px-12 mt-5 rounded-lg "
              placeholder='Add a pickup location'
            ></input>
            <div className='line h-17 w-1 bg-black absolute font-bold left-11 top-25 rounded-full'></div>
            <input type="text"
              onClick={() => {
                setActiveField("destination")
                setPanelOpen(true)
              }}
              value={destination}
              onChange={handleDestinationChange}

              className="bg-[#EEEEEE] w-full font-medium text-md text-gray-950 py-3 px-12 mt-4 rounded-lg "
              placeholder="Enter your destination">
            </input>

          </form>
          <button type="submit" className='rounded-lg  p-3 mt-4  w-full text-lg font-semibold bg-black flex justify-center items-center text-white' onClick={handleButtonClick}>Find Ride</button>
        </div>
        {/* Location selection panel */}

        <div ref={panelRef} className='bg-white h-0 translate-y-full overflow-auto'>
          <LocationPanel
            setPanelOpen={setPanelOpen}
            loading={loading}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
          />
        </div>

      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white-100'>
        <VehiclePanel
          vehiclePanelCloseRef={vehiclePanelCloseRef}
          fares={fares}
          distanceTime={distanceTime}
          setConfirmRide={setConfirmRide}
          setVehiclePanel={setVehiclePanel}>
        </VehiclePanel>
      </div>
      <div ref={confirmRidePanel}
        className='fixed w-full z-20 bottom-0 translate-y-full bg-white-100'
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fares={fares}
          setConfirmRide={setConfirmRide}
          confirmRidePanelClose={confirmRidePanelClose}
          setVehicleFound={setVehicleFound}
        ></ConfirmRide>
      </div>
      <div ref={vehicleFoundRef}
        className='fixed w-full z-20 bottom-0 translate-y-full bg-white-100'
      > 
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fares={fares}
          setVehicleFound={setVehicleFound}
          vehicleFoundCloseRef={vehicleFoundCloseRef}
        />
      </div>
      <div ref={waitingForDriverRef}
        className='fixed w-full z-20 bottom-0 translate-y-full bg-white-100'
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriverCloseRef={waitingForDriverCloseRef}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastClassName="!w-[350px] !min-w-[250px] !max-w-[90vw]"
        bodyClassName="!w-full !break-words"
      />

    </div>
  )
}

export default Home