import React from "react"
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { useState } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import OpenRoute from "./components/core/Auth/OpenRoute"
import Error from "./pages/Error"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import Settings from "./components/core/Dashboard/Settings";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";


function App() {

 const {user} = useSelector((state) => state.profile);
 
  return (
  <div className="w-screen min-h-screen  bg-richblack-900 flex flex-col font-inter z-0">
    <Navbar/>
  <Routes>

    <Route path="/" element={<OpenRoute><Home/></OpenRoute>} />
    <Route path="/login" element={<OpenRoute><Login  /></OpenRoute>} />
    <Route path="/signup" element={<OpenRoute><Signup  /></OpenRoute>} />
    <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>} />
    <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword/></OpenRoute>} />
    <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>} />
    <Route path="/about" element={<OpenRoute><About/></OpenRoute>}/>
    <Route path="/contact" element={<OpenRoute><Contact/></OpenRoute>}/>
    <Route element={<PrivateRoute><Dashboard/></PrivateRoute>} >
    
      <Route path="/dashboard/my-profile" element={<MyProfile/>} />
      <Route path="/dashboard/Settings" element={<Settings/>} />
      
      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>} />
            <Route path="/dashboard/cart" element={<Cart/>} />

          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route path="dashboard/add-course" element={<AddCourse/>}/>
          </>
        )
      }
    
    </Route>
    <Route path="*" element={<Error/>}/>
  </Routes>

  </div>
  )
}

export default App;


