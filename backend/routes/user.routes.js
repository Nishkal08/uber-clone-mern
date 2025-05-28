const express = require("express");
const { registerUser , getUserProfile , logoutUser, loginUser} = require("../controllers/user.controller");
const { body } = require("express-validator")
const router = express.Router();
const { authUser } = require("../middlewares/auth.middleware");

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email address"),
    body("fullname.firstname").isLength({min:3}).isString().withMessage("First name is required"),
    body("password").isLength({min:6}).withMessage("Invalid Password")
]
    ,registerUser
)
router.post("/login",[
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({min:6}).withMessage("Invalid Password")
]
    ,loginUser
)

router.get("/profile",authUser,getUserProfile)
router.post("/logout",authUser,logoutUser)

module.exports = router
