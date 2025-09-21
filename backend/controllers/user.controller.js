const userModel = require("../models/user.model")
const { validationResult } = require("express-validator")
const userService = require("../services/user.service")
const { OAuth2Client } = require('google-auth-library')
const blacklistTokenModel = require("../models/blacklistToken.model")
const registerUser = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password } = req.body
    const isUserExists = await userModel.findOne({ email })
    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" })
    }
    // console.log("Password : ",password)
    const hashedPassword = await userModel.hashPassword(password)
    const user = await userService.createUser(
        {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        }
    )
    if (!user) {
        return res.status(400).json({ message: "User not created" })
    }
    const token = await user.generateAuthToken()
    res.status(201).json({ user, token })

}
const loginUser = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { email, password } = req.body
    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" })
    }
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" })
    }

    const token = await user.generateAuthToken()

    res.cookie("token", token)

    return res.status(200).json({ user, token, message: "Login successful" })
}

const googleLogin = async (req, res) => {
  try {
    //idToken =  jwt token provided by google contaning user info (email,name etc)
    console.warn("Google Login called");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ message: "No ID token provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("Google ticket:", ticket);

    const payload = ticket.getPayload();
    const { email, given_name, family_name, picture, email_verified } = payload;

    if (!email_verified) {
      return res.status(401).json({ message: "Google email not verified" });
    }
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign up first.",
        email,
        firstName: given_name,
        lastName: family_name,
        picture,
      });
    }
    const token = await user.generateAuthToken();
    res.status(200).json({ token: token, user,picture:picture });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Google login failed" });
  }
}


const getUserProfile = async (req, res, next) => {
    return res.status(200).json(req.user)
}
const logoutUser = async (req, res, next) => {
    console.warn("Logout called");
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token")
    blacklistTokenModel.create({ token })
    res.status(200).json({ message: "Logout successful", "expiredToken": token })
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
    googleLogin
}