import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import image from "../../assets/images/image-for-loginpage.png";
import { useEffect, useState } from "react";

import partyService from "../../services/party.service.js";
import getRespectiveDistrict from "../../services/district.service.js";
import getAllStates from "../../services/state.service.js";
import PartySidebar from "../../components/PartySidebar.jsx";

function CandidateList() {
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [partyId, setPartyId] = useState("");
  const [candidateDto, setCandidateDto] = useState([]);

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
    setDistrictId(""); // Reset city selection
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
    setDistrictId(cityId); // Set selected city

    const partyId = sessionStorage.getItem("id");
    setPartyId(partyId);

    if (cityId && partyId) {
      const dto = { partyId, districtId: cityId }; // Use cityId instead of selectedCity
      try {
        console.log(dto);
        const response = await partyService.getcandidateList(dto);
        if (response.data.length === 0) {
          console.log("No candidates found");
          setCandidateDto([]);
        } else {
          setCandidateDto(response.data); // Assume response.data is an array of candidates
        }
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
      }
    }
  };

  const handleAccept = async (candidateId) => {
    const partyId = sessionStorage.getItem("id");
    setPartyId(partyId);
    const responseDto = {
      partyId,
      candidateId,
      districtId,
    };
    try {
      const response = await partyService.acceptForm(responseDto);

      alert("Candidate accepted." + response);
    } catch (err) {
      console.error("Failed to accept candidate:", err);
    }
  };

  const handleReject = async (candidateId) => {
    try {
      // Call your API to reject the candidate
      await partyService.rejectCandidate(candidateId);
      // Update the candidate list state to reflect the change
      setCandidateDto((prev) =>
        prev.filter((dto) => dto.candidateId !== candidateId)
      );
      alert("Candidate rejected.");
    } catch (err) {
      console.error("Failed to reject candidate:", err);
    }
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <PartySidebar />
        <div className="right-homepage-container">
          <div className="upper">
            <h1 className="font-mont">Welcome Back!</h1>
            <img src={image} className="img-fluid" width="320px" alt="" />
          </div>

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
                value={districtId}
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
          </div>

          {candidateDto.length > 0 && (
            <div className="lower">
              <div className="content">
                <div className="left">
                  <ul>
                    {candidateDto.map((dto, index) => (
                      <li key={index} className="id-card">
                        <div className="id-header">
                          <h2>{dto.candidateName}</h2>
                        </div>
                        <div className="id-body" style={{ display: "flex" }}>
                          <div className="rightdiv">
                            <h3>Constituency: {dto.constituency}</h3>
                            <h3>
                              Form Status:
                              {dto.isAccepted ? "Accepted" : "Pending"}
                            </h3>
                          </div>
                        </div>
                        <div
                          className="id-footer"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "10px",
                          }}
                        >
                          <button
                            onClick={() => handleAccept(dto.candidateId)}
                            className="btn btn-success"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(dto.candidateId)}
                            className="btn btn-danger"
                          >
                            Reject
                          </button>
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

export default CandidateList;
