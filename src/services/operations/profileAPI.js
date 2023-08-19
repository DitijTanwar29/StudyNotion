import {toast} from "react-hot-toast"
import {setLoading, setUser} from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"
import { useDispatch } from "react-redux"

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints


export async function getUserEnrolledCourses (token) {

    // const toastId = toast.loading("loading")
    setLoading(true)
    let result = []
    try{
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API, null,
        {
            Authorization: `Bearer ${token}`, 
        })

        console.log("Printing response of Get_User_Enrolled_Courses_Api api.........", response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data;

    } catch (error) {
        console.log("getUserEnrolledCourses API ERROR......", error)
            toast.error("Unable to fetch user Enrolled Courses data")
    }
    setLoading(false)
    return result

}