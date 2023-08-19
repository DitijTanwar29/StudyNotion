import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {RxDropdownMenu} from "react-icons/rx"
import {RiEdit2Fill} from "react-icons/ri"
import {RiDeleteBin6Line} from "react-icons/ri"
import {BiDownArrow} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"
import SubSectionModal from "./SubSectionModal"
import {deleteSection, deleteSubSection} from "../../../../../services/operations/courseDetailsAPI"
import {setCourse} from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"

const NestedView = ({handleChangeEditSectionName}) => {
    const {course} = useSelector((state) =>  state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    // useEffect(() => (
    //     console.log("Rendering it again")
    // ))
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,},
            token
        );

        if(result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection(subSectionId, sectionId, token);
        if(result) {
            // TODO: or kya extra kr skte h yaha pr
            const updatedCourseContent = course.courseContent.map((section) => 
            section._id === sectionId ? result : section);
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }
    return(
        <div className="">

            <div className=" bg-richblack-600 rounded-md mt-1 p-2">
                {course?.courseContent?.map((section) => (
                <details key={section._id} open>
                    
                    <summary className="flex items-center justify-between gap-x-3 border-b-2">
                        <div>
                            <RxDropdownMenu />
                            <p className="text-white">{section.sectionName}</p>
                        </div>
                        <div className="flex items-center gap-x-3">
                            <button
                            onClick={()=>handleChangeEditSectionName(section._id, section.sectionName)}>
                                <RiEdit2Fill/>
                            </button>

                            <button
                            onClick={() => {
                                setConfirmationModal({
                                    text1:"Delete this Section",
                                    text2:"All the lectures in this section will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmationModal(null),
                                })
                            }}>
                                <RiDeleteBin6Line/>
                            </button>
                            <span>|</span>
                            <BiDownArrow className={`text-richblack-300 text-xl`}/>
                        </div>
                    </summary>

                    <div>
                        {
                            section.subSection.map((data) => (
                                <div 
                                key={data?._id}
                                onClick={() => setViewSubSection(data)}
                                className="flex items-center justify-between gap-x-3 border-b-2"
                                >
                                    <div>
                                        <RxDropdownMenu />
                                        <p className="text-white">{data.title}</p>
                                    </div>

                                    <div
                                    className="flex items-center gap-x-3"
                                    >
                                        <button
                                        onClick={() => setEditSubSection({...data, sectionId:section._id})}
                                        >
                                            <RiEdit2Fill/>
                                        </button>

                                        <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1:"Delete this Sub Section",
                                                text2:"selected lecture will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                            })
                                        }}>
                                            <RiDeleteBin6Line/>
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                        <button
                        onClick={() => setAddSubSection(section._id)}
                        className="mt-4 flex items-center gap-x-2 text-yellow-50">
                            <AiOutlinePlus/>
                            <p>Add lecture</p>
                        </button>
                    </div>

                </details>

                ))}
            </div>

            {
                addSubSection ? 
                (<SubSectionModal
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                    add={true}
                />) 
                : viewSubSection ? 
                (<SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />) 
                : editSubSection ? 
                (<SubSectionModal
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                    edit={true}
                />) 
                : (<div></div>)
            }

            {
                confirmationModal ? 

                (
                    <ConfirmationModal modalData={confirmationModal}/>
                )
                :
                (<div></div>)
            }
            
        </div>
    )
}

export default NestedView










