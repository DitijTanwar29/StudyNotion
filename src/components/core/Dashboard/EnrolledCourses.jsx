import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"; 


import {getUserEnrolledCourses} from "../../../services/operations/profileAPI"


const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch{
            console.log("Unable to fetch enrolled courses");
        }
    }
    useEffect( () => {
        getEnrolledCourses();
    }, []);

    return (
        <div className="text-white">

            <div>Enrolled Courses</div>
            {
                !enrolledCourses ? (
                    <div className="custom-loader"></div>
                ) 
                : !enrolledCourses.length ? ("You have not enrolled in any course yet")
                : (
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>
                       {/* Card shuru hota h ab */}
                       {
                        enrolledCourses.map( (course, index) => (
                            <div>
                                <div>
                                    <img src={course.thumbnail}/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height="8px"
                                        isLabelVisible={false}                           
                                    />
                                </div>
                            </div>
                        ))
                       }
                    </div>
                )
            }
        </div>
    )
}

export default EnrolledCourses