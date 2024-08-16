import React, { useEffect, useState } from "react";
import image from "../../assets/images/image-for-loginpage.png";
import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";
import PartySidebar from "../../components/PartySidebar.jsx";
import getAllStates from "../../services/state.service";
import getRespectiveDistrict from "../../services/district.service";
import partyService from "../../services/party.service.js";

import { toast } from "react-toastify";

function PartyProfile() {
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [partyId, setPartyId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [partyName, setPartyName] = useState("");
  const [objective, setObjective] = useState("");
  const [email, setEmail] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [stateName, setStateName] = useState("");

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // DTO for updating profile
  const dto = {
    partyId,
    partyName,
    objective,
    email,
    districtId,
  };

  useEffect(() => {
    // Load data from session storage on component mount
    setPartyId(sessionStorage.getItem("id"));
    setPartyName(sessionStorage.getItem("partyName"));
    setObjective(sessionStorage.getItem("objective"));
    setEmail(sessionStorage.getItem("email"));
    setDistrictName(sessionStorage.getItem("districtName"));
    setStateName(sessionStorage.getItem("state"));
    // Fetch states from the backend
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
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    try {
      const response = await getRespectiveDistrict(selectedState);
      if (response.data.length === 0) {
        alert("No city found");
      } else {
        setCities(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch districts:", err);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(dto);
      const response = await partyService.updateProfile(dto);
      if (response.data === "success") {
        setIsEditing(!isEditing);
        sessionStorage.setItem("partyName", partyName);
        sessionStorage.setItem("objective", objective);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("districtId", districtId);
        sessionStorage.setItem("districtName", districtName);
        toast.success("Your profile has been successfully updated!");
      } else {
        toast.error("Something went wrong. Error updating profile.");
      }
    } catch (err) {
      toast.error("Internal server error. Try agian after some time.");
    }
  };

  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <PartySidebar />

        <div className="right-homepage-container">
          <div className="registration-container">
            <div className="reg-left-container">
              <img src={image} className="img-fluid" width="320px" alt="" />
            </div>

            <div className="reg-right-container">
              <h1 className="font-mont">Update Party Profile</h1>

              {!isEditing ? (
                // Read-Only Form
                <form id="read-only-form">
                  <div className="form-group mb-3">
                    <label>Party Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={partyName}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Objective</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={objective}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={stateName}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>District</label>
                    <input
                      type="text"
                      className="form-control"
                      value={districtName}
                      disabled
                    />
                  </div>

                  <button
                    className="btn btn-blue col-12"
                    type="button"
                    onClick={handleEditClick}
                  >
                    Edit Profile
                  </button>
                </form>
              ) : (
                // Editable Form
                <form id="editable-form" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="partyName">Party Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="partyName"
                      value={partyName}
                      onChange={(e) => setPartyName(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="objective">Objective</label>
                    <textarea
                      className="form-control"
                      id="objective"
                      rows="3"
                      value={objective}
                      onChange={(e) => setObjective(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <select
                      id="state"
                      className="form-control"
                      value={selectedState}
                      onChange={handleStateChange}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option value={state.stateId} key={state.stateId}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group mb-3">
                    <select
                      id="city"
                      className="form-control"
                      disabled={cities.length === 0}
                      onChange={(e) => setDistrictId(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option value={city.districtId} key={city.districtId}>
                          {city.districtName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="editable-form-buttons">
                    <button className="btn btn-success" type="submit">
                      Update Profile
                    </button>

                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </React.Fragment>
  );
}

export default PartyProfile;
