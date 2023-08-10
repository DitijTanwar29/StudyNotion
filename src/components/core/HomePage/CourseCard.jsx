import React from "react"


const CourseCard = ({key, cardData, currentCard, setCurrentCard}) => {

    key = key
    cardData = cardData
    currentCard = currentCard
    setCurrentCard = setCurrentCard

    return (
        
// if() 

        <div className={` ${currentCard===cardData ? "bg-white shadow-lg shadow-yellow-100 ":"bg-richblack-800 shadow-lg shadow-yellow-100" } 
        w-[33%] lg:h-[250px] lg:flex lg:flex-col -translate-x-80 -translate-y-40 text-white 
        px-5 py-5`}
        
        >
        
            <h2  className="text-semibold text-xl font-inter text-richblack-800">{cardData.heading}</h2>
 
            <p className="text-richblack-500 font-inter text-md">{cardData.description}</p>


            <div className="flex flex-row justify-between w-full">
                
                    <div className="text-md font-inter align-center text-blue-500">{cardData.level}</div>
                    <div className="text-md font-inter align-center text-blue-500">{cardData.lessionNumber}</div>
                
            </div>
            


        </div>
    )
}

export default CourseCard