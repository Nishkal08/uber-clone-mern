require("dotenv").config()
const express = require('express');
const app = express()
const cors = require('cors');
const connectDb = require("./db/db")

const userRoutes = require("./routes/user.routes") 
const captainRoutes = require("./routes/captain.routes")   
const mapRoutes = require("./routes/map.routes")
const rideRoutes = require("./routes/ride.routes")
const cookieParser = require("cookie-parser")
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

connectDb()

app.get("/",async (req,res) => {
    res.send("hello")
})

app.use("/users",userRoutes)
app.use("/captains", captainRoutes)
app.use("/map",mapRoutes)
app.use("/ride",rideRoutes)

module.exports = app