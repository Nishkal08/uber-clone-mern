const mongoose = require("mongoose");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
        lastname:{
            type: String,
             minlength: [ 3, 'Last name must be at least 3 characters long' ],
        }
    },
    password:{
        type:String,
        select:false,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[5,"Email must be at least 5 characters long"],
    },
    socketId:{
        type:String
    }
})

userSchema.methods.generateAuthToken = function(){

    const token =  jwt.sign(
        {
            _id: this._id,
        },process.env.JWT_SECRET_KEY,{expiresIn:"24h"}
    )
    return token
}

userSchema.methods.comparePassword = async function(password){
    return await brcypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await brcypt.hash(password,10)
}
const userModel = mongoose.model("user",userSchema);
module.exports = userModel