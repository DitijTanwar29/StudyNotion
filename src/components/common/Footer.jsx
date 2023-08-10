import React from "react"
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {BsFacebook} from "react-icons/bs"
import {AiFillGoogleCircle, AiOutlineTwitter, AiFillYoutube} from "react-icons/ai"
const Footer = () => {
    return (
        <div className="w-full max-w-11/12 h-[728px] bg-richblack-800 mx-auto">
        <div className=" max-w-maxContent h-full
        flex flex-row items-center justify-evenly text-richblack-400 font-inter gap-y-10
         mt-15">
        <div>
            <img src={logo}/>
            <p className="text-richblack-100 font-semibold gap-y-30">Company</p>
            <div className="text-sm ">
                <p>About</p>
                <p>Careers</p>
                <p>Affilites</p>
            </div>
            <div className="flex flex-row gap-5 justify-start items-center">
                <BsFacebook className="text-richblack-400 "/>
                <AiFillGoogleCircle className="text-richblack-400 w-[19.5px] h-[19.5px]"/>
                <AiOutlineTwitter className="text-richblack-400 w-[19.5px] h-[19.5px]"/>
                <AiFillYoutube className="text-richblack-400 w-[19.5px] h-[19.5px]"/>
            </div>

        </div>

        <div>
            
            <p className="text-richblack-100 font-semibold flex flex-col">Resources</p>
            <div className="text-sm ">
                <p>Articles</p>
                <p>Blog</p>
                <p>Chart Sheet</p>
                <p>Code challenges</p>
                <p>Docs</p>
                <p>Projects</p>
                <p>Videos</p>
                <p>Workspaces</p>
            </div>
            <div>
                <p className="text-richblack-100 font-semibold flex flex-col mt-10">Support</p>
                <p className="text-sm ">Help Center</p>
            </div>
            

        </div>

        <div>
            
            <p className="text-richblack-100 font-semibold ">Plans</p>
            <div className="text-sm ">
                <p>Paid membership</p>
                <p>For students</p>
                <p>Business solutions</p>
                
            </div>
            <div>
                <p className="text-richblack-100 font-semibold flex flex-col mt-10">Community</p>
                <div className="text-sm ">
                    <p>Forums</p>
                    <p>Chapters</p>
                    <p>Events</p>

                </div>
                
            </div>
            
        </div>

        <div className="w-[2px] h-[80%] bg-richblack-700"></div>


        <div>

        <p className="text-richblack-100 font-semibold">Subjects</p>
        <div className="text-sm ">
            <p>AI</p>
            <p>Cloud Computing</p>
            <p>Code Foundations</p>
            <p>Computer Science</p>


        </div>
                        
        </div>
        


        </div>

        </div>
    )
}

export default Footer;
