import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { updateProfile } from "../../../../services/operations/settingsAPI"
import IconBtn from "../../../common/IconBtn"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* Profile Information */}
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"
                
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"
                
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"
                
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style bg-richblack-700 border-b rounded-md border-b-richblack-600 p-3"
                
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"

                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"
               
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
                
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
      </form>
    </>
  )
}






















// ############################################## MY CODE WITHOUT USEFORM ##############################################
// import React from "react"

// const EditProfile = () => {

//     return (

//         <form>

//             <p>Profile Information</p>
//             <div className="flex flex-row items-center justify-between gap-x-3 gap-y-5  rounded-md bg-richblack-800">
//                 <div className="flex flex-col gap-y-2 justify-start items-center ">

//                     <label htmlFor="firstname">First Name</label>
//                     <input
//                         placeholder="Enter Your First Name"
//                         name="firstname"
//                         id="firstname"
//                         type="text"
//                         className="bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"

//                     />

//                 </div>

//                 <div className="flex flex-col gap-y-2 justify-start items-center ">

//                     <label htmlFor="lastname">Last Name</label>
//                     <input
//                         placeholder="Enter Your Last Name"
//                         name="lastname"
//                         id="lastname"
//                         type="text"
//                         className="bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"

//                     />
//                 </div>
//             </div>

//             <div className="flex flex-row items-center justify-between gap-x-3 gap-y-5  rounded-md bg-richblack-800">
//                 <div className="flex flex-col gap-y-2 justify-start items-center ">

//                     <label htmlFor="dateOfBirth">Date of Birt</label>
//                     <input
//                         placeholder="dd/mm/yy"
//                         name="dateOfBirth"
//                         id="dateOfBirth"
//                         type="date"
//                         className="bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"
                       
//                     />

//                 </div>

//                 <div className="flex flex-col gap-y-2 justify-start items-center ">

//                     <label htmlFor="gender">Gender</label>
//                     <select
//                         placeholder="Select your gender"
//                         name="gender"
//                         id="gender"
//                         className="bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"

                        

//                     >
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="Other">Other</option>
//                         <option value="prefer not to say">Prefer Not To Say</option>

//                     </select>
//                 </div>
//             </div>

//             <div  className="flex flex-row items-center justify-between gap-x-3 gap-y-5  rounded-md bg-richblack-800">
//                 <div>
//                     <label>Contact  Number</label>
//                     <input
//                     type="tel"
//                     className="bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"
//                     placeholder="Enter Contact Number"

//                     />
//                 </div>
//                 <div>
//                     <label>About</label>
//                     <input
//                     type="text"
//                     className="bg-richblack-700 border-b rounded-md border-b-richblack-600 p-2"
//                     />
//                 </div>
//             </div>

            

//         </form>
//     )
// }

// export default EditProfile