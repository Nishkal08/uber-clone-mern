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
router.post("/create-ride",
    [
        body("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup address"),
        body("destination").isString().isLength({ min: 3 }).withMessage("Invalid destination address"),
        body("vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Invalid vehicle type")
    ],
    authUser,
    rideController.createRide
)

router.post('/confirm-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.post("/start-ride",
    authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    body("otp").isNumeric().isLength({min:6,max:6}).withMessage("Invalid otp"),
    rideController.startRide
)

router.post("/end-ride",
    authCaptain,
    body("rideId").isMongoId().withMessage("Invalid ride id"),
    rideController.endRide
)

module.exports = router