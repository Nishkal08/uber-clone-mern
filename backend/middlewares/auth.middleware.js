const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const blackListModel = require("../models/blacklistToken.model")
const authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Authentication token is missing"});
    }
    const isBlackListed = await blackListModel.findOne({token:token})
    if(isBlackListed)
    {
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
       const decodedToken =  jwt.verify(token,process.env.JWT_SECRET_KEY)
       const user = await userModel.findById(decodedToken._id).select("-password");
       if(!user)
       {
            return res.status(401).json({message:"User Not Found"})
       }

       req.user = user
       return next()
    }
    catch(err)
    {
        return res.status(401).json({message:"unauthorized"})
    }
}
module.exports = {
    authUser
}