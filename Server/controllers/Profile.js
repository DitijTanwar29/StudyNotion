const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
    try{
            //get data
            const {dateOfBirth="", about="", contactNumber, gender } = req.body;
            //get userId
            const id = req.user.id; 
            //validate data
            if (!contactNumber || !gender || !id) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required'
                });
            }
            //find Profile
            const userDetails = await User.findById(id);
            const profileId = userDetails.additionalDetails;
            const profileDetails = await Profile.findById(profileId);
            //update profile
            profileDetails.dateOfBirth = dateOfBirth;
            profileDetails.about = about;
            profileDetails.gender = gender;
            profileDetails.contactNumber = contactNumber;

            await profileDetails.save();
            //return response
            return res.status(200).json({
                success:true,
                message:'Profile Updated Successfully',
                profileDetails,
            })
    } catch(error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        });

    }
};

//Delete Account
exports.deleteAccount = async (req, res) => {
    try{
            //  const job = schedule.scheduleJob("10 * * * * *", function () {
            // 	console.log("The answer to life, the universe, and everything!");
            // });
            // console.log(job);

        //get id 
        console.log("printing id",req.user.id);
        const id = req.user.id;
        //validation 
        const userDetails = await User.findByIdAndDelete(id);
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:'User not found',
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id: user.additionalDetails});

        //TODO: Unenroll User From All the Enrolled Courses
        if(accountType === "Student"){

            const enrolledCourses = await User.findById(id).populate("courses").exec();
            
            const unenrollUser = Course.findById(id);
            unenrollUser.studentsEnrolled.length(-1);
        }


        //delete user
        await User.findByIdAndDelete({_id:id});
        
        //return response
        return res.status(200).json({
            success:true,
            message:'User deleted successfully',
        });

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
        });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try{
        //get id
        const id = req.user.id;
        //validate and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        // return response
        return res.status(200).json({
            success:true,
            message:'User data fetched successfully',
            data:userDetails,
        });
        

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try{
        // fetch picture from req.files
        const displayPicture = req.files.displayPicture;
        //get user id 
        const userId = req.user.id;
        //upload image to cloudinary
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        // update user's profile with image
        const updatedProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image: image.secure_url},
            {new:true}
        )
        //return response
        return res.status(200).json({
            success:true,
            message:'Image updated successfully',
            data: updatedProfile,
        });
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try{
        //get user id 
        const userId = req.user.id;
        //find user details with this id
        const userDetails = await User.findOne(
            {_id:userId,})
            .populate("courses")
            .exec();

        //if user details not found
        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:`Could not find user with Id ${userDetails}`,
            });
        }

        // return response
        return res.status(200).json({
            success:true,
            message:'Enrolled Courses Found Successfully',
            data:userDetails.courses,
        });

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
