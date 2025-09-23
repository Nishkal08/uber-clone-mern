const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');
const { OAuth2Client } = require('google-auth-library');
const { sendMail } = require('../services/email.service');

const registerCaptain = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const { fullname, vehicle, password, email } = req.body;

  const isCaptainExists = await captainModel.findOne({ email })
  if (isCaptainExists) {
    return res.status(400).json({ message: "Captain already exists" });
  }
  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    plate: vehicle.plate,
    color: vehicle.color,
    vehicleType: vehicle.vehicleType,
    capacity: vehicle.capacity
  })
  if (!captain) {
    return res.status(400).json({ message: "Captain not created" });
  }
  const token = captain.generateAuthToken()
  await sendMail(
    "nishkal0810@gmail.com",
    "User Signed Up",
    `${captain.fullname.firstname} just signed up!`,
    captain.fullname.firstname
  );
  await sendMail(
    captain.email,
    "Welcome to Uber Clone!",
    `Hello ${captain.fullname.firstname},\n\nThanks for signing up on MyApp! 🚀`,
    captain.fullname.firstname
  );

  res.status(201).json({ captain: captain, token: token })
}

const loginCaptain = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password")
  if (!captain) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await captain.comparePassword(password)
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = await captain.generateAuthToken();
  await sendMail(
    "nishkal0810@gmail.com",
    "Captain Logged In",
    `${captain.fullname.firstname} just logged in!`,
    captain.fullname.firstname
  );
  await sendMail(
    captain.email,
    "Welcome to Uber Clone!",
    `Hello ${captain.fullname.firstname},\n\nThanks for logging up on MyApp! 🚀`,
    captain.fullname.firstname
  );
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.status(200).json({ captain, token })
}
const logoutCaptain = async (req, res) => {
  const token = req.token
  res.clearCookie("token");
  blacklistTokenModel.create({ token })
  res.status(200).json({ message: "Logout successful" });
}
const getCaptainProfile = async (req, res) => {
  return res.status(201).json(req.captain);
}

const getCaptainLocation = async (req, res) => {
  const { captainId } = req.params;
  if (!captainId) return res.status(400).json({ message: "Captain ID is required" });

  const location = await captainModel.findById(captainId).select("location -_id");
  if (!location) return res.status(404).json({ message: "Captain not found" });


  return res.status(200).json(location);
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
    let captain = await captainModel.findOne({ email });

    if (!captain) {
      return res.status(404).json({
        message: "Captain not found. Please sign up first.",
        email,
        firstName: given_name,
        lastName: family_name,
        picture,
      });
    }
    const token = await captain.generateAuthToken();
    await sendMail(
      "nishkal0810@gmail.com",
      "Captain Logged In",
      `${captain.fullname.firstname} just logged in!`,
      captain.fullname.firstname
    );
    await sendMail(
      captain.email,
      "Welcome to Uber Clone!",
      `Hello ${captain.fullname.firstname},\n\nThanks for logging up on MyApp! 🚀`,
      captain.fullname.firstname
    );
    res.status(200).json({ token: token, captain });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Google login failed" });
  }
}


module.exports = {
  registerCaptain,
  loginCaptain,
  logoutCaptain,
  getCaptainProfile,
  getCaptainLocation,
  googleLogin
}
