const { validationResult } = require("express-validator")
const { getFares } = require("../services/ride.service")
const rideService = require("../services/ride.service")
const getFare = async(req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {pickup,destination} = req.query
        if(!pickup || !destination)
        {
            throw new Error("Pickup and destination are required")  
        }
        console.log("Pickup:", pickup, "Destination:", destination)
        console.log(typeof getFares);
        
        const fares = await getFares(pickup,destination)
        if(!fares)
        {
            return res.status(400).json("Unable to get Fares")
        }
        res.status(200).json(fares)
    }catch(err)
    {
        return res.status(400).json({"error":err.message})
    };
}

const createRide = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {pickup , destination,vehicleType} = req.body
        console.log("Vehicle Type:", vehicleType)
        console.log("User ID:", req.user._id)
        if(!pickup || !destination || !vehicleType)
        {
            throw new Error("Pickup, destination, vehicle type are required")
        }   
        const ride = await rideService.createRide({user:req.user._id, pickup, destination, vehicleType})
        res.status(201).json(ride)
    }catch(err)
    {
        return res.status(400).json({"Error encountered during creating ride":err.message})
    };
}
module.exports = {
    getFare,
    createRide
}
