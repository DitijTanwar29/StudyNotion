import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import {MdKeyboardArrowDown} from "react-icons/md"
import countryCode from "../../../data/countrycode.json"
import { useDispatch } from 'react-redux'

import { sendotp } from '../../../services/operations/authAPI'
import { setSignupData } from '../../../slices/authSlice'
import  {ACCOUNT_TYPE}  from "../../../utils/constants"
import Tab from "../../common/Tab"

const SignupForm = ({formType}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:"",
        password:"",
        confirmPassword:"",
        
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confirmPassword, phoneNumber } = formData

    console.log(email);
    
    //Handling input fields, when some value changes
    function changeHandler(event) {
        
        setFormData( (prevData) => (
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )
    }

    function submitHandler(event){
        event.preventDefault();
        console.log("Fomr Data", formData);
        if(password !== confirmPassword){
            toast.error("Passwords do not match!")
            return;
        }

        const signupData = {
            ...formData,
            accountType,
        }

        //setting signup datat to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to the user for verification
        dispatch(sendotp(email, navigate))

        //Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber,
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    //data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

  return (
    <div>
    {/* student-Instructor tab */}
    <Tab tabData={tabData} field={accountType} setField={setAccountType} />
    {/* form */}
    <form onSubmit={submitHandler}  className="flex w-full flex-col gap-y-4">
    {/* first name and last name */}
    <div className='flex flex-row  gap-5'>
            <label>
                <p className='text-richblack-5 font-inter mb-1 text-[0.875rem] leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                <input
                    required
                    type="text"
                    name="firstName"
                    onChange={changeHandler}
                    placeholder='Enter First Name'
                    value={firstName}
                    className='bg-richblack-800 rounded-[0.5rem]
                     text-richblack-5 text-sm font-inter h-12 w-30 px-4 py-4 shadow-sm shadow-richblack-200'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    
                />
            </label>

            <label>
                <p className='text-richblack-5 font-inter mb-1 text-[0.875rem] leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                <input
                    required
                    type="text"
                    name="lastName"
                    onChange={changeHandler}
                    placeholder='Enter Last Name'
                    value={lastName}
                    className='bg-richblack-800 rounded-md text-richblack-200 text-sm font-inter h-12 w-30 px-4 py-4 shadow-sm shadow-richblack-200'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                />
            </label>
    </div>

    {/* Email Address */}
    <label>
        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-inter'>Email Address<sup className='text-pink-200'>*</sup></p>
        <input
            required
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder='Enter Email Address'
            value={email}
            className='w-[64%] bg-richblack-800 rounded-md text-richblack-5 text-sm font-inter h-12 w-30 px-4 py-4 shadow-sm shadow-richblack-200'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
        />
    </label>

    {/* Phone Number */}

            {/* <label >
                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 font-inter'>Phone Number<sup className='text-pink-200'>*</sup></p>

                    <div className='flex flex-row w-full gap-5'>
                        <div className='relative flex flex-row '>
                            
                            <input
                                required
                                
                                name="phoneNumber"
                                placeholder='+91 '
                                value={countryCode.code}
                                className=' bg-richblack-800 rounded-md text-richblack-200 text-sm font-inter h-12 w-[30%] px-4 py-4 shadow-sm shadow-richblack-200'

                            />
                            <MdKeyboardArrowDown className='text-richblack-200 cursor-pointer' />
                        </div>

                        <input
                            required 
                            name="phoneNumber"
                            placeholder='Enter Phone Number'
                            value={phoneNumber}
                            className='-translate-x-28 bg-richblack-800 rounded-md text-richblack-200 text-sm font-inter h-12 w-[50%] px-4 py-4 shadow-sm shadow-richblack-200'
                            type='text'
                        />
                    </div>                    
        
            </label> */}

        
         {/* create password and confirm password */}
         <div className='flex flex-row gap-5 mb-5'>
            <label >
                <p className='text-richblack-5 font-inter mb-1 text-[0.875rem] leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                <div className='flex flex-row justify-between relative'>

                    <input
                        required
                        type={showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        value={password}
                        className='absolute bg-richblack-800 rounded-md text-richblack-5 text-sm font-inter h-12 w-30 px-4 py-4 shadow-sm shadow-richblack-200'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                    />

                    <span onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword? (<AiOutlineEyeInvisible  className=' absolute translate-x-44 translate-y-4 ' fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye className='translate-x-44 translate-y-4  absolute' fontSize={24} fill="#AFB2BF"/>)}
                    </span>
                </div>
            </label>

            <label >
                <p className='text-richblack-5 font-inter translate-x-20 mb-1 text-[0.875rem] leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                
                <div className='flex flex-row
                justify-between items-center relative'>

                    <input
                        required
                        type={showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        className='bg-richblack-800 rounded-md text-richblack-5 text-sm font-inter h-12 w-30 px-4 py-4 shadow-sm ml-20 mt-12 shadow-richblack-200 absolute'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                    />
                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword? (<AiOutlineEyeInvisible className=' absolute translate-x-64 translate-y-4' fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye className='translate-x-64 translate-y-4 absolute' fontSize={24} fill="#AFB2BF"/>)}
                    </span>
                </div>

            </label>
        </div>

        <button 
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px]
         px-[12px] font-medium text-richblack-900"
         >
            <p>Create Account</p>
        </button>
    </form>

    </div>
  )
}

export default SignupForm