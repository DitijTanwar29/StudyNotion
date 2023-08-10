import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { useSelector } from "react-redux";
import {HiArrowCircleUp, HiOutlineCurrencyRupee} from "react-icons/hi"
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn"
import {setStep, setCourse} from "../../../../../slices/courseSlice"
import {COURSE_STATUS} from "../../../../../utils/constants"
import { toast } from "react-hot-toast";
import Upload from "../Upload";
import ChipInput from "./ChipInput"

const CourseInformationForm = () => {
    
        const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
            const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories();
            if(categories.length > 0) {
                    setCourseCategories(categories);
                }
            setLoading(false);
        }

        if(editCourse) {
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePric", course.price);
            setValue("courseTags", course.tag);
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequiremenets", course.instructions);
            setValue("courseImage", course.thumbnail);

        }
        getCategories();
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.coursePrice ||
            // currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategories._id !== course.categories._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()  )
            return true;
        else
            return false;
    }

    //Handles Next Button's Click
    const onSubmit = async(data) => {
    
            if(editCourse) {
                        if(isFormUpdated()) {
                                const currentValues = getValues();
                                const formData = new FormData();
            
                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName) {
                        formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.courseDescription) {
                        formData.append("courseDescription", data.courseShortDesc);
                    }
    
                if(currentValues.coursePrice !== course.price) {
                        formData.append("price", data.coursePrice);
                    }

                    if(currentValues.courseBenefits !== course.whatYouWillLearn) {
                            formData.append("whatYouWillLearn", data.courseBenefits)
                        }
        
                if(currentValues.courseTags !== course.tag) {
                        formData.append("tag", data.courseTags)
                }

                if(currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }

                if(currentValues.courseImage !== course.thumbnail) {
                        formData.append("thumbnail", data.courseImage)
                    }

                if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                        setStep(2);
                        dispatch(setCourse(result));
                    }
    
                }
                else {
                        toast.error("No changes made to the form");
            }

            return;
        }
        


        // create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price",data.coursePrice);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("status",COURSE_STATUS.DRAFT);
        formData.append("thumbnailImage",data.courseImage);
        formData.append("tag",JSON.stringify(data.courseTags))
        
        setLoading(true);
        // console.log("before db call setStep value is = ", setStep);
        const result = await addCourseDetails(formData, token);
        if(result) {
                dispatch(setStep(2));
                dispatch(setCourse(result));
            }
            setLoading(false);
        console.log("PRINTING FORM DATA - ",  formData);
        // console.log("PRINTING thumbnail", formData.thumbnail);
        // console.log("value of setStep = ", setStep);
    }
    // console.log(courseCategories)
    return (
            <form
            onSubmit={handleSubmit(onSubmit)}
        className="ronded-md border-r-richblack-700 bg-richblack-800 p-6 space-y-8"
        >
            <div>
                <label htmlFor="courseTitle">Course Title<sup>*</sup></label>
                <input
                id="courseTitle"
                placeholder="Enter Course Title"
                {...register("courseTitle", {required:true})}
                className="w-full"
                /> 
                {
                    errors.courseTitle && (
                        <span>Course Title is required.</span>
                    )
                }
            </div>
            <div>
                <label htmlFor="courseShortDesc">Course Short Description<sup>*</sup></label>
                <textarea
                id="courseShortDesc"
                placeholder="Enter Description"
                {...register("courseShortDesc",{required:true})}
                className="min-h-[140px] w-full"

                />
                {
                        errors.courseShortDesc && (
                                <span>Course Description is required</span>
                    )
                }
            </div>
            <div className="relative">
                <label htmlFor="coursePrice">Course Price</label>
                <input

                id="coursePrice"
                placeholder="Enter Course Price"
                {...register("coursePrice", {
                        required:true,
                    valueAsNumber:true,
                    })}
                className=" w-full"
                
                />
                <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400"  />
                {
                        errors.coursePrice && (
                        <span>Course Price is required.</span>
                    )
                }
            </div>
            <div>
                <label htmlFor="courseCategory">Course Category<sup>*</sup></label>
                <select
                id="courseCategory"
                defaultValue=""
                {...register("courseCategory",{required:true})}
                className="text-richblack-400"
                >

                <option value="" disabled>Choose a Category</option>

                {
                        !loading && courseCategories.map((category, index) => (
                                <option key={index} value={category?._id}>
                            {category?.name}
                        </option>

                    ))
                }    
                </select>
                {
                        errors.courseCategory && (
                                <span>Course Category is Required.</span>
                    )
                }
            </div>


            {/* Create a custom component for handling tags input */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholders="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues} 
                />

               

                {/* Create a component for uploading and showing preview of image */}
                < Upload
                    name="courseImage"
                    label="Course Thumbnail"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}

                />
                {/* Benefts of the coUrse */}
                <div>
                    <label htmlFor="courseBenefits">Benefits of the course</label>
                    <textarea
                    id="courseBenefits"
                    placeholder="Enter Benefits of the course"
                    {...register("courseBenefits", {required:true})}
                    className="min-h-[130px] w-full"
                    
                    />
                    {errors.courseBenefits && (
                        <span>Benefits of the course are required</span>
                    )}
                </div>
                <RequirementField
                name='courseRequirements'
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}                
                
                />

                <div>
                    {
                        editCourse && (
                                <button
                                onClick={() => dispatch(setStep(2))}
                            className="flex items-center gap-x-2 bg-richblack-300"
                            >
                                Continue Without Saving
                            </button>
                        )
                    }

                    <IconBtn
                    text={!editCourse ? "Next" : "Save Changes"}

                    />

                </div>
        </form>
    )
}

export default CourseInformationForm



























//setStep testiing code
// import { useDispatch, useSelector } from "react-redux"


// const CourseInformationForm = () => {

//     const {step,setStep} =  useSelector((state) => (state.course))
//     const dispatch = useDispatch()
//     const incrementStep = (step) => {
        
//         console.log("Value of step before setStep - ",step)
        
//        dispatch(setStep(2));
//        console.log("Value of step after using SetStep - ",step)
        
//     }

// return (
//     <div className="bg-yellow-500 w-[500px] h-[100px] flex justify-center -items-center">

//         <button
//         onClick={()=>dispatch(setStep(2))}
//         className="w-[150px] h-[50px] bg-blue-200 text-white"
//         >
//             Click to increment Step
//         </button>

//     </div>
// )
// }


// export default CourseInformationForm