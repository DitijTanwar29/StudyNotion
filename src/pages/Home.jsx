import React from "react"
import { Link } from "react-router-dom"
import {FaArrowRight} from "react-icons/fa"
import {HighlightText} from "../components/core/HomePage/HighlightText"
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import whitebg from "../assets/Images/whitebg.jpg"
import TimelineSection  from "../components/core/HomePage/TimelineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import Footer from "../components/common/Footer"

const Home = () => {
    return (
        <div>
            {/* Section 1 */}
            <div className=" flex flex-col w-11/12 mx-auto items-center text-white 
            justify-between bg-richblack-900  ">

            <Link to="/signup">
                <div className="group mt-14 p-1 mx-auto rounded-full bg-richblack-800 font-bold 
                text-richblack-200 transition-all duration-200 hover:scale-95 w-fit 
                shadow-lg shadow-blue-600/40">
                    <div className="flex flex-row items-center gap- rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className="text-center text-4xl font-semibold mt-7">
                Empower Your Future with 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className="mt-4 w-[75%] text-center text-md font-bold text-richblack-300">
                With our online coding courses, you can learn at your own pace, 
                from anywhere in the world, and get access to a wealth of resources,
                 including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className="flex flex-row mt-8 gap-7">
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                     Book a Demo
                </CTAButton>
            </div>
          
         
            <div className=" mx-3 my-12 w-[90%] shadow-lg shadow-blue-200 z-30">
                <video 
                muted
                loop
                autoPlay
                >
                    <source src={Banner}/>

                </video>

                {/* gradient
                <div className="absolute lg:h-[655px] opacity-40 lg:w-[1100px] blur-xl bg-gradient-to-b 
                        from-[#81ecec] via-[#00cec9] to-[#0984e3]  z-10 -translate-y-[99%] rounded-full">

                </div> */}

            </div>

        

            {/* Code Section 1 */}

            <div>
                
                <div >
                    <CodeBlocks
                    position={"flex-row"}
                    heading={
                        <div className="text-4xl font-semibold">
                            Unlock Your
                            <HighlightText text={"coding potential"}/>
                        {" "} with our online courses.
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    
                    ctabtn1={
                        {
                            btnText:"Try it Yourself",
                            linkto:"/signup",
                            active:true,
                        }
                    }

                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false,
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n/nav>`}
                    codeColor={"bg-gradient-to-r from-richblue-200 via-purple-900 to-pink-500 text-transparent bg-clip-text"}
                    // backgroundGradient = {{first:#81ecec, second :#00cec9, third:#0984e3}}
                    
                    // className="z-30"
                     
                    />
                    <div className={`absolute lg:h-[255px] opacity-40 lg:w-[312px] z-11 blur-xl bg-gradient-to-b 
                        from-[#ffbf00] via-[#ffbf00] to-[#ffbf00] translate-x-8 translate-y-28
                         opacity-4  rounded-full`}></div>
                </div>

                {/* Gradient  */}
                {/* {gradientColor.first} ="blue-900"
                {gradientColor.second} ="gray-900"
                {gradientColor.third} ="grey-800" */}


                

            </div>


            {/* Code Section 2 */}
            <div>
                <CodeBlocks
                position={"flex-row-reverse"}
                heading={
                    <div className="text-4xl font-semibold">
                        Start
                        <HighlightText text={"coding in seconds"}/>
                       {" "} 
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                
                ctabtn1={
                    {
                        btnText:"Continue Lesson",
                        linkto:"/signup",
                        active:true,
                    }
                }

                ctabtn2={
                    {
                        btnText:"Learn More",
                        linkto:"/login",
                        active:false,
                    }
                }

                codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><link rel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a>\n/nav>`}
                codeColor={"bg-gradient-to-r from-richblue-200 via-purple-500 to-pink-500 text-transparent bg-clip-text"}

                />
            </div>

            <ExploreMore/>


            </div>
            {/* Section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                    <div className="homepage_bg h-[310px]">
                        
                        <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto">
                                <div className="h-[150px]"></div>
                            <div className="flex flex-row gap-7 text-white">

                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className="flex gap-3 items-center">
                                        Explore Full Catalog
                                        <FaArrowRight/>
                                    </div>
                                </CTAButton>

                                <CTAButton active={false} linkto={"/signup"}>
                                    <div>
                                        Learn More
                                    </div>
                                </CTAButton>

                            </div>

                        </div>

                    </div>

                    <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between
                    gap-7">

                        <div className="flex flex-row gap-5 mb-10 mt-[95px]">
                            <div className="text-4xl font-semibold w-[45%]">
                                Get the skills you need for a
                                <HighlightText text={"job that is in demand"}/>
                            </div>


                            <div className="flex flex-col gap-10 w-[40%] items-start">
                                <div className="text-[16px]">
                                The modern StudyNotion is the dictates its own terms. Today,
                                to be a competitive specialist requires more than professional skills.
                                </div>
                                <CTAButton active={true} linkto={"/signup"} >
                                    <div>
                                        Learn More
                                    </div>
                                </CTAButton>
                            </div>


                        </div>
                        <TimelineSection/>

                         <LearningLanguageSection/>


                    </div>


                    


            </div>


            {/* Section 3 */}

            <div className="w-11/12 flex flex-col mx-auto max-w-maxContent items-center justify-between gap-8
            bg-richblack-900 text-white first-letter">
                

                <InstructorSection/>

                <h2 className=" text-center text-4xl font-semibold mt-10">Reviews from other learners</h2>
                
                {/* Review slider here */}
                

            </div>

            {/* Footer */}
            <Footer/> 
        </div>
    )
}

export default Home