//import the required modules
const express = require("express");
const router = express.Router();

//Import the required controllers and middleware functions
const {login, signup, sendotp, changePassword} = require("../controllers/Auth");
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

//Routes for Login, Signup and Authentication

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//                              Authentication routes
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//Route for user login
router.post("/login", login);

//Route for user signup
router.post("/signup", signup);

//Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

//Route for Changing the password
router.post("/changepassword", changePassword);


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//                              Reset password
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//Router for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

//Router for resetting user's password after verification
router.post("/reset-password", resetPassword);

//export the router for using it in the main application
module.exports = router;