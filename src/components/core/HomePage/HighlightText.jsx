import React from "react" 

export const HighlightText = ({text}) => {

    return(
        <span className="font-bold text-center text-4xl 
         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        {" "}
            {text}
        </span>
    )
}

export default HighlightText