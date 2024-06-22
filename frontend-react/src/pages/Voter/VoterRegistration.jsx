import "../../css/voterreg.css"

import Footer1 from "../../components/Footer1.jsx";
import Navbar1 from "../../components/Navbar1.jsx";
import StateCityDropdown from "../../components/StateDropdown.jsx";

import regitration from "../../assets/images/image-for-registrationpage.png";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons/fa

function VoterRegister() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Navbar1></Navbar1>

      {/* Registration  */}
      <div className="container voter-registration" style={{ padding: 0 }}>
        <div className="left-voter-registration col">
          <h1
            className="voter-heading font-mont "
          >
            Register to Join Our Platform Today!
          </h1>
          <p className="voter-subheading">
            Stay informed and engaged with the democratic process by registering
            to join our "Election Commission" platform! Our innovative service
            offers real-time updates on election results, voter registration
            assistance, and comprehensive information about candidates and their
            policies. Designed to empower citizens, our platform ensures N that
            your voice is heard and your vote counts. Register today to become
            an active participant in shaping the future of your community and
            country with the "Election Commission"
          </p>
          <img src={regitration} alt="" className="img-fluid" width="320px" />
        </div>

        <div className="right-voter-registration col-md-7">
          <p className="voter-heading">Voter Registration</p>
          <div className="form">
            <div className="form padding-10">
              <div class="form-group  ">
                <label for="Name">Full Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  aria-describedby="namelHelp"
                  placeholder="Enter full Name"
                ></input>
              </div>

              <div className="form-group  ">
                <label for="DOB">Date of Birth</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="dob"
                  aria-describedby="dobHelp"
                ></input>
              </div>

              <label for="gender">Gender</label>
              <div class="form-group">
                <label>
                  <input
                    type="radio"
                    class="form-control-lg"
                    name="gender"
                    value="male"
                  ></input>
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    class="form-control-lg"
                    name="gender"
                    value="female"
                  ></input>
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    class="form-control-lg"
                    name="gender"
                    value="other"
                  ></input>
                  Other
                </label>
              </div>

              <div className="form-group  ">
                <label for="email">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                ></input>
              </div>
              <div className="form-group  ">
                <label for="mobile">Mobile</label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="mobile"
                  aria-describedby="mobileHelp"
                  placeholder="Enter Mobile Number"
                ></input>
              </div>
              <div className="form-group  ">
                <StateCityDropdown />
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
                <label for="already acc">
                  Already have an account?<a href="."> Login</a>
                </label>
              </div>

              <div className="form-group" style={{ marginTop: "25px" }}>
                <button type="submit" className="btn btn-blue col-12 ">
                  Register
                </button>
              </div>
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

export default VoterRegister;
