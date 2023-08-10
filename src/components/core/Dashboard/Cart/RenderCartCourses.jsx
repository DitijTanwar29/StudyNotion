import React from "react"
import ReactStars from "react-rating-stars-component";
import {BsStar} from "react-icons/bs"
import { useDispatch } from "react-redux";
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from "../../../../slices/cartSlice";
import { useSelector } from "react-redux";

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    return (
        <div>
            {
                cart.map((course, index) => (
                    <div>
                        <div>
                            <img src={course?.thumbnail}/>
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>
                                    {/* onnect get avg rating api here */}
                                    <span>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<BsStar/>}
                                        fullIcon={<BsStar/>}
                                    />

                                    <span>{course?.ratingAndReviews?.length} Ratings</span>
                                    
                                </div>
                            </div>
                        </div>

                        <button
                        onClick={() => dispatch(removeFromCart(course._id))}
                        
                        >
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                        </button>

                        <p>Rs {course?.price} </p>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses