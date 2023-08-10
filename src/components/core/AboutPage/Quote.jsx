import React from "react"
import HighlightText from "../HomePage/HighlightText"

const Quote = () => {
    return(
        <div className="text-4xl text-richblack-100">
            "We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighlightText text={"combines technology"}/>
            <span className=" font-semibold bg-gradient-to-t from-[#EA580C] to-[#F97316] bg-clip-text text-transparent ">
                {" "}
                expertise
            </span>
            , and community to create an 
            <span className=" font-semibold bg-gradient-to-t from-[#FB923C] via-[#F97316] to-yellow-300 bg-clip-text text-transparent ">
                {" "}unparalleled educational experience.
            </span>
            "
        </div>
    )
}

export default Quote
