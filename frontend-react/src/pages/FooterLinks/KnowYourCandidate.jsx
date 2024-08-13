import "../../css/knowYourCandidate.css";
import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";
import React, { useEffect, useState } from "react";

import getAllStates from "../../services/state.service";
import getRespectiveDistrict from "../../services/district.service";
// import KnowYourCandidateService from "../../services/knowYourCandidate.service";

function KnowYourCandidate() {
  const [candidateDto, setCandidateDto] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

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
    const stateId = e.target.value;
    setSelectedState(stateId);
    setSelectedCity(""); // Reset city selection
    setCities([]); // Clear cities when a new state is selected

    if (stateId) {
      try {
        const response = await getRespectiveDistrict(stateId);
        if (response.data.length === 0) {
          alert("No cities found");
        } else {
          setCities(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }
  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);

    if (cityId) {
      try {
        const response = await global.knowCandidateGlobal(cityId);
        if (response.data.length === 0) {
          console.log("No candidate found");
          setCandidateDto([]);
        } else {
          setCandidateDto(response.data); // Assume response.data is an array of candidates
        }
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
      }
    }
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <div className="right-homepage-container">
          <div className="upper">
            <h1 className="font-mont">Know Your Candidate</h1>

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
                  <option key={state.stateId} value={state.stateId}>
                    {state.stateName}
                  </option>
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
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option value={city.districtId}>{city.districtName}</option>
                ))}
              </select>
              <i className="bi bi-arrow-down-square-fill form-icon2"></i>
            </div>
          </div>
          {candidateDto.length > 0 && (
            <div className="lower">
              <div className="content">
                <div className="left">
                  <ul>
                    {candidateDto.map((dto, index) => (
                      <li key={index} className="id-card">
                        <div className="id-header">
                          <img
                            // src={userInfo.avatar}
                            alt="User Avatar"
                            className="user-avatar"
                          />
                          <h2>{dto.candidateName}</h2>
                        </div>
                        <div className="id-body" style={{ display: "flex" }}>
                          <div className="rightdiv">
                            <h3>Party :</h3>
                            <h2>{dto.partyName || "Independent Candidate"}</h2>
                          </div>
                          <img
                            // src={image2}
                            alt="User Avatar"
                            className="user-avatar"
                            style={{ marginRight: "50px" }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default KnowYourCandidate;
