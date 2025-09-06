import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation , useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { MapContext } from '../context/MapContext'
import LiveTracking from '../components/LiveTracking'
import LiveRouteTracking from '../components/LiveRouteTracking'

const Riding = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const ride = location.state?.ride
    const { socket } = useContext(SocketContext)
    const { setPickupLocation, setDropLocation , setCaptainLocation} = useContext(MapContext)
    
    console.warn("ride : ",ride);
    
    // Set pickup and drop locations from ride data
    useEffect(() => {
        if (ride) {
            console.log("Setting locations from ride data:", {
                pickup: ride.pickup,
                destination: ride.destination,
                pickupLocation: ride.pickupLocation,
                dropLocation: ride.dropLocation
            });
            // Set captain location if available
            setCaptainLocation(ride.captain?.location);
            if (ride.pickup) {
                setPickupLocation(ride.pickup);
            } 
            // Set drop location if available
            if (ride.drop) {
                setDropLocation(ride.drop);
            }
        }
    }, [ride, setPickupLocation, setDropLocation]);
    
    socket.on("ride-ended",() => {
        navigate("/home")
    })
    return (
        <div>
            <img className='w-15 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            <Link to='/home' className='fixed top-5 right-5 h-10 w-10 flex items-center justify-center text-xl bg-white p-3 rounded-full ' >
                <i class="ri-home-2-line"></i>
            </Link>
            <div className='h-screen w-screen relative'>
                {/* LiveTracking Map fills top half */}
                <div className="absolute top-0 left-0 w-full h-1/2 z-0">
                    <LiveRouteTracking />
                </div>
                {/* Driver detail card overlays bottom half */}
                <div className='absolute bottom-0 left-0 w-full h-1/2 z-10 bg-white rounded-t-2xl shadow-2xl'>
                    <div className='flex flex-col'>
                        <div className='flex w-full px-4 my-3 justify-between items-center'>
                            <img className="h-15 my-3" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png" alt="" />
                            <div>
                                <div className='text-md text-gray-500 font-md'>{ride.captain?.fullname?.firstname + " " + ride.captain?.fullname?.lastname}</div>
                                <div className='text-2xl font-bold'>{ride.captain?.vehicle?.plate}</div>
                                <div className='text-sm text-gray-400'>{ride.captain?.vehicle?.vehicleType}</div>
                            </div>
                        </div>
                        <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                        <div className='w-full px-3 flex gap-5 justify-start items-center'>
                            <i className="ri-map-pin-2-fill text-lg"></i>
                            <div className='flex w-full mt-2 flex-col'>
                                <span className='text-xl font-[650]' >Drop Off Location</span>
                                <span className='tex-sm text-[#545454]'>{ride?.destination}</span>
                                <hr className='mt-2 w-full text-[#E9E9E9]'></hr>
                            </div>
                        </div>
                        <div className='w-full px-3 flex gap-5 justify-start items-center'>
                            <i className="ri-bank-card-2-fill text-md"></i>
                            <div className='flex w-full mt-2 flex-col'>
                                <span className='text-xl font-[650]'>₹{ride?.fare}</span>
                                <span className='tex-sm text-[#545454]'>Cash</span>
                            </div>
                        </div>
                        <div className='w-full px-3 mt-6'>
                            <button
                                className='w-full flex flex-col justify-center items-center bg-black text-white rounded-lg font-semibold mb-4 py-3'
                            >
                                Make A Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding