import "../../css/registration.css";

import Navbar2 from "../../components/Navbar2.jsx";
import Footer1 from "../../components/Footer1";

import image from "../../assets/images/party-registration.png";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getAllStates from "../../services/state.service";
import getRespectiveDistrict from "../../services/district.service";
import partyService from "../../services/party.service";
function PartyRegPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // Show and hide password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  //
  const [partyName, setPartyName] = useState("");
  const [objective, setObjective] = useState("");
  const [email, setEmail] = useState("");
  const [districtId, setDistrictId] = useState("");

  const registerDto = {
    partyName,
    objective,
    districtId,
    email,
    password,
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    if (response.data.length === 0) {
      alert("no city found");
    } else setCities(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await partyService.register(registerDto);
      console.log("login successfull" + response);
      navigate("/party/login");
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

          <img src={image} className="img-fluid" width="320px" alt="" />
        </div>

        {/* Right Container */}
        <div className="reg-right-container">
          <h1 className="font-mont">Party Registration</h1>

          <form onSubmit={handleSubmit}>
            {/* Party Name */}
            <div className="form-group mb-3">
              <label htmlFor="party-name">Party Name</label>
              <input
                type="text"
                className="form-control"
                id="party-name"
                placeholder="Enter Party Name"
                onChange={(e) => setPartyName(e.target.value)}
              />
            </div>

            {/* Objective */}
            <div className="form-group mb-3">
              <label htmlFor="objective">Party Objective</label>
              <textarea
                className="form-control"
                id="party-objective"
                placeholder="Enter Party Objective"
                rows="5"
                onChange={(e) => setObjective(e.target.value)}
              />
            </div>
            {/* State Dropdown */}
            <div className="form-group mb-3">
              <select
                id="state"
                className="form-control"
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option value={state.stateId}>{state.stateName}</option>
                ))}
              </select>

              <i className="bi bi-arrow-down-square-fill form-icon2"></i>
            </div>

            {/* City Dropdown */}
            <div className="form-group mb-3">
              <select
                id="city"
                className="form-control"
                disabled={cities.length === 0}
                onChange={(e) => setDistrictId(e.target.value)}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option value={city.districtId}>{city.districtName}</option>
                ))}
              </select>
              <i className="bi bi-arrow-down-square-fill form-icon2"></i>
            </div>

            {/* Email */}
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email of Party"
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
              Register
            </button>
            <p className="mb-0 mt-1 text-center">
              Already have an account?{" "}
              <Link className="blue-link" to="/party-login">
                Login
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

export default PartyRegPage;
