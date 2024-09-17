import "../../css/registration.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar2 from "../../components/Navbar2.jsx";

import image from "../../assets/images/image-for-loginpage.png";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import voterService from "../../services/voter.service";

function VoterLoginPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const loginDto = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await voterService.login(loginDto);
      if (response.data === "fail") {
        toast.error("Login failed. Please check your credentials.");
      } else {
        const voter = response.data;
        console.log(response.data);
        sessionStorage.setItem("jwt", voter.jwt);
        sessionStorage.setItem("id", voter.user.userId);
        sessionStorage.setItem("role", "voter");
        sessionStorage.setItem("districtId", voter.user.districtId.districtId);
        sessionStorage.setItem("dob", voter.user.dob);
        sessionStorage.setItem("email", voter.user.email);
        sessionStorage.setItem("fullname", voter.user.name);
        sessionStorage.setItem("gender", voter.user.gender ? "Male" : "Female");
        sessionStorage.setItem("mobileNo", voter.user.mobileNo);
        sessionStorage.setItem("isVoted", voter.user.voted);
        sessionStorage.setItem(
          "stateName",
          voter.user.districtId.stateId.stateName
        );
        sessionStorage.setItem(
          "districtName",
          voter.user.districtId.districtName
        );
        toast.success("Welcome " + sessionStorage.getItem("fullname") + " !");
        navigate("/voter/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar2 />

      <div className="registration-container margin-10">
        {/* Left Container */}
        <div className="reg-left-container">
          <h1 className="font-mont">Welcome Back!</h1>
          <img src={image} className="img-fluid" width="320px" alt="" />
        </div>

        {/* Right Container */}
        <div className="reg-right-container">
          <h1 className="font-mont">Voter Login</h1>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="form-group mb-3">
              <label htmlFor="username">Email or Voter-Id</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Email or Voter-Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>

              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Enter Password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle-btn"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Bottom Section */}
            <button type="submit" className="btn btn-blue col-12">
              Login
            </button>
          </form>
          <p className="mb-0 mt-1 text-center">
            Don't have an account?{" "}
            <Link className="blue-link" to="/voter/registration">
              Register
            </Link>
          </p>
        </div>
      </div>
      <Footer1 />
    </div>
  );
}

export default VoterLoginPage;
