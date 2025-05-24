const express = require('express');
const app = express()
const cors = require('cors');
const connectDb = require("./db/db")
const userRoutes = require("./routes/user.routes") 
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


connectDb()

app.get("/",async (req,res) => {
    res.send("hello")
})
app.use("/users",userRoutes)
module.exports = app