import "../../css/registration.css"

import Navbar2 from "../../components/Navbar2.jsx";
import Footer1 from "../../components/Footer1"

import image from "../../assets/images/party-registration.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

function PartyRegPage() {
  // Show and hide password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar2></Navbar2>

      {/* Registration Section */}
      <div className="registration-container margin-10">
        {/* Left Container */}
        <div className="reg-left-container">
          <h1 className="font-mont">Register to Join Our Platform Today!</h1>

          <p className="mt-3">Stay informed and engaged with the democratic process by registering
            to join our "Election Commission" platform! Our innovative service
            offers real-time updates on election results, voter registration
            assistance, and comprehensive information about candidates and their policies.
          </p>

          <img src={image} className="img-fluid" width="320px" alt="" />
        </div>

        {/* Right Container */}
        <div className="reg-right-container">
          <h1 className="font-mont">Party Registration</h1>

          <form action="">
            {/* Party Name */}
            <div className="form-group mb-3">
              <label htmlFor="party-name">Party Name</label>
              <input type="text" className="form-control" id="party-name" placeholder="Enter Party Name" />
            </div>

            {/* Objective */}
            <div className="form-group mb-3">
              <label htmlFor="objective">Party Objective</label>
              <textarea className="form-control" id="party-objective" placeholder="Enter Party Objective" rows="5" />
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter Email of Party" />
            </div>

            {/* Password */}
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle-btn"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Bottom Section */}
            <button className="btn btn-blue col-12" type="button">Register</button>
            <p className="mb-0 mt-1 text-center">Already have an account? <Link className="blue-link" to="/party-login">Login</Link></p>
          </form>
        </div>
      </div>

      <Footer1></Footer1>
    </div>
  )
}

export default PartyRegPage;