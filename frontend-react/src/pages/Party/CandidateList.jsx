import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import { useEffect, useState } from "react";

import partyService from "../../services/party.service.js";
import getRespectiveDistrict from "../../services/district.service.js";
import getAllStates from "../../services/state.service.js";
import PartySidebar from "../../components/PartySidebar.jsx";

function CandidateList() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [partyId, setPartyId] = useState("");
  const [candidateDto, setCandidateDto] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getAllStates();
        setStates(response.data);
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    setDistrictId("");
    setCities([]);

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
    setDistrictId(cityId);

    const partyId = sessionStorage.getItem("id");
    setPartyId(partyId);

    if (cityId && partyId) {
      const dto = { partyId, districtId: cityId };
      try {
        const response = await partyService.getcandidateList(dto);
        if (response.data.length === 0) {
          console.log("No candidates found");
          setCandidateDto([]);
        } else {
          setCandidateDto(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
      }
    }
  };

  const handleAccept = async (candidateId) => {
    setPartyId(sessionStorage.getItem("id"));
    setPartyId(partyId);
    const responseDto = {
      partyId,
      candidateId,
      districtId,
    };
    try {
      const response = await partyService.acceptForm(responseDto);
      alert("Candidate accepted." + response);
      setCandidateDto((prev) =>
        prev.filter((dto) => dto.candidateId !== candidateId)
      );
    } catch (err) {
      console.error("Failed to accept candidate:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission if necessary
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <PartySidebar />
        <div className="right-homepage-container">
          <form onSubmit={handleSubmit}>
            <h1 className="font-mont">Applications</h1>

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

            {/* Candidates Table */}
            {candidateDto.length > 0 && (
              <div className="content">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Candidate Name</th>
                      <th scope="col">Constituency</th>
                      <th scope="col">Form Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidateDto.map((dto, index) => (
                      <tr key={dto.candidateId}>
                        <th scope="row">{index + 1}</th>
                        <td>{dto.candidateName}</td>
                        <td>{dto.constituency}</td>
                        <td>{dto.isAccepted ? "Accepted" : "Pending"}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => handleAccept(dto.candidateId)}
                            className="btn btn-success"
                          >
                            Accept
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default CandidateList;
