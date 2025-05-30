const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const captainSchema = new mongoose.Schema({

    fullname:{
        firstname:{
            required:true,
            type:String,
            minlength:[3,"First name must be at least 3 characters long"],
        },
        lastname:{
            type:String,
            minlength:[3,"Last name must be at least 3 characters long"],
        }
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        plate:{
            type:String,
            unique:[true,"Plate must be unique"],
            minlength:[3,"Plate must be at least 3 characters long"],
            required:true
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car","motorcycle","auto"]
        },
        color:{
            type:String,
            required:true,
            minlength:[3,"Color must be at least 3 characters long"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity must be at least 1 person"]
        }

    },
    location:{
        lat:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }
}, {
    timestamps: true    
})

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(password) {
    const hashedPassword = await bcrypt.hash(password,10)
    return hashedPassword   
}

const captainModel = mongoose.model("captain",captainSchema)
module.exports = captainModel
