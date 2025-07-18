const mongoose = require("mongoose")
const rideModel = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"captain",
    },
    pickup:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","ongoing","rejected","completed"],
        default:"pending"
    },
    duration:{
        type:Number
    },//seconds
    distance:{
        type:Number
    },
    vehicleType:{
        type:String,
        enum:["car","moto","auto"] 
    },
    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false,
        required: true,
    },    
},{timestamps:true})

module.exports = mongoose.model("ride",rideModel)