import React from 'react'
import frameImage from "../../../assets/Images/frame.png"
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import {FcGoogle} from "react-icons/fc"
import { useSelector } from 'react-redux'

const Template = ({title, desc1, desc2, image, formtype}) => {
    const { loading } = useSelector((state) => state.auth)
    
  return (
    <div >
        {loading ? (
            <div className='spinner'></div>
        ) : (

            <div className="flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 ">
                
                <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <h1
                    className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]"
                    >
                        {title}
                    </h1>

                    <p className="text-[1.125rem] leading-[1.625] mt-4">
                        <span className="text-richblack-100">{desc1}</span>
                        <br/>
                        <span className="font-edu-sa font-bold italic  text-blue-100 ">{desc2}</span>
                    </p>
                    
                    {formtype ==="signup" ? 
                    (<SignupForm/>):
                    (<LoginForm/>)} 
                </div>

                <div className="relative w-11/12 max-w-[450px]">
                    <img src={frameImage}
                        alt="pattern"
                        width={558}
                        height={504}
                        loading='lazy'/>

                    <img src={image}
                        alt="students"
                        width={558}
                        height={490}
                        loading='lazy'
                        className="absolute -top-4 right-4"
                        />
                </div>

            </div>
            
        )}
    </div>
  )
}

export default Template