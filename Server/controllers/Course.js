const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

//create course handler function
exports.createCourse = async(req,res) => {
    try{
        //get user Id from request object
        const userId = req.user.id;
        //fetch data

        console.log(userId);
        let {
            courseName,
            courseDescription, 
            whatYouWillLearn, 
            price, 
            tag,
            category, 
            status, 
            instructions
        } = req.body;

        //get thiumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(
            !courseName ||
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !tag ||
            !thumbnail ||
            !category  
            ) {
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            });
        }

        //check for instructor

        const instructorDetails = await User.findById(userId);
        console.log("Instructor Detils: ", instructorDetails);
        //TODO: Verify that userId and instructorDetails._id are same or different?

        if(!instructorDetails) {
            return res.status(404).json({
                success:false,
                message:'Instructor Details not found',
            });
        }


        if (!status || status === undefined) {
			status = "Draft";
		}


        //check given Category is valid or not 
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category Details not found',
            });
        }

        // upload image to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        })

        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new:true},
        );

        // update the category schema i.e adding new course to the categies
        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new:true},
        );

        //return response
        return res.status(200).json({
            success:true,
            message:'Course created successfully',
            data:newCourse,
        });
    } catch(err) {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Failed to create course',
            error:err.message,
        })
    }
};

//get all course handler function
exports.getAllCourses = async (req, res) => {
    try{
            const allCourses = await Course.find({}, {courseName:true,
                                                    thumbnail:true,
                                                    price:true,
                                                    instructor:true,
                                                    ratingAndReview:true,
                                                    studentsEnrolled:true})
                                                    .populate("instructor")
                                                    .exec();
            return res.status(200).json({
                success:true,
                message:'Data for all courses fetched successfully',
                data:allCourses,
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Cannot fetch course data',
        });
    }
};

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try{
        //get id
        const {courseId} = req.body;
        //find course details
        const courseDetails = await Course.find(
                                            {_id: courseId})
                                            .populate(
                                                {
                                                    path:"instructor",
                                                    populate:{
                                                        path:'additionalDetails',
                                                    },
                                                }
                                            )
                                            .populate("category")
                                            //.populate('ratingAndreviews')
                                            .populate({
                                                path:'courseContent',
                                                populate:{
                                                    path:"subSection",
                                                },
                                            })
                                            .exec();
            //validation
            if(!courseDetails) {
                return res.status(400).json({
                    success:false,
                    message:`Could not find the course with ${courseId}`,
                });
            }
            //return response
            return res.status(200).json({
                success:true,
                message:'Course details fetched successfully',
                data:courseDetails,
            });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
