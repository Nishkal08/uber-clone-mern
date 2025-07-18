const axios = require('axios');
const captainModel = require('../models/captain.model');
const getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    // console.log(apiKey)
    if (!apiKey) throw new Error('Google Maps API key not found in environment variables');

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    ;

    const response = await axios.get(url);
    const data = response.data;
    if (data.status !== 'OK' || !data.results.length) {
        throw new Error('No results found for the given address');
    }
    const { lat, lng } = data.results[0].geometry.location;

    return { lat, lng };
}

const getDistanceT = async (origin, destination) => {

    if (!origin || !destination) throw new Error('Origin and destination are required');

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error('Google Maps API key not found');

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status !== 'OK' || !data.routes.length) {
        throw new Error('No route found between the given locations');
    }

    const leg = data.routes[0].legs[0];

    // return data
    return {
        distance: leg.distance,
        duration: leg.duration
    };
}

const getAutoCompletes = async (location) => {
    if (!location) {
        throw new Error('Location is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error('Google Maps API key not found');

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(location)}&key=${apiKey}`
    try {
        const suggestions = await axios.get(url);
        // console.log(suggestions.data)
        if (suggestions.data.status !== 'OK') {
            //if suggestions array is empty
            throw new Error('No suggestions found')
        }
        return suggestions.data.predictions
    }
    catch (err) {
        console.log(err)
        throw err
    }
}
const getCaptainsInRadius = async (lat, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lat, lng], radius / 6371] 
            }
        }
    });
    return captains;
}
//send message to users socket id


module.exports = {
    getAddressCoordinates,
    getDistanceT,
    getAutoCompletes,
    getCaptainsInRadius
};