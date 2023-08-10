const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({

   courseId: {
    type: mongoose.Schema.types.ObjectId,
    ref: "Course",
   },
   completedCourse: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
    }
   ]
});

module.exports = mongoose.model("courseProgress", courseProgress);
