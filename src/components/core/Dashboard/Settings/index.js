import React from "react"
import ChangeProfilePic from "./ChangeProfilePic"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"
const Settings = () => {

    return (
        <div className="mb-14 text-3xl font-medium text-richblack-5">
            
            {/* Heading */}
            <h1>Edit profile</h1>
                
            {/* Section 1 */}
                <ChangeProfilePic/>
            {/* Section 2 */}
                <EditProfile/>
            {/* Section 3 */}
                <UpdatePassword/>
            {/* Section 4 */}
                <DeleteAccount/>
        </div>
    )
}

export default Settings