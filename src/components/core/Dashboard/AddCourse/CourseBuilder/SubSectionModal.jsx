import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.Description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.Description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoUrl", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);

    if (result) {
      // Todo: same check
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to the form");
      } else {
        // edit krdo store me
        handleEditSubSection();
      }
      return;
    }

	// ADD
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoUrl", data.lectureVideo);
    setLoading(true);

    //API CALL
    const result = await createSubSection(formData, token);

    console.log("result of sub section api", result)
    if (result) {
      //TODO: check for updation
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };
  return (
    <div>
      <div>
        <div>
          <p>
            {edit && "Editing"} {view && "Viewing"} {add && "Adding"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name="lectureVideo"
            label="LectureVideo"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div>
            <label>Lecture Title</label>
            <input
              id="lectureTitle"
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
              className="w-full "
            />
            {errors.lectureTitle && <span>Lecture Title is required</span>}
          </div>
          <div>
            <label>Lecture Description</label>
            <textarea
              id="lectureDesc"
              placeholder="Enter lecture description"
              {...register("lectureDesc", { required: true })}
              className="w-full min-h[130px]"
            />
            {errors.lectureDesc && <span>Lecture Description is required</span>}
          </div>

          {!view && (
            <div>
              <IconBtn text={edit ? "Save Changes" : "Save"} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
