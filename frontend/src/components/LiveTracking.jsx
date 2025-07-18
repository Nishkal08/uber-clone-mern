// --- LiveTracking.jsx ---
import React, { useState, useEffect, useContext } from 'react';
import {
  LoadScript,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from '@react-google-maps/api';
import { MapContext } from '../context/MapContext';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const LiveTracking = () => {
  const {
    captainLocation,
    userLocation,
    routePoints,
    setUserLocation
  } = useContext(MapContext);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (routePoints.origin && routePoints.destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: routePoints.origin,
          destination: routePoints.destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    }
  }, [routePoints]);

  const mapCenter = routePoints.origin || userLocation || { lat: 23.0225, lng: 72.5714 };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="absolute inset-0 -z-10">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
          options={{
            disableDefaultUI: true,
            gestureHandling: 'greedy',
            zoomControl: true,
            scrollwheel: true
          }}
        >
          {userLocation && <Marker position={userLocation} label="U" />}
          {captainLocation && <Marker position={captainLocation} label="C" />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default LiveTracking;