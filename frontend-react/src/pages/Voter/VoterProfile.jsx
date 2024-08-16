import React, { useEffect, useState } from "react";
import image from "../../assets/images/image-for-loginpage.png";
import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";
import VoterSidebar from "../../components/VoterSidebar.jsx";
import getAllStates from "../../services/state.service";
import getRespectiveDistrict from "../../services/district.service";
import voterService from "../../services/voter.service.js";
import { toast } from "react-toastify";

function VoterProfile() {
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [voterId, setVoterId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [districtName, setDistrictName] = useState("");
  const dto = {
    voterId,
    fullName,
    email,
    districtId,
    mobileNo,
  };
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch state data from the backend when the component mounts
    setMobileNo(sessionStorage.getItem("mobileNo"));
    setDistrictId(sessionStorage.getItem("districtId"));
    setFullName(sessionStorage.getItem("fullname"));
    setVoterId(sessionStorage.getItem("id"));
    setEmail(sessionStorage.getItem("email"));
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
      toast.info("No city found");
    } else setCities(response.data);
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
      const response = await voterService.updateProfile(dto);
      if (response.data === "success") {
        setIsEditing(!isEditing);
        sessionStorage.setItem("fullname", fullName);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("mobileNo", mobileNo);
        sessionStorage.setItem("districtId", districtId);
        sessionStorage.setItem("districtName", districtName);
        toast.success("Data Updated!");
      } else if (response.data === "fail") {
        toast.error("Fail Update!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <VoterSidebar />

        <div className="right-homepage-container">
          <div className="registration-container">
            <div className="reg-left-container">
              <img src={image} className="img-fluid" width="320px" alt="" />
            </div>

            <div className="reg-right-container">
              <h1 className="font-mont">Update Voter Profile</h1>

              {!isEditing ? (
                // Read-Only Form
                <form id="read-only-form">
                  <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sessionStorage.getItem("fullname")}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Date Of Birth</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sessionStorage.getItem("dob")}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Gender</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sessionStorage.getItem("gender")}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={sessionStorage.getItem("email")}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Mobile No</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={sessionStorage.getItem("mobileNo")}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sessionStorage.getItem("stateName")}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>District</label>
                    <input
                      type="text"
                      className="form-control"
                      value={sessionStorage.getItem("districtName")}
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
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      defaultValue={sessionStorage.getItem("fullname")}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dob"
                      defaultValue={sessionStorage.getItem("dob")}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="gender">Gender</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      defaultValue={sessionStorage.getItem("gender")}
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      defaultValue={sessionStorage.getItem("email")}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="mobileno">Mobile No</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobileno"
                      defaultValue={sessionStorage.getItem("mobileNo")}
                      onChange={(e) => setMobileNo(e.target.value)}
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
                      onChange={(e) => {
                        setDistrictId(e.target.value);
                      }}
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

export default VoterProfile;
