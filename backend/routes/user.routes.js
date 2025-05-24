const express = require("express");
const { registerUser } = require("../controllers/user.controller");
const { body } = require("express-validator")
const router = express.Router();


router.post("/register",[
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullname.firstname").isLength({min:3}).isString().withMessage("First name is required"),
    body("password").isLength({min:6}).withMessage("Invalid Password")
]
    ,registerUser
)

module.exports = router