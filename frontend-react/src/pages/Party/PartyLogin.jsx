import "../../css/registration.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar2 from "../../components/Navbar2.jsx";

import image from "../../assets/images/party-login.png";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import partyService from "../../services/party.service";

function PartyLoginPage() {
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
      const response = await partyService.login(loginDto);
      if (response.data === "fail") {
        console.error("Login failed");
        setError("Login failed. Please check your credentials.");
      } else {
        const party = response.data;

        sessionStorage.setItem("role", "party");
        sessionStorage.setItem("id", party.partyId);
        sessionStorage.setItem("fullname", party.partyName);
        sessionStorage.setItem("email", party.email);
        navigate("/party/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
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
          <h1 className="font-mont">Party Login</h1>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="form-group mb-3">
              <label htmlFor="username">Email or Mobile No</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Email or Mobile Number"
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
              Don't have an account?{" "}
              <Link className="blue-link" to="/party/registration">
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

export default PartyLoginPage;
