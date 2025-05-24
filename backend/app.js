const express = require('express');
const app = express()
const cors = require('cors');
const connectDb = require("./db/db")
app.use(cors())
app.use(express.json())

app.get("/",async (req,res) => {
    console.log(await connectDb())
    res.send("hello")
})

module.exports = app