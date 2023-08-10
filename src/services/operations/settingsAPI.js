import {settingsEndpoints} from "../apis"
import { apiConnector } from "../apiConnector"
import { setLoading } from "../../slices/authSlice"
import { toast } from "react-hot-toast"
import {logout} from "./authAPI"
import { setUser } from "../../slices/profileSlice"
 
const {UPDATE_DISPLAY_PICTURE_API,
        UPDATE_PROFILE_API,
        CHANGE_PASSWORD_API,
        DELETE_PROFILE_API,
    } = settingsEndpoints



export async function updateProfilePicture (token, formData) {

    return async (dispatch) => {

            setLoading(true)

        try {

            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )
            
            console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE....................", response)
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Image Updated Successfully")
            dispatch(setUser(response.data.data))
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API......................... Error", error)

        }
        setLoading(false)

    }
    
}


export async function updateProfile (token, formData) {
    return async (dispatch) => {
        setLoading(true)
        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData,
            {
                Authorization: `Bearer ${token}`,
            })

            console.log("UPDATE_PROFILE_API RESPONSE................", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            const userImage = response.data.updateUserDetails.image
            ? response.data.updateUserDetails.image
            : `https:api.dicebear.com/5.x/initials/svg?seed=${response.data.updateUserDetails.firstName} ${response.data.updateUserDetails.lastName}`
            dispatch(
                setUser({...response.data.updateUserDetails, image: userImage})
            )
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............",error)
            toast.error("Could Not Update Profile")
        }
        setLoading(false)
    }
}

export async function changePassword(token, formData) {
    setLoading(true)
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    setLoading(false)
}

export function deleteProfile(token, navigate) {
    return async (dispatch) => {
      setLoading(true)
      try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      setLoading(false)
    }
}