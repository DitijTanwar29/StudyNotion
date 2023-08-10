//IMPORT THE REQUIRED MODULES
const express = require("express");
const router = express.Router();

//import the required controllers
const {capturePayment, verifySignature} = require("../controllers/Payments");
const {auth, isInstructor, isStudent, isAdmin} = require("../middlewares/auth");
//create the route 
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;