import "../../css/registration.css";

import Navbar2 from "../../components/Navbar2.jsx";
import Footer1 from "../../components/Footer1";

import image from "../../assets/images/image-for-registrationpage.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import getAllStates from "../../services/state.service";
import getRespectiveDistrict from "../../services/district.service";
import voterService from "../../services/voter.service";
function VoterRegPage() {
  const navigate = useNavigate();
  // Show and hide password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  //
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [districtId, setDistrictId] = useState("");
  const registerDto = {
    fullName,
    dob,
    gender,
    email,
    password,
    mobileNo,
    districtId,
  };

  useEffect(() => {
    // Fetch state data from the backend when the component mounts
    const fetchStates = async () => {
      try {
        const response = await getAllStates();
        setStates(response.data); // Update state with fetched data
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = async (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    const response = await getRespectiveDistrict(selectedState);
    setCities(response.data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await voterService.register(registerDto);
      console.log(registerDto);
      console.log("registration successful:");
      navigate("/voter-login");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };
  return (
    <div>
      <Navbar2></Navbar2>

      {/* Registration Section */}
      <div className="registration-container margin-10">
        {/* Left Container */}
        <div className="reg-left-container">
          <h1 className="font-mont">Register to Join Our Platform Today!</h1>

          <p className="mt-3">
            Stay informed and engaged with the democratic process by registering
            to join our "Election Commission" platform! Our innovative service
            offers real-time updates on election results, voter registration
            assistance, and comprehensive information about candidates and their
            policies.
          </p>
          {/* <p className="mt-3">Designed to empower citizens, our platform ensures that
                        your voice is heard and your vote counts. Register today to become
                        an active participant in shaping the future of your community and
                        country with the "Election Commission".
                    </p> */}

          <img src={image} className="img-fluid" width="320px" alt="" />
        </div>

        {/* Right Container */}
        <div className="reg-right-container">
          <h1 className="font-mont">Voter Registration</h1>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-group mb-3">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullname"
                placeholder="Enter Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group mb-3">
              <label htmlFor="dob">Date Of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div class="form-group mb-3">
              <label for="gender">Gender</label>
              <select
                class="form-control"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <i class="bi bi-arrow-down-square-fill form-icon"></i>
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Mobile No */}
            <div className="form-group mb-3">
              <label htmlFor="mobileno">Mobile No</label>
              <input
                type="tel"
                className="form-control"
                id="mobileno"
                placeholder="Enter Mobile Number"
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>

            {/* State Dropdown */}
            <div className="form-group mb-3">
              <select
                id="state"
                class="form-control"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option value={state.stateId}>{state.stateName}</option>
                ))}
              </select>

              <i class="bi bi-arrow-down-square-fill form-icon2"></i>
            </div>

            {/* City Dropdown */}
            <div className="form-group mb-3">
              <select
                id="city"
                class="form-control"
                disabled={cities.length === 0}
                onChange={(e) => setDistrictId(e.target.value)}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option value={city.districtId}>{city.districtName}</option>
                ))}
              </select>
              <i class="bi bi-arrow-down-square-fill form-icon2"></i>
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
              Register
            </button>
            <p className="mb-0 mt-1 text-center">
              Already have an account?{" "}
              <Link className="blue-link" to="/voter-login">
                Login
              </Link>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </p>
          </form>
        </div>
      </div>

      <Footer1></Footer1>
    </div>
  );
}

export default VoterRegPage;
