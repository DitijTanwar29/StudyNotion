const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const { response } = require("express");
const Profile = require("../models/Profile");

//SendOtp
exports.sendotp = async (req,res) => {

    try{

        //fetch email from request body
        const {email} = req.body;
        console.log(email);
        //check if user is already exists
        const checkUserPresent = await User.findOne({email});
    
        //if user already exists, then return a response
        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:"User Already Registered",
            })
        }
    
        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP Generated: ", otp );

        //check unique otp or not
        const result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            // result = await OTP.findOne({otp: otp});
        }

        const otpPayload = { email, otp };

        //create an entry for OTP
        const OTPBody = await OTP.create(otpPayload);
        console.log("otp body",OTPBody);

        //return response Successful
        return res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        });
    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }



};
//SignUp
exports.signup = async (req,res) => {

    try{
            //data fetch
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
        } = req.body;
    
        //validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ||contactNumber) {
                return res.statu(403).json({
                    success:false,
                    message: "All fields are required",
                })
             }
    
        //match 2 passwords
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword value does not match, please try again",
            })
        }
    
        //check user alreeady exists or not
        const existingUser = await User.findOne({email}); 
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User already registered",
            })
        }
    
        //find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);
    
        // validate OTP
        if(recentOtp.length === 0) {
            //OTP not found
            return res.status(400).json({
                success:false,
                message:"OTP Not Found",
            })
        }
        else if(otp !== recentOtp[0].otp) {
            //Invalid Otp
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            });
        }
        
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        //create the user 
        let approved = "";

        approved === "Instructor" ? (approved = false) : (approved = true);
        //create the additional prfile for User
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
    
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return res
        return res.status(200).json({
            success:true,
            message:'User is registered Successfully',
            user,
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            ststus:false,
            message:"User cannot be registered. Please try again"
        });
    }
    
};
//Login
exports.login = async (req,res) => {
    try{
        //get data from req body
        const {email, password} = req.body;
        //data validation
        if(!email || !password) {
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again"
            });
        }
        //check user- exists or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup first"
            });
        }
        //generate JWT, After Password matching
        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in Successfully',
            })
        }
        else {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Filure, please try again',
        });
    }
};

//ChangePassword
exports.changePassword = async (req,res) => {
    //get data from req body
    //get oldPassword, newPassword, confirmPassword
    try{
        
        const {id, password, newPassword, confirmPassword} = req.body;

        //validation
        if(!id || !password || !newPassword || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message:'All fields are required, please try again',
            })
        }
        
        const user = await User.findOne({id});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered, Signup first',
            });
        }
        
        else if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword value does not match, please try again",
            }) 
        }
        
        //update password in DB
        const updatedPassword = await User.findByIdAndUpdate({id}, {
            password : updatedPassword,
        })
    
        //send mail - Password updated
        mailSender(user.email, "Password Changed Confirmation mail", "Password Changed Successfully")
        
        //return response
        return res.status(200).json({
            success:true,
            message:'Password Updated Successfully',
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Password Cannot be changed, please try again',
        });
    }
};