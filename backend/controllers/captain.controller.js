const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


const registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json({ errors: errors.array() });
    }

    const { fullname, vehicle, password, email } = req.body;

    const isCaptainExists = await captainModel.findOne({ email })
    if (isCaptainExists) {
        return res.status(400).json({ message: "Captain already exists" });
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        plate: vehicle.plate,
        color: vehicle.color,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity
    })
    if (!captain) {
        return res.status(400).json({ message: "Captain not created" });
   }
    console.log("Captain :", captain);
    const token = captain.generateAuthToken()

    res.status(201).json({ captain: captain , token: token })
}

const loginCaptain = async(req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email , password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password")
    if(!captain){
        return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("Captain :", captain.generateAuthToken());    
    const isMatch = await captain.comparePassword(password)
    if(!isMatch){
        return res.status(400).json({ message: "Invalid email or password" });
    }
    
    const token = await captain.generateAuthToken();
    res.cookie("token",token)

    res.status(200).json({captain , token})
}
const logoutCaptain = async(req,res) => {
    const token = req.token
    res.clearCookie("token");
    blacklistTokenModel.create({ token })
    res.status(200).json({ message: "Logout successful" });
}
const getCaptainProfile = async(req,res) => {
    return res.status(200).json(req.captain);
}
module.exports = {
    registerCaptain,
    loginCaptain,
    logoutCaptain,
    getCaptainProfile
}
