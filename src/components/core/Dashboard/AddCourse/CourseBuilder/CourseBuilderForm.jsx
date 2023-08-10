// my code
import React from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { HiArrowSmRight } from "react-icons/hi";
import {
  updateSection,
  createSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../../slices/courseSlice";
import NestedView from "./NestedView";
import toast from "react-hot-toast";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const { course, setStep } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    console.log("data - ", data);
    setLoading(true);
    let result;
    console.log("inside onSubmit");

      if(editSectionName) {
        // we are editing the section name
        result = await updateSection(
            {
            sectionName: data.sectionName,
            sectionId: editSectionName,
            courseId: course._id,
            }, token
        )
      }
      else{
    result = await createSection(
      {
        sectionName: data.sectionName,
        courseId: course._id,
      },
      token
    );
    // const response = await result.json();

    console.log("Inside else statement");
    console.log("result - ", result);

      }

    //update values
    if (result) {
      console.log("value of result", result);
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    //loadiing false
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section");
      return;
    }
    // if everything is good
    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  console.log(
    "logging the length of course content - ",
    course.courseContent.length
  );
  console.log("course", course);
  return (
    <div className="text-white">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">
            Section Name <sup>*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full form-style"
          />
          {errors.sectionName && <span>Section Name is required</span>}
        </div>
        <div className="mt-10 flex w-full">
          <IconBtn
            type="submit"
            // onClick={toast.success("CLICKEDD ON THE CREATE BUTTON")}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}
          >
            <AiOutlinePlusCircle className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-richblack-400 underline text-sm ml-10"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="mt-10 flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="rounded-md cursor-pointer flex items-center"
        >
          Back
        </button>
        <IconBtn text={"Next"} onClick={goToNext}>
          <HiArrowSmRight />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
