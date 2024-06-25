import "../../css/registration.css"

import Navbar1 from "../../components/Navbar1";
import Footer1 from "../../components/Footer1"

import image from "../../assets/images/candidate-registration.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

function CandidateRegPage() {
  // Show and hide password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar1></Navbar1>

      {/* Registration Section */}
      <div className="registration-container margin-10">
        {/* Left Container */}
        <div className="reg-left-container">
          <h1 className="font-mont">Register as a Candidate!</h1>

          <img src={image} className="img-fluid" width="320px" alt="" />
        </div>

        {/* Right Container */}
        <div className="reg-right-container">
          <h1 className="font-mont">Candidate Registration</h1>

          <form action="">
            {/* Party Name */}
            <div className="form-group mb-3">
              <label htmlFor="voter-id">Voter-Id</label>
              <input type="text" className="form-control" id="voter-id" placeholder="Enter Voter-Id" />
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
            <p className="mb-1 mt-2 text-center">Don't have a Voter-Id? <Link className="blue-link" to="/voter-reg">Register as a voter first</Link></p>
            <button className="btn btn-blue col-12" type="button">Register</button>
            <p className="mb-0 mt-1 text-center">Already have an account? <Link className="blue-link" to="/candidate-login">Login</Link></p>
          </form>
        </div>
      </div>

      <Footer1></Footer1>
    </div>
  )
}

export default CandidateRegPage;