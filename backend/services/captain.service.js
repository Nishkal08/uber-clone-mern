const captainModel = require('../models/captain.model');

const createCaptain = async ({firstname,lastname,email,password,color,plate,vehicleType,capacity}) => 
{
    if(!firstname || !email || !password || !color || !plate || !vehicleType || !capacity){
        throw new Error("All fields are required")
    }

    const captain =  captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            plate,
            vehicleType,
            color,
            capacity
        }
    })
    return captain;
}

module.exports = {
    createCaptain
}