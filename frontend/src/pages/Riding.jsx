import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { MapContext } from '../context/MapContext'
import toast from 'react-hot-toast';
import axios from 'axios'
import LiveRouteTracking from '../components/LiveRouteTracking'
import { loadStripe } from "@stripe/stripe-js";


const Riding = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const ride = location.state?.ride
    const { socket } = useContext(SocketContext)
    const { setPickupLocation, setDropLocation, setCaptainLocation } = useContext(MapContext)
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

    const getCaptainLocation = async () => {
        const captainLocation = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/location/${ride.captain._id}`)
        // console.warn("-------------Fetched captain location:", captainLocation.data);
        if (captainLocation.data) {
            setCaptainLocation(captainLocation.data.location)
        }
    }
    // Set pickup and drop locations from ride data
    useEffect(() => {
        if (ride) {

            setCaptainLocation(ride.captain?.location);
            if (ride.pickup) {
                setPickupLocation(ride.pickup);
            }
            if (ride.drop) {
                setDropLocation(ride.drop);
            }
            const intervalId = setInterval(() => {
                console.warn("Fetching captain location...", getCaptainLocation());
                getCaptainLocation();
            }, 1000 * 60 * 2); // Fetch captain location every 2 minutes

            return () => clearInterval(intervalId);
        }
    }, [ride, setPickupLocation, setDropLocation]);

    socket.on("ride-ended", () => {
        navigate("/home")
    })

    const handlePayment = async () => {
        try {

            toast.loading("Processing payment...")
            const stripe = await stripePromise;
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/payment/create-checkout-session`,
                { amount: ride.fare }
            );

            const { url } = response.data;
            window.location.href = url;
        } catch (error) {
            console.error(error);
            toast.error("Payment failed. Try again.");
        }
    };

    return (
        <div>
            <img className='w-15 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            <Link to='/home' className='fixed top-5 right-5 h-10 w-10 flex items-center justify-center text-xl bg-white p-3 rounded-full ' >
                <i class="ri-home-2-line"></i>
            </Link>
            <div className='h-screen w-screen relative'>
                <div className="absolute top-0 left-0 w-full h-1/2 z-0">
                    <LiveRouteTracking />
                </div>
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
                        <div className='w-full px-3 mt-6 flex flex-col items-center'>
                            <button
                                onClick={handlePayment}
                                className='w-full flex flex-col justify-center items-center bg-black text-white rounded-lg font-semibold mb-4 py-3 hover:bg-gray-900 transition-colors'
                            >
                                Make A Payment
                            </button>

                            {/* Enhanced Test Mode Warning */}
                            <div className='w-full bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mb-4'>
                                <div className='flex items-start gap-3'>
                                    <div className='flex-shrink-0'>
                                        <svg className="w-6 h-6 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 18.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                    </div>
                                    <div className='flex-1'>
                                        <h4 className='font-semibold text-amber-800 mb-2'>⚠️ Test Mode Active</h4>
                                        <div className='text-sm text-amber-700 space-y-2'>
                                            <p className='font-medium'>
                                                🔒 <strong>No real transactions will occur</strong> - Your account will not be charged
                                            </p>
                                            <div className='bg-white bg-opacity-70 rounded-lg p-3 border border-amber-200'>
                                                <p className='font-medium text-amber-800 mb-1'>For testing, use this card number only:</p>
                                                <div className='bg-gray-50 rounded px-3 py-2 font-mono text-lg font-bold text-gray-800 letter-spacing-wide border'>
                                                    4000 0035 6000 0008
                                                </div>
                                                <p className='text-xs text-amber-600 mt-1'>Use any future date for expiry & any 3-digit CVV</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding