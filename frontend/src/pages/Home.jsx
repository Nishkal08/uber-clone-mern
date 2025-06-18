import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import { LocationPanel } from '../components/LocationPanel';
import { VehiclePanel } from '../components/VehiclePanel';
import { ConfirmRide } from '../components/ConfirmRide';
import { LookingForDriver } from '../components/LookingForDriver';
import {WaitingForDriver} from '../components/WaitingForDriver';
const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRide, setConfirmRide] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  // const [panel, setpanel] = useState(second)
  const [pickupLocation, setPickupLocation] = useState("")
  const [destinationLocation, setDestinationLocation] = useState("")

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


  const SubmitHandler = () => {

  }
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(findMyTrip.current, {
        height: "30%",
        paddingBottom: "0rem"
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
      console.log("Entered vehicle found",vehicleFound)
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
              }}
              value={pickupLocation}
              onChange={() => { setPickupLocation(pickupLocation) }}
              className="bg-[#EEEEEE] w-full text-md text-gray-950 
              py-3 px-12 mt-5 rounded-lg "
              placeholder='Add a pickup location'
            ></input>
            <div className='line h-17 w-1 bg-black absolute font-bold left-11 top-25 rounded-full'></div>
            <input type="text"
              onClick={() => setPanelOpen(true)}
              value={destinationLocation}
              onChange={() => { setDestinationLocation(destination) }}
              className="bg-[#EEEEEE] w-full text-md text-gray-950 py-3 px-12 mt-4 rounded-lg "
              placeholder="Enter your destination">
            </input>
          </form>
        </div>
        {/* Location selection panel */}
        <div ref={panelRef} className='bg-white h-0 translate-y-full overflow-auto'>
          <LocationPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>

      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white-100'>
        <VehiclePanel
          vehiclePanelCloseRef={vehiclePanelCloseRef}
          setConfirmRide={setConfirmRide}
          setVehiclePanel={setVehiclePanel}>
        </VehiclePanel>
      </div>
      <div ref={confirmRidePanel}
        className='fixed w-full z-20 bottom-0 translate-y-full bg-white-100'
      >
        <ConfirmRide
          setConfirmRide={setConfirmRide}
          confirmRidePanelClose={confirmRidePanelClose}
          setVehicleFound={setVehicleFound}
        ></ConfirmRide>
      </div>
      <div ref={vehicleFoundRef}
          className='fixed w-full z-20 bottom-0 translate-y-full bg-white-100'
      >
        <LookingForDriver
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

    </div>
  )
}

export default Home