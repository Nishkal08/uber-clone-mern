import React from 'react'
import { useContext, useEffect, useMemo } from 'react'
import { captainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
    const { captain , setCaptain } = useContext(captainDataContext)
    
    // Array of professional profile images
    const profileImages = [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    ]

    // Fetch captain data if not available

    // Get random profile image
    const profileImage = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * profileImages.length)
        return profileImages[randomIndex]
    }, [])

    // Get vehicle type icon
    const getVehicleIcon = (vehicleType) => {
        switch(vehicleType?.toLowerCase()) {
            case 'car': return 'ri-car-line'
            case 'motorcycle': return 'ri-motorcycle-line'
            case 'auto': return 'ri-taxi-line'
            default: return 'ri-car-line'
        }
    }

    // Get vehicle color styling
    const getVehicleColorStyle = (color) => {
        const colorLower = color?.toLowerCase() || 'gray'
        const colorMap = {
            'red': 'bg-red-100 text-red-800',
            'blue': 'bg-blue-100 text-blue-800',
            'green': 'bg-green-100 text-green-800',
            'yellow': 'bg-yellow-100 text-yellow-800',
            'black': 'bg-gray-800 text-white',
            'white': 'bg-gray-100 text-gray-800 border border-gray-300',
            'silver': 'bg-gray-200 text-gray-800',
            'gray': 'bg-gray-100 text-gray-800',
            'grey': 'bg-gray-100 text-gray-800',
            'orange': 'bg-orange-100 text-orange-800',
            'purple': 'bg-purple-100 text-purple-800',
            'pink': 'bg-pink-100 text-pink-800',
            'brown': 'bg-yellow-100 text-yellow-800',
            'maroon': 'bg-red-200 text-red-900'
        }
        return colorMap[colorLower] || 'bg-gray-100 text-gray-800'
    }

    if (!captain || !captain.fullname || !captain.vehicle) {
        return (
            <div className="p-6 animate-pulse">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white h-full">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img 
                                className="h-16 w-16 object-cover rounded-full border-3 border-white shadow-lg" 
                                src={profileImage}
                                alt={`${captain.fullname?.firstname || 'Captain'} profile`}
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 capitalize">
                                {captain.fullname?.firstname} {captain.fullname?.lastname}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-600 capitalize">{captain.vehicle?.vehicleType || 'Vehicle'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vehicle Info */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <i className={`${getVehicleIcon(captain.vehicle?.vehicleType)} text-lg text-gray-600`}></i>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700 uppercase tracking-wide text-sm">{captain.vehicle?.plate || 'N/A'}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${getVehicleColorStyle(captain.vehicle?.color)}`}>
                                        {captain.vehicle?.color || 'Unknown'}
                                    </span>
                                    <span className="text-xs text-gray-500 capitalize">{captain.vehicle?.vehicleType || 'Vehicle'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="bg-white px-2.5 py-1 rounded-md border border-gray-200">
                                <p className="text-xs font-medium text-gray-600">{captain.vehicle?.capacity || 0} seats</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails