const express = require("express")
const router = express.Router()
const { body , query } = require("express-validator")
const { authUser , authCaptain } = require("../middlewares/auth.middleware")    
const  rideController  = require("../controllers/ride.controller")
router.get("/get-fares",
    [
        query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
        query("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address")
    ],
    authUser,
    rideController.getFare
)

module.exports = router