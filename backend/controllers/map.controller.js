const { getAddressCoordinates , getAutoCompletes, getDistanceT } = require("../services/map.service")
const { validationResult } = require("express-validator")
const getCoordinates = async(req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()})
    }
    const address = req.query.address
    if(!address || address.trim() === "")
    {
        throw new Error("Address is required")
    }
    try{
        console.log(typeof getAddressCoordinates)
        const coordinates = await getAddressCoordinates(address)
        res.status(200).json(coordinates)
    }
    catch(err)
    {
        res.status(400).json({"error":err.message,message:"Coordinates not found"})
    }
}

const getDistanceTime = async(req,res) => { 
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json(errors.array())
    }
    
    const origin = req.query.origin
    const destination = req.query.destination
    if(!origin || !destination || origin.trim() === "" || destination.trim() === "")
    {
        return res.status(400).json({message:"Origin and destination are required"})
    }
    try{

        const distanceTime = await getDistanceT(origin,destination)
        return res.status(200).json(distanceTime)
    }
    catch(err)
    {
        return res.status(400).json({"error":err.message})
    }
}

const getSuggestions = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json(errors.array())
    }

    const { location } = req.query
    if(!location || location.trim() === "")
    {
        return res.status(400).json({message:"Location is required"})
    }
    try{

        const suggestions = await getAutoCompletes(location)
        // console.log("Suggestions----------------", suggestions)
        return res.status(200).json(suggestions)

    }
    catch(err)
    {
        return res.status(400).json({message:"error occured while fetching suggestions",error:err.message})
    }
}

module.exports={
    getCoordinates,
    getDistanceTime,
    getSuggestions
}