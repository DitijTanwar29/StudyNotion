import React from "react"
import {HiChatBubbleLeftRight} from "react-icons/hi2"
import {BsGlobeCentralSouthAsia} from "react-icons/bs"
import {FaPhone} from "react-icons/fa"

const ContactDetails = () => {
    const contactDetails = [
        {
            id:1,
            icon:<HiChatBubbleLeftRight/>,
            heading:"Chat on us",
            description:"Our friendly team is here to help ",
            details:"@mail address"
        },
        {
            id:2,
            icon:<BsGlobeCentralSouthAsia/>,
            heading:"Visit us",
            description:"Come and say hello at our office HQ.",
            details:"Here is the location/ address"
        },
        {
            id:3,
            icon:<FaPhone/>,
            heading:"Call us",
            description:"Mon - Fri From 8am to 5pm",
            details:"+123 456 7890"
        },
    ]
    return (
        <div className="bg-richblack-700 rounded-md flex flex-col justify-between items-center gap-3">
            {
                contactDetails.map( (element) => {
                    return (
                        <div className="flex flex-col gap-5 p-3 text-sm text-richblack-200 ">
                            <div className="flex flex-row items-center justify-between gap-2 " key={element.id}>
                                <div className="w-[20%]">
                                    {element.icon}
                                </div> 
                                <div className="w-[70%]">
                                    {element.heading}
                                </div>
                        </div>
                            <p>{element.description}</p>
                            <p>{element.details}</p>
                        </div>
                    )
                })
    
            }
        </div>
    )
}

export default ContactDetails