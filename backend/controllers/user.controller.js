const userModel = require("../models/user.model")
const { validationResult } = require("express-validator")
const userService = require("../services/user.service")
const blacklistTokenModel = require("../models/blacklistToken.model")

const registerUser = async(req,res) => {
    console.log("Entered controller",req.body)
    //validations
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    //create user
    const {fullname,email,password} = req.body
    const isUserExists = await userModel.findOne({ email })
    if(isUserExists){
        return res.status(400).json({message:"User already exists"})
    }
    // console.log("Password : ",password)
    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser(
        {
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword
        }
    )
    if(!user){
        return res.status(400).json({message:"User not created"})
    }
    const token = await user.generateAuthToken()

    res.status(201).json({user,token})

}
const loginUser = async(req,res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }
    
    const {email,password} = req.body
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }
    console.log(user)
    const isMatch = await user.comparePassword(password)
    
    if(!isMatch){
        return res.status(400).json({message:"Invalid email or password"})
    }

    const token = await user.generateAuthToken()
    res.cookie("token",token)
    res.status(200).json({user,token,message:"Login successful"})
}

const getUserProfile = async(req,res,next) => {
    res.status(200).json(req.user)
}
const logoutUser = async(req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token")
    blacklistTokenModel.create({token})
    res.status(200).json({message:"Logout successful","expiredToken":token})
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}