import React, { useEffect, useState } from "react";
import image from "../../assets/images/image-for-loginpage.png";
import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";
import VoterSidebar from "../../components/VoterSidebar.jsx";
import getAllStates from "../../services/state.service";
import getRespectiveDistrict from "../../services/district.service";

function VoterProfile() {
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [setDistrictId] = useState("");
  
  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

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
      alert("No city found");
    } else setCities(response.data);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
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
                <form id="editable-form">
                  <div className="form-group mb-3">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      defaultValue="Mrunal Maheshkar"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input
                      type="text"
                      className="form-control"
                      id="dob"
                      defaultValue="03/06/2001"
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="gender">Gender</label>
                    <input
                      type="text"
                      className="form-control"
                      id="gender"
                      defaultValue="Male"
                      disabled
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      defaultValue="mrunal@gmail.com"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="mobileno">Mobile No</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="mobileno"
                      defaultValue="8329529079"
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
                    <button className="btn btn-success" type="button">
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
