import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import { captainDataContext } from "../context/CaptainContext";
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import axios from "axios";
import MapLoader from "./MapLoader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const uberLightTheme = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "on" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
];

const vehicleIcon = {
  url: "https://static.vecteezy.com/system/resources/previews/029/947/412/non_2x/white-city-car-isolated-on-transparent-background-3d-rendering-illustration-free-png.png",
  scaledSize: { width: 40, height: 40 },
  anchor: { x: 20, y: 20 },
};

const userIcon = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7uACgyiKt5pU7HEX5okhp4ZzkdHO0mjlHXw&s",
  scaledSize: { width: 15, height: 15 },
};

const LiveRouteTracking = () => {
  const {
    captainLocation,
    userLocation,
    setRoutePoints,
    setCaptainLocation,
    routePoints,
    pickupLocation,
    setPickupLocation,
  } = useContext(MapContext);

  const { captain } = useContext(captainDataContext);
  const [directions, setDirections] = useState(null);

  //For captain's current location -----> Captain Side
  useEffect(() => {
    if (captain?.location) {
      setCaptainLocation(captain.location);
    }
  }, [captain?.location, setCaptainLocation]);

  const getCoords = async (address) => {
    try {
      if (typeof address === "string" && address.trim() !== "") {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/map/get-coords`,
          {
            params: { address: pickupLocation },
          }
        );

        if (response.data) {
          return response.data;
        }
      } else {
        return address;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!pickupLocation) return;
      const coords = await getCoords(pickupLocation);
      if (coords) {
        setPickupLocation(coords);
      }
    };
    fetchCoordinates();
  }, [pickupLocation, setPickupLocation]);

  useEffect(() => {
    if (captainLocation && pickupLocation) {
      setRoutePoints({
        origin: { lat: captainLocation.ltd, lng: captainLocation.lng },
        destination: pickupLocation,
      });
    }
  }, [captainLocation, pickupLocation, setRoutePoints]);

  const mapCenter =
    routePoints.origin || pickupLocation || { lat: 23.0225, lng: 72.5714 };

  const handleLoad = () => {
    if (routePoints.origin && routePoints.destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: routePoints.origin,
          destination: routePoints.destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            setDirections(null);
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="absolute inset-0 z-0" style={{ pointerEvents: "auto" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
          onLoad={handleLoad}
          options={{
            disableDefaultUI: true,
            styles: uberLightTheme,
            gestureHandling: "greedy",
          }}
        >
          {/* User Marker */}
          {pickupLocation && <Marker position={pickupLocation} icon={userIcon} />}

          {/* Captain Marker */}
          {captainLocation && (
            <Marker
              position={{ lat: captainLocation.ltd, lng: captainLocation.lng }}
              icon={vehicleIcon}
            />
          )}

          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#276EF1",
                  strokeWeight: 4,
                  strokeOpacity: 0.9,
                },
                suppressMarkers: true,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default LiveRouteTracking;
