const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');  
const  captainController  = require('../controllers/captain.controller'); 

router.post("/register",[
    body("fullname.firstname").notEmpty().isString().isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("vehicle.plate").isLength({min:3}).withMessage("Plate must be at least 3 characters long"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Vehicle type must be car, motorcycle, or auto"),
    body("vehicle.color").isLength({min:3}).withMessage("color must be at least 3 characters long"),
    body("vehicle.capacity").isInt({min:1}).withMessage("Capacity must be at least 1 person")
],
    captainController.registerCaptain
)

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
],
    captainController.loginCaptain
)
router.get("/location/:captainId",captainController.getCaptainLocation)
router.post("/google-login",captainController.googleLogin)
router.get("/profile",authCaptain,captainController.getCaptainProfile)
router.post("/logout",authCaptain,captainController.logoutCaptain)

module.exports = router