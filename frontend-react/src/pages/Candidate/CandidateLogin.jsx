import "../../css/registration.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar2 from "../../components/Navbar2.jsx";

import image from "../../assets/images/candidate-login.png";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import candidateService from "../../services/candidate.service.js";

import { toast } from "react-toastify";

function CandidateLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const loginDto = { email, password };
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await candidateService.login(loginDto);

      if (response.data === "fail") toast.error("Invalid credentials. Please check your credentials.");
      
      else {
        const candidate = response.data;

        sessionStorage.setItem("id", candidate.candidateId);
        sessionStorage.setItem("role", "candidate");
        sessionStorage.setItem("fullname", candidate.voterId.fullName);
        sessionStorage.setItem("email", candidate.voterId.email);
        sessionStorage.setItem("isIndependent", candidate.independent);

        const isRejected = candidate.rejected;

        // for newly registered candidates
        if (candidate.constituency === null) {
          sessionStorage.setItem("constituencyName", "Not Known");
          sessionStorage.setItem("status", "Nomination form yet to be filled");
          sessionStorage.setItem("partyName", "Not Known");
        } else {
          // if independent
          if (candidate.independent === true) {
            sessionStorage.setItem("partyName", "Independent Candidate");
            sessionStorage.setItem("status", "Not Applicable");
            sessionStorage.setItem(
              "constituencyId",
              candidate.constituency.districtId
            );
            sessionStorage.setItem(
              "constituencyName",
              candidate.constituency.districtName
            );
          }
          // if standing from a party
          else {
            sessionStorage.setItem("partyId", candidate.party.partyId);
            sessionStorage.setItem("partyName", candidate.party.partyName);
            sessionStorage.setItem(
              "constituencyId",
              candidate.constituency.districtId
            );
            sessionStorage.setItem(
              "constituencyName",
              candidate.constituency.districtName
            );
            if (candidate.accepted === true)
              sessionStorage.setItem("status", "Accepted");
            else if (candidate.rejected === true)
              sessionStorage.setItem("status", "Rejected");
            else sessionStorage.setItem("status", "Pending");
          }
        }

        navigate("/candidate/home");
        toast.success(`Welcome back ${sessionStorage.getItem("fullname")}!`);
      }
    } catch (err) {
      toast.error("Oops! Something went wrong on our end. Please try again later.")
    }
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
          <h1 className="font-mont">Candidate Login</h1>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="form-group mb-3">
              <label htmlFor="username">Email or Mobile No</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
            <button className="btn btn-blue col-12" type="submit">
              Login
            </button>
            <p className="mb-0 mt-1 text-center">
              Don't have an account?
              <Link className="blue-link" to="/candidate/registration">
                Register
              </Link>
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>

      <Footer1></Footer1>
    </div>
  );
}

export default CandidateLoginPage;
