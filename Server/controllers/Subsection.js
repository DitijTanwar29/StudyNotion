const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require ("../models/User");

//create Subsection
exports.createSubSection = async (req, res) => {
    try{
        //fetch data from req body
        const { title, description, sectionId, courseId} = req.body;
        // const  = "64e330303d886a8738e0d172";
        // const  = "648366c3c283a46a485cf380";
        //extract file/video
        const video = req.files.video;
        //validation
        console.log("sectionId", sectionId);
        // console.log("course Id - ", courseId);
        console.log("description", description);
        console.log("video - ",video);
        console.log("title", title);
        if (!sectionId || !title || !description || !video) {
            return res.status(404).json({
                success:false,
                message:'All fields are required',
            });
        }
        
        
        // console.log("current courrent course id - ")
        // console.log("time duration - ", timeDuration);
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create a subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description, 
            videoUrl: uploadDetails.secure_url,
        })
        console.log("subsectiondetails",subSectionDetails)
        //update section with this Sub-Section Object ID
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
                                                    {$push:{
                                                        subSection: subSectionDetails._id,
                                                    }},
                                                    {new:true})
                                                    .populate("subSection")
        // const updatedCourse = await Course.findByIdAndUpdate({_id:courseId},
        //                                             {$push: {
        //                                                 courseContent: updatedSection._id,
        //                                             }},
        //                                             {new:true}
        //                                             ).populate("courseContent")
                                                    
        // console.log("updated Course after subSection creation - ", updatedCourse);
        //return response
        return res.status(200).json({
            success:true,
            message:'Subsection Created Successfully',
            data:updatedSection,
        });

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:'Internal Server Error',
            error:error.message,
        });
    }
}; 

  

//hw: update sub section 
exports.updateSubSection = async (req, res) => {
    try{
        //fetch data
        const {title, description, sectionId, subSectionId} = req.body;
        // console.log("title - ", title);
        // console.log("desc - ",description);
        // console.log("sectionId -", sectionId);
        // console.log("video - ", video);
        // console.log("subSectionId - ", subSectionId);
        const subSection = await SubSection.findById(subSectionId);

        //validation
        if(!sectionId) {
            return res.status(404).json({
                success:false,
                message:'SubSection not found',
            });
        }
        if(description !== undefined){
            subSection.description = description;
        }
        if(title !== undefined){
            subSection.title = title;
        }
        if(req.files && req.files.video !== undefined) {
        const video = req.files.video;
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
        }
        await subSection.save();
        // const updateVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //finc updated section and return it
        const updatedSection = await Section.findById(sectionId).populate("subSection");
        // const SubSection = await SubSection.findByIdAndUpdate({sectionId}, 
        //                                             {
        //                                                     $push: {
        //                                                         title: title,
        //                                                         description: description,
        //                                                         video : uploadDetails.secure_url,
        //                                                         timeDuration: `${uploadDetails.Duration}`,
        //                                                     }
        //                                                 },
        //                                             {new:true});
        // console.log("subsection - ", SubSection)
        console.log("updated Section - ", updatedSection);
        return res.status(200).json({
            success:true,
            data:updatedSection,
            message:'SubSection updated successfully',
        });

    } catch(error) {
        return res.status(500).json({
            success:false,
            message:'Unable to update sub section, please try again',
        });
    }
};

//hw: delete sub section
exports.deleteSubSection = async (req, res) => {
    try{
        //fetch data
        const {sectionId, subSectionId} = req.body;
        //update section
        await Section.findByIdAndUpdate({_id: sectionId},
                                        {
                                            $pull : {
                                                subSection: subSectionId,
                                            },
                                        });

        const subSection = await SubSection.findByIdAndDelete({_id: subSectionId});
        
        if(!subSection) {
            return res.status(404).json({
                success:false,
                message:'Unable to find sub section',
            });
        }

        updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success:true,
            data: updatedSection,
            message:'Sub Section deleted successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success:true,
            message:'An error occured while deleting the SubSection',
        });
    }
};