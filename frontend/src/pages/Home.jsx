import React, { useRef, useState, useContext, useEffect } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import axios from 'axios';
import { LocationPanel } from '../components/LocationPanel';
import { VehiclePanel } from '../components/VehiclePanel';
import { ConfirmRide } from '../components/ConfirmRide';
import { LookingForDriver } from '../components/LookingForDriver';
import { WaitingForDriver } from '../components/WaitingForDriver';

// import { ToastContainer, toast, Bounce } from 'react-toastify';
import { toast } from "react-hot-toast"
import { userDataContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import { RideDataContext } from '../context/RideContext';
import Loader2 from '../components/Loader2';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import LogoutButton from '../components/LogoutButton';

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRide, setConfirmRide] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
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
  const [vehicleType, setVehicleType] = useState("")
  const navigate = useNavigate()

  // Context
  const { user } = useContext(userDataContext);
  const { socket } = useContext(SocketContext);
  const { ride, setRide } = useContext(RideDataContext);

  const SubmitHandler = (e) => {
    e.preventDefault()
  }

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    // Only fetch suggestions if there's text
    if (value.trim().length > 2) {
      try {
        const suggestions = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
          params: {
            location: value
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setPickupSuggestions(suggestions.data)
      }
      catch (err) {
        console.log("Error fetching pickup suggestions", err.response?.data || err.message)
        if ((err.response?.data || err.message) === "User Not Found") {
          navigate("/user-login")
        }
      }
    } else {
      setPickupSuggestions([])
    }
  }

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    // Only fetch suggestions if there's text
    if (value.trim().length > 2) {
      try {
        const suggestions = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestions`, {
          params: {
            location: value
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setDestinationSuggestions(suggestions.data)
      }
      catch (err) {
        console.log("Error fetching destination suggestions", err?.response?.data || err.message)
        if ((err.response?.data || err.message) === "User Not Found") {
          navigate("/user-login")
        }
      }
    } else {
      setDestinationSuggestions([])
    }
  }

  const handleButtonClick = async (e) => {
    e.preventDefault()
    if (!pickup || !destination) {
      toast.error('Pickup and Destination locations are required');
      return
    }
    try {
      setLoading(true)
      const faresResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fares`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: {
          pickup: pickup,
          destination: destination
        }
      })

      const distanceTimeResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-distance-time`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        },
        params: {
          origin: pickup,
          destination: destination
        }
      })

      setFares(faresResponse.data)
      setDistanceTime(distanceTimeResponse.data)
      setPanelOpen(false)
      setVehiclePanel(true)
    } catch (error) {
      console.log("Error fetching fares and distance/time", error);
      toast.error('Error fetching ride information. Please try again.');
    }
    finally {
      setLoading(false)
    }
  }

  const createRide = async (pickup, destination, vehicleType) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create-ride`,
        {
          pickup,
          destination,
          vehicleType
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log("Ride created successfully:", res.data);
      setRide(res.data.ride); // Store the ride data
      setConfirmRide(false);
      setVehicleFound(true);
      return res.data;
    } catch (err) {
      console.log("Error creating ride", err.response?.data || err.message)
      toast.error('Error creating ride. Please try again.');
      throw err;
    }
  }

  // GSAP Animations
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(findMyTrip.current, {
        height: "fit-content",
      })
      gsap.to(panelRef.current, {
        zIndex: 52,
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
      })
      gsap.to(confirmRidePanelClose.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(confirmRidePanel.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      })
      gsap.to(confirmRidePanelClose.current, {
        opacity: 0
      })
    }
  }, [confirmRide])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        y: 0,
        height: "fit-content",
        duration: 0.8,
        ease: "power2.in"
      })
      gsap.to(vehicleFoundCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      })
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
      })
      gsap.to(waitingForDriverCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        y: "100%",
        duration: 0.8,
        ease: "power2.in"
      })
      gsap.to(waitingForDriverCloseRef.current, {
        opacity: 0
      })
    }
  }, [waitingForDriver])

  // Socket connection and events
  useEffect(() => {
    if (socket && user) {
      console.log("Joining socket with user:", user._id);
      socket.emit("join", {
        userType: "user",
        userId: user._id
      })
    }
  }, [socket, user._id])

  useEffect(() => {
    if (socket) {
      const handleRideConfirmed = (rideData) => {
        setVehicleFound(false);
        setRide(rideData);
        setWaitingForDriver(true);

        toast.success('Driver found! Ride confirmed.');
      };

      const handleRideStarted = (rideData) => {
        setWaitingForDriver(false);
        navigate('/riding', { state: { ride: rideData } });

        toast.success('Ride started! Have a safe journey.');
      };

      const handleRideEnded = (rideData) => {
        // Handle ride end logic
        navigate('/home');

        toast.success('Ride completed successfully!');
      };

      // Add event listeners
      socket.on("ride-confirmed", handleRideConfirmed);
      socket.on("ride-started", handleRideStarted);
      socket.on("ride-ended", handleRideEnded);

      // Cleanup function
      return () => {
        socket.off("ride-confirmed", handleRideConfirmed);
        socket.off("ride-started", handleRideStarted);
        socket.off("ride-ended", handleRideEnded);
      }
    }
  }, [socket, navigate, setRide, setVehicleFound, setWaitingForDriver])



  const handleLogout = async () => {
    try {

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
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
      navigate("/user-login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div className='relative h-screen'>
      <img
        className='w-18 absolute top-5 left-5 cursor-pointer z-1'
        onClick={() => navigate("/home")}
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      <div className="absolute top-5 right-5 z-50">

        <LogoutButton onClick={handleLogout} />
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-0">
        <LiveTracking role="user" />
      </div>


      {/* Trip card */}

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full z-2">
        <div ref={findMyTrip} className='bg-white min-h-fit p-5 relative' >
          <h5
            className='absolute top-3 right-3 cursor-pointer'
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={SubmitHandler}>
            <input
              type="text"
              onClick={() => {
                setPanelOpen(true)
                setActiveField("pickup")
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#EEEEEE] font-medium w-full text-md text-gray-950 
              py-3 px-12 mt-5 rounded-lg "
              placeholder='Add a pickup location'
            />
            <div className='line h-17 w-1 bg-black absolute font-bold left-11 top-25 rounded-full'></div>
            <input
              type="text"
              onClick={() => {
                setActiveField("destination")
                setPanelOpen(true)
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#EEEEEE] w-full font-medium text-md text-gray-950 py-3 px-12 mt-4 rounded-lg "
              placeholder="Enter your destination"
            />
          </form>
          <button
            type="submit"
            className='rounded-lg p-3 mt-4 w-full text-lg font-semibold bg-black flex justify-center items-center text-white disabled:opacity-50'
            onClick={handleButtonClick}
            disabled={loading}
          >
            {loading ? <Loader2 /> : 'Find Ride'}
          </button>
        </div>

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

      <div ref={vehiclePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white'>
        <VehiclePanel
          vehiclePanelCloseRef={vehiclePanelCloseRef}
          fares={fares}
          distanceTime={distanceTime}
          setVehicleType={setVehicleType}
          setConfirmRide={setConfirmRide}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      <div ref={confirmRidePanel} className='fixed w-full z-20 bottom-0 translate-y-full bg-white'>
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          fares={fares}
          vehicleType={vehicleType}
          setConfirmRide={setConfirmRide}
          confirmRidePanelClose={confirmRidePanelClose}
        />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white'>
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fares={fares}
          setVehicleFound={setVehicleFound}
          vehicleFoundCloseRef={vehicleFoundCloseRef}
        />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white'>
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriverCloseRef={waitingForDriverCloseRef}
        />
      </div>

      {/* <ToastContainer
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
      /> */}
    </div>
  )
}

export default Home