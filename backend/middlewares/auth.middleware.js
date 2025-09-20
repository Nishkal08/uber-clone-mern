const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blackListModel = require("../models/blacklistToken.model")
const authUser = async (req,res,next) => {
    
    // checks if user is logged in (authenticated) or not using token

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Authentication token is missing"});
    }
    const isBlackListed = await blackListModel.findOne({token:token})
    if(isBlackListed)
    {
        return res.status(401).json({message:"Token is blacklisted, please login again"})
    }
    try{
       const decodedToken =  jwt.verify(token,process.env.JWT_SECRET_KEY)


       const user = await userModel.findById(decodedToken._id);

       
       if(!user)
       {
        
            return res.status(401).json({message:"User Not Found"})
       }

       req.user = user

       return next()
    }
    catch(err)
    {
        console.log("auth error: "+err);
        
        return res.status(401).json({message:"unauthorized",error:err.message})
    }
}
const authCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({message: "Authentication token is missing"});
    }
    const isBlackListed = await blackListModel.findOne({ token })
    if(isBlackListed)
    {
        return res.status(401).json({ message: "Token is blacklisted, please login again" });
    }
    try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const captain = await captainModel.findById(decodedToken._id) 
        console.warn("Captain : ",captain)
        console.warn("decodedToken._id : ",decodedToken._id)
        if(!captain)
        {
            return res.status(401).json({message:"Captain Not Found"})
        }
        req.captain = captain
        req.token = token
        return next()
    }
    catch(err)
    {
        return res.status(401).json({message:"unauthorized",error: err.message})
    }
}
module.exports = {
    authUser,
    authCaptain
}