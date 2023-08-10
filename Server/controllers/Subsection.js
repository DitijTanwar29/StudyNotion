const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create Subsection
exports.createSubSection = async (req, res) => {
    try{
        //fetch data from req body
        const {sectionId, title, timeDuration, description} = req.body;
        //extract file/video
        const video = req.files.videoFile;
        //validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create a subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        //update section with this Sub-Section Object ID
        const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
                                                    {$push:{
                                                        subSection: subSectionDetails._id,
                                                    }},
                                                    {new:true})
                                                    .populate("subSection")
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
        const {title, description, sectionId} = req.body;
        const video = req.files.video;
        //validation
        if(!sectionId) {
            return res.status(404).json({
                success:false,
                message:'SubSection not found',
            });
        }
        const updateVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const SubSection = await SubSection.findByIdAndUpdate({sectionId}, 
                                                    {
                                                            $push: {
                                                                title: title,
                                                                description: description,
                                                                video : updateVideo.secure_url,
                                                                timeDuration: updateVideo.Duration,
                                                            }
                                                        },
                                                    {new:true});

        return res.status(200).json({
            success:true,
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
                                            $push : {
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

        return res.status(200).json({
            success:true,
            message:'Sub Section deleed successfully',
        });
    } catch(error) {
        return res.status(500).json({
            success:true,
            message:'An error occured while deleting the SubSection',
        });
    }
};