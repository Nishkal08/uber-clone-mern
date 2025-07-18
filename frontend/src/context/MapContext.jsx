// src/context/MapContext.js
import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [captainLocation, setCaptainLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [routePoints, setRoutePoints] = useState({ origin: null, destination: null });

  return (
    <MapContext.Provider
      value={{
        captainLocation,
        userLocation,
        pickupLocation,
        dropLocation,
        routePoints,
        setCaptainLocation,
        setUserLocation,
        setPickupLocation,
        setDropLocation,
        setRoutePoints
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
