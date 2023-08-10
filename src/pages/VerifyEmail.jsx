import React, { useEffect, useState } from "react"
import OTPInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux"
import { sendotp, signup } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, signupData} = useSelector( (state) => state.auth);

    useEffect ( () => {
        if(!signupData) {
            navigate("/signup");
        }
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,

        } = signupData
        dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

    return(
        <div className="text-white flex justify-center items-center ">
            {
                loading 
                ? (<div className="custom-loader"/>) 
                : (
                    <div>
                        <h1>Verify Email</h1>
                        <p>A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={handleOnSubmit}>
                             <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} 
                                className=" bg-richblack-800 "/>}
                                

                             
                            />
                            <button type='submit'>
                                Verify Email
                            </button>
                        </form>

                        <div>
                            <div>
                                <Link to="/login">
                                    <p>Back to Login</p>
                                </Link>
                            </div>

                            <button
                            onClick={() => dispatch(sendotp(signupData.email, navigate))}
                            >
                                Resend it
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail