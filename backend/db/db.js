// db.js
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

function connectDB() {
  return mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));
}

module.exports = connectDB;
