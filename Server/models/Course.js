const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },
    courseDescription: {
        type: String,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }    
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatinAndReview",
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    studentsEnrolled: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    tag: {
        type:[String],
        required:true,
    },
    instructions: {
        type: [String],
    },
    ststus:{
        type:String,
        enum:["Draft","Published"],
    },
});

module.exports = mongoose.model("Course", courseSchema);