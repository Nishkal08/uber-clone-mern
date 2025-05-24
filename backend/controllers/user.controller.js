const userModel = require("../models/user.model")
const { validationResult } = require("express-validator")
const userService = require("../services/user.service")

const registerUser = async(req,res) => {

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

module.exports = {
    registerUser
}