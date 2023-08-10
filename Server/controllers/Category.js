const Category = require("../models/Category");
const Course = require("../models/Course");

//handler function of create Category

exports.createCategory = async (req, res) => {
    try{    
            //fetch data
            const {name, description} = req.body;
            // validate data
            if(!name || !description) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required'
                });
            }

            //create entry in db
            const categoryDetails = await Category.create({
                name: name,
                description: description, 
            });
            console.log(categoryDetails);
            //return response

            return res.status(200).json({
                success:true,
                message:"Category Created Successfully",
            })
    } catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message,
        });
    }
};

// getAllCategories handler function

exports.showAllCategories = async (req,res) => {
    try{
        const allCategorys = await Category.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:'All categories returned successfully',
            data:allCategorys,
        })
    } catch(err) {
        return res.status(500).json({
            success:false,
            message:err.message,
        });
    }
};

// categoryPageDetails

exports.categoryPageDetails = async (req, res) => {
    try{
        //get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId
        const selectedCategory = await Course.findById(categoryId)
                                                .populate('courses')
                                                .exec();
        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'Data not found',
            });
        }
        //get courses for different categories
        const differentCategories = await Course.find({
                                    _id: {$ne:categoryId},
                                })
                                .populate('courses')
                                .exec(0);

        //get top selling courses
        const topSellingCourses = await Category.find({},
                                                {
                                                    $push: {
                                                        $maxN:{
                                                            input:"courses",
                                                            n:10,
                                                        },
                                                    }
                                                })
                                                .populate("courses")
                                                .exec();

        // return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                topSellingCourses,
            }
        })


    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}