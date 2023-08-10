const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose. Schema({

    email: {
        type: String,
        required: true,
    },
    otp: {
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }
});


// a function -> to send emails
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from Study Notion", otp);
        console.log("Email Sent Successfully: ", mailResponse);
    }
    catch(error){
        console.log("Error Occured While Sending Mails: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = new mongoose.model("OTP", OTPSchema);