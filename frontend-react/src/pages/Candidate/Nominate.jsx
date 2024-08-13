import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import image from "../../assets/images/image-for-loginpage.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";
import partyService from "../../services/party.service.js";
import getRespectiveDistrict from "../../services/district.service.js";
import getAllStates from "../../services/state.service.js";
import candidateService from "../../services/candidate.service.js";

function Nominate() {
  const navigate = useNavigate();
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Party
  const [party, setParty] = useState([]);
  const [selectedParty, setSelectedParty] = useState("");
  const [isIndependent, setIsIndependent] = useState(false);

  //candidate
  const [candidateId, setCandidateId] = useState("");
  const dto = {
    candidateId,
    selectedParty,
    isIndependent,
    selectedCity,
  };

  // Fetch states and parties
  useEffect(() => {
    const fetchStatesAndParties = async () => {
      try {
        setCandidateId(sessionStorage.getItem("id"));
        const response = await getAllStates();
        setStates(response.data); // Update state with fetched data

        const response1 = await partyService.allParty();
        setParty(response1.data);
      } catch (err) {
        console.error("Failed to fetch states or parties:", err);
      }
    };

    fetchStatesAndParties();
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

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleNominationTypeChange = (e) => {
    setIsIndependent(e.target.value === "independent");
    setSelectedParty(""); // Reset party selection if switching types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCity && (isIndependent || selectedParty)) {
        const response = await candidateService.nominate(dto);
        
        console.log({
          stateId: selectedState,
          cityId: selectedCity,
          partyId: isIndependent ? null : selectedParty,
          isIndependent,
        });

        navigate("/candidate-homepage");
      } else {
        console.error("Please complete all required fields.");
      }
    } catch (err) {
      console.error("Candidate submission failed:", err);
    }
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <CandidateSidebar />
        <div className="right-homepage-container">
          <div className="upper">
            <h1 className="font-mont">Welcome Back!</h1>
            <img src={image} className="img-fluid" width="320px" alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="lower">
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
                    <option key={city.districtId} value={city.districtId}>
                      {city.districtName}
                    </option>
                  ))}
                </select>
                <i className="bi bi-arrow-down-square-fill form-icon2"></i>
              </div>

              {/* Candidate Type */}
              <div className="form-group mb-3">
                <label>Candidate Type:</label>
                <div>
                  <input
                    type="radio"
                    id="independent"
                    name="candidateType"
                    value="independent"
                    checked={isIndependent}
                    onChange={handleNominationTypeChange}
                  />
                  <label htmlFor="independent">Independent</label>

                  <input
                    type="radio"
                    id="party"
                    name="candidateType"
                    value="party"
                    checked={!isIndependent}
                    onChange={handleNominationTypeChange}
                    style={{ marginLeft: "20px" }}
                  />
                  <label htmlFor="party">Party</label>
                </div>
              </div>

              {/* Party Dropdown */}
              {!isIndependent && (
                <div className="form-group mb-3">
                  <select
                    id="party"
                    className="form-control"
                    value={selectedParty}
                    onChange={(e) => setSelectedParty(e.target.value)}
                  >
                    <option value="">Select Party</option>
                    {party.map((p) => (
                      <option key={p.partyId} value={p.partyId}>
                        {p.partyName}
                      </option>
                    ))}
                  </select>
                  <i className="bi bi-arrow-down-square-fill form-icon2"></i>
                </div>
              )}

              <button className="btn btn-blue margintop" type="submit">
                Submit Nomination Form
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default Nominate;
