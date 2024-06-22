import "../../css/voterreg.css"

import Footer1 from "../../components/Footer1.jsx";
import Navbar1 from "../../components/Navbar1.jsx";

import main_image from "../../assets/images/image-for-loginpage.png";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons/fa

function VoterLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Navbar1></Navbar1>

      {/* login  */}
      <div className="container voter-registration" style={{ padding: 0 }}>
        <div className="left-voter-registration col">
          <h1 className="voter-heading font-mont ">Welcome Back!</h1>
          <img src={main_image} alt="" className="img-fluid" width="320px" />
        </div>

        <div className="right-voter-registration col-md-6">
          <div className="form">
            <p className="voter-heading">Voter Login</p>

            <div className="form-group child-div">
              <label for="email">Email or VoterID</label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="userid"
                aria-describedby="emailHelp"
                placeholder="Enter Emial or VoterId"
              ></input>
            </div>

            <div className="form-group  password-container">
              <label htmlFor="password">Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-lg"
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
            </div>

            <div
              className="form-group"
              style={{ marginTop: "25px", textAlign: "center" }}
            >
              <label for="not have acc">
                Not have an account?<a href="."> Register</a>
              </label>
            </div>

            <div className="form-group" style={{ marginTop: "25px" }}>
              <button type="submit" className="btn btn-blue col-12 ">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="col-12">
        <Footer1></Footer1>
      </div>
    </div>
  );
}

export default VoterLogin;
