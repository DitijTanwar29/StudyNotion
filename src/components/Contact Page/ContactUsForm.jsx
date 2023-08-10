import React from "react"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();
    
    const submitContactForm = async (data) => {
        console.log("Logging Data",data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Loggging Response", response);
            setLoading(false);
        } catch(error) {
            console.log("Error", error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    }, [reset, isSubmitSuccessful]  );

    return (
        <form onSubmit={handleSubmit(submitContactForm)}>

        <div className="flex flex-col gap-14 w-[75%]">
                <div className="flex gap-5">
                    {/* firstName */}
                    <div className="flex flex-col">
                        <label htmlFor="firstname">First Name</label>
                        <input
                        type= 'text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className="text-black"
                        {...register("firstname", {required:true})}
                        />
                        {
                            errors.firstname && (
                                <span>
                                    Please enter your first name
                                </span>
                            )
                        }
                    </div>

                    {/* lastName */}
                    <div className="flex flex-col">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                        type= 'text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter last name'
                        className="text-black"
                        {...register("lastname", {required:true})}
                        />
                        {
                            errors.firstname && (
                                <span>
                                    Please enter your last name
                                </span>
                            )
                        }
                    </div>

                    
                </div>

                {   /* email */}
                <div className="flex flex-col">
                    <label htmlFor="email">Email Address</label>
                    <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Enter email address"
                    {...register('email', {required:true})}
                    className="text-black"
                    />
                    {
                        errors.email && (
                            <span>
                                Enter your email address
                            </span>
                        )
                    }
                </div>

                {/* phoneNo */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phonenumber">Phone Number</label>
                        <div className="flex flex-row gap-5">
                            {/* drop down */}
                           
                                <select
                                    name="dropdown"
                                    id="dropdown"
                                    {...register("countrycode",{required:true})}
                                    className="flex w-[15%] text-black"
                                >
                                    {
                                        CountryCode.map( (element, index) => {
                                            return (
                                                <option key={index} value={element.code}> 
                                                    {element.code}-{element.country}
                                                </option>
                                            )
                                        } )
                                    }
                                </select>
                            

                                <input
                                name="phonenumber"
                                type="number"
                                id="phonenumber"
                                placeholder="12345 67890"
                                className="text-black w-[80%]"
                                {...register("phoneNo", 
                                {
                                    required:{value:true, message:"Please Enter Phone Number"},
                                    maxLength:{value:10, message:"Invalid Phone Number"},
                                    minLength:{value:8, message:"Invalid Phone Number"}
                                })}
                                
                                />
                            
                        </div>
                        {
                            errors.phoneNo && (
                                <span>
                                    {errors.phoneNo.message}
                                </span>
                            )
                        }
                    </div>
                {/* message */}
                <div className="flex flex-col">
                    <label htmlFor="message">Message</label>
                    <textarea
                    name="message"
                    id="message"
                    cols={30}
                    rows={7}
                    placeholder="Enter your message here"
                    {...register("message", {required:true})}
                    className="text-black"
                    />
                    {
                        errors.message && (
                            <span>
                                Please enter your message.
                            </span>
                        )
                    }
                </div>
            <button type="submit"
            className="rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black "
            >
                    Send Message
            </button>
        </div>

        </form>
    )
}

export default ContactUsForm