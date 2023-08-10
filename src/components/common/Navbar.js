import React from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from "react-router-dom"
import {toast} from "react-hot-toast"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { categories } from '../../services/apis'
import { useState, useEffect } from 'react'
import { apiConnector } from '../../services/apiConnector'
import {SlArrowDown} from 'react-icons/sl'
import {ACCOUNT_TYPE} from "../../utils/constants"

const subLinks = [
  {
    title:"python",
    link:"/catalog/python"
  },
  {
    title:"web dev",
    link:"/catalog/web-development"
  },
];

const Navbar = (props) => {

  const {token} = useSelector( (state) => state.auth );
  const {user} = useSelector ( (state) => state.profile );
  const {totalItems} = useSelector ( (state) => state.cart );
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  
  const fetchSublinks = async() => {
    try{
          const result = await apiConnector("GET", categories.CATEGORIES_API );
          console.log("Printing sublinks result: ", result);
          setSubLinks(result.data.data);
      }catch(err){
          console.log("Could not fetch the category list");
      }
  }

  useEffect( () => {
        fetchSublinks();
  }, [] )


  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname)
  }

  return (
    <div className="flex h-14 items-center justify-between lg:border-b-[1px] border-b-richblack-700">

      <div className='flex justify-between items-center w-11/12 max-w-maxContent py-4 mx-auto'>
        {/* logo */}
          <Link to="/">
            <img src={logo} alt="logo" width={160} height={42} loading='lazy'/>
            </Link>
            {/* Nav Links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25 '>
                  {
                    NavbarLinks.map( (link, index) => (
                      <li key={index}>
                        {
                          link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                              <p>{link.title}</p>
                              <SlArrowDown/>
                            
                              <div className='invisible absolute left-[50%] top-[50%] 
                              translate-x-[-50%] translate-y-[80%]
                              flex flex-col rounded-md
                              bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200
                              group-hover:visible group-hover:opacity-100 lg:w-[300px]'>

                              <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 
                              translate-x-[80%] translate-y-[-45%] 
                              rounded bg-richblack-5'> 
                              </div>

                              {
                                  subLinks.length ? (
                                          subLinks.map( (subLink, index) => (
                                            <Link to={`${subLink.link}`} key={index}>
                                              <p>{subLink.title}</p>
                                            </Link>
                                          ) )
                                  ) : (<div></div>)
                              }

                              </div>



                            </div>



                          ) : (
                            <Link to={link?.path}>

                              <p className={`${ (matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25") }`}>
                                {link.title}
                              </p>

                            </Link>
                          )
                        }
                      </li>

                     ) )
                  }
                    
                </ul>
            </nav>

            {/* Login - SignUp - LogOut - Dashboard */}
            <div className='flex items-center gap-x-4'>


              {
                user && user?.accountType != ACCOUNT_TYPE.INSTRUCTOR && (
                  <Link to="/dashboard/card" className='relative'>
                  <AiOutlineShoppingCart className='fill-white'/>
                  {
                    totalItems > 0 && (
                      <span >
                        {totalItems}
                      </span>
                    )
                  }
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to='/login'>

                    <button className=' border border-richblack-700 bg-richblack-800 lg:px-[12px] lg:py-[8px]
                     text-richblack-100  rounded-md'>
                        Log in
                    </button>
                  
                  </Link>
                )
              }
              {
                token === null && (
                  <Link to='/signup'>

                    <button className=' border border-richblack-700 bg-richblack-800 lg:px-[12px] lg:py-[8px]
                     text-richblack-100  rounded-md'>
                      Sign Up
                    </button>
                  </Link>
                )
              }
              {
                token !== null && <ProfileDropDown/>
              }

            </div> 
      </div>
    </div>
  ) 
}

export default Navbar