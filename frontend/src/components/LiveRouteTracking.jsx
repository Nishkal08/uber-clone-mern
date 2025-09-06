import React, { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import { captainDataContext } from "../context/CaptainContext";
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// Uber dark map theme
// const uberMapStyle = [
//   { elementType: "geometry", stylers: [{ color: "#212121" }] },
//   { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
//   { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
//   { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
//   {
//     featureType: "administrative",
//     elementType: "geometry",
//     stylers: [{ color: "#757575" }],
//   },
//   {
//     featureType: "poi",
//     elementType: "geometry",
//     stylers: [{ color: "#181818" }],
//   },
//   {
//     featureType: "poi.park",
//     elementType: "geometry",
//     stylers: [{ color: "#181818" }],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.fill",
//     stylers: [{ color: "#2c2c2c" }],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry.stroke",
//     stylers: [{ color: "#1f1f1f" }],
//   },
//   {
//     featureType: "road.highway",
//     elementType: "geometry",
//     stylers: [{ color: "#3c3c3c" }],
//   },
//   {
//     featureType: "transit",
//     elementType: "geometry",
//     stylers: [{ color: "#2f2f2f" }],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#000000" }],
//   },
//   {
//     featureType: "water",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#3d3d3d" }],
//   },
// ];

const uberLightMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
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
const uberLightTheme = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "on" }]   // POIs stay visible
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{ "color": "#eeeeee" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#dadada" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{ "color": "#e5e5e5" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#c9c9c9" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }]
  }
];

const res = axios.get("map/")

const vehicleIcon = {
  url: "https://static.vecteezy.com/system/resources/previews/029/947/412/non_2x/white-city-car-isolated-on-transparent-background-3d-rendering-illustration-free-png.png", // Example vehicle icon, replace with your own if needed
  scaledSize: { width: 40, height: 40 },
  anchor: { x: 20, y: 20 },
};

const userIcon = {
  url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7uACgyiKt5pU7HEX5okhp4ZzkdHO0mjlHXw&s", // Example vehicle icon, replace with your own if needed
  scaledSize: { width: 15, height: 15 }
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

  useEffect(() => {
    if (captain?.location) {
      setCaptainLocation(captain.location);
    }
  }, [captain?.location, setCaptainLocation]);
  
  const getCoordinates = async (address) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-coords`, {
        params: {
          address: pickupLocation
        }
      });
      
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };
  useEffect(() => {
    try{
      const fetchCoordinates = async () => {
        const coords = await getCoordinates(pickupLocation);
        console.log("Fetched coordinates:", coords);
        if (coords) {
          setPickupLocation(coords);
        }
      };
      fetchCoordinates();
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  }, [pickupLocation, setPickupLocation]);


  useEffect(() => {
    if (captainLocation && pickupLocation) {
      setRoutePoints({
        origin: { lat: captainLocation.ltd, lng: captainLocation.lng },
        destination: pickupLocation,
      });
    }
  }, [captainLocation, pickupLocation, setRoutePoints]);

  useEffect(() => {
    if (routePoints.origin && routePoints.destination && window.google) {
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
  }, [routePoints]);

  const mapCenter = routePoints.origin || pickupLocation || { lat: 23.0225, lng: 72.5714 };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="absolute inset-0 z-0" style={{ pointerEvents: "auto" }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
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
