const { validationResult } = require("express-validator")
const { getFares } = require("../services/ride.service")
const rideService = require("../services/ride.service")
const mapService = require("../services/map.service")
const rideModel = require("../models/ride.model")
const {sendMessageToUser} = require("../socket")
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

        if(!pickup || !destination || !vehicleType)
        {
            throw new Error("Pickup, destination, vehicle type are required")
        }   
        const pickupCoords = await mapService.getAddressCoordinates(pickup)
        console.log("pickupCoords : ",pickupCoords)
        const captains = await mapService.getCaptainsInRadius(pickupCoords.lat,pickupCoords.lng,200) // 10 km radius
        if(captains.length == 0 || !captains)
        {
            return res.status(404).json({message:"No captains available nearby"})
        }
        const ride = await rideService.createRide({user:req.user._id, pickup, destination, vehicleType})
        // ride.otp=""
        
        //Vehicle based captains filteration
        const rideWithUser = await rideModel.findOne({_id:ride._id}).populate("user")
        const filteredCaptains = captains.filter((captain) => {
            if(ride.vehicleType == "moto"){
                ride.vehicleType = "motorcycle"
            }
            return ride.vehicleType == captain.vehicle.vehicleType
        })

        if(filteredCaptains.length == 0)
        {
            return res.status(404).json({message:"No captains available for selected vehicle type"})
        }
        filteredCaptains.map((captain) => {
            console.log("sending to : ",captain.name)
            sendMessageToUser(captain.socketId,{
                event:"new-ride",
                data:rideWithUser
            })
       })
        res.status(201).json({ride,captain:captains})
    }catch(err)
    {
        console.log(err)
        return res.status(400).json({"Error encountered during creating ride":err.message})
    };
}

const confirmRide = async(req,res) => {
    const errors= validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    const { rideId } = req.body
    try{
        if(!rideId)
        {
            return res.status(400).json({message:"Ride id is required"});
        }
        const ride = await rideService.confirmRide({
            rideId,
            captainId:req.captain?._id}
        )
        console.log("ride : ",ride);
        
        sendMessageToUser(
            ride.user.socketId,
            {
                event:"ride-confirmed",data:ride
            }
        )
        return res.status(200).json(ride)
    }
    catch(err)
    {
        console.log("controller error",err);
        
        return res.status(400).json({"error":err.message})
    }
}

const startRide = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    const { rideId, otp } = req.body
    const ride = await rideService.startRide({rideId,otp,captainId:req.captain._id}) 
    console.log("Start control : ",ride)
    if(!ride || ride.otpMatch === false)
    {
        return res.status(404).json({message:"Ride not found"});
    }
 
    sendMessageToUser(
        ride.user.socketId,
        {
            event:"ride-started",data:ride
        }
    )
    return res.status(200).json(ride)
}

const endRide = async(req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }

    const { rideId } = req.body
    const ride = await rideService.endRide(
        {
            rideId,captainId:req.captain._id
        }
    )
    if(!ride)
    {
        return res.status(400).json({message:"Ride not found"});
    }
    console.log("End control : ",ride)
    console.warn("id : ",ride.user.socketId)
    sendMessageToUser(
        ride.user.socketId,
        {
            event:"ride-ended",data:ride
        }
    )
    return res.status(200).json(ride)

}
module.exports = {
    getFare,
    createRide,
    confirmRide,
    startRide,
    endRide
}
