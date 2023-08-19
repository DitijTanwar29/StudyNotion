const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create Subsection
// exports.createSubSection = async (req, res) => {
//     try{
//         //fetch data from req body
//         const {sectionId, title, description} = req.body;
//         //extract file/video
//         const video = req.files.videoFile;
//         //validation
//         if (!sectionId || !title || !description || !video) {
//             return res.status(404).json({
//                 success:false,
//                 message:'All fields are required',
//             });
//         }
//         console.log("sectionId", sectionId);
//         console.log("title", title);
//         console.log("description", description);
//         console.log("video - ",video);
//         console.log("time duration - ", timeDuration);
//         //upload video to cloudinary
//         const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
//         //create a subsection
//         const subSectionDetails = await SubSection.create({
//             title: title,
//             timeDuration: `${uploadDetails.duration}`,
//             description: description,
//             videoUrl: uploadDetails.secure_url,
//         })
//         console.log("subsectiondetails",subSectionDetails)
//         //update section with this Sub-Section Object ID
//         const updatedSection = await Section.findByIdAndUpdate({_id: sectionId},
//                                                     {$push:{
//                                                         subSection: subSectionDetails._id,
//                                                     }},
//                                                     {new:true})
//                                                     .populate("subSection")
//         console.log("updated Section after course creation - ", updatedSection);
//         //return response
//         return res.status(200).json({
//             success:true,
//             message:'Subsection Created Successfully',
//             data:updatedSection,
//         });

//     } catch(error) {
//         return res.status(500).json({
//             success:false,
//             message:'Internal Server Error',
//             error:error.message,
//         });
//     }
// }; 

//create sub section code by bhaiyaa 
exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description } = req.body
      const video = req.files.video
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      console.log("video - ",video)
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log("upload details - ",uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
      
      console.log("sub section details - ", SubSectionDetails);
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
    ).populate("subSection")
   
      
      const CourseId = await Section.findOne({courseId:"courses"});
      console.log("Course id ",CourseId);
      console.log("updated Section - ", updatedSection);

    //   const updatedCourse = await Course.findByIdAndUpdate(
    //     { _id: courseId},
    //     { $push: { courseContent: updatedSection._id} },
    //     {new: true}
    //   ).populate("Section")
      
      // Return the updated section in the response

      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  

//hw: update sub section 
exports.updateSubSection = async (req, res) => {
    try{
        //fetch data
        const {title, description, sectionId, subSectionId} = req.body;
        const video = req.files.video;
        const subSection = await SubSection.findById(subSectionId);
        
        //validation
        if(!sectionId) {
            return res.status(404).json({
                success:false,
                message:'SubSection not found',
            });
        }
        // if(description !== undefined){
        //     subSection.description = description;
        // }
        // if(title !== undefined){
        //     subSection.title = title;
        // }
        // if(req.files && req.files.video !== undefined) {
        // const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // }
        const updateVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const SubSection = await SubSection.findByIdAndUpdate({sectionId}, 
                                                    {
                                                            $push: {
                                                                title: title,
                                                                description: description,
                                                                video : updateVideo.secure_url,
                                                                timeDuration: `${updateVideo.Duration}`,
                                                            }
                                                        },
                                                    {new:true});


        updatedSection = await Section.findById(sectionId).populate("subSection");

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