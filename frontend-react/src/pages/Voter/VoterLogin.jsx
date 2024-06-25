import "../../css/registration.css"

import Footer1 from "../../components/Footer1.jsx";
import Navbar2 from "../../components/Navbar2.jsx";

import image from "../../assets/images/image-for-loginpage.png";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

function VoterLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Navbar2></Navbar2>

      <div className="registration-container margin-10">
        {/* Left Container */}
        <div className="reg-left-container">
          <h1 className="font-mont">Welcome Back!</h1>
          <img src={image} className="img-fluid" width="320px" alt="" />
        </div>

        {/* Right Container */}
        <div className="reg-right-container">
          <h1 className="font-mont">Voter Login</h1>

          <form action="">
            {/* Username */}
            <div className="form-group mb-3">
              <label htmlFor="username">Email or Voter-Id</label>
              <input type="text" className="form-control" id="username" placeholder="Enter Email or Voter-Id" />
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
            <button className="btn btn-blue col-12" type="button">Login</button>
            <p className="mb-0 mt-1 text-center">Don't have an account? <Link className="blue-link" to="/voter-reg">Register</Link></p>
          </form>
        </div>

      </div>

      <Footer1></Footer1>
    </div>
  );
}

export default VoterLoginPage;
