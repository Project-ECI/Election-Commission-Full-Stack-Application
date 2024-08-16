import "../../css/voter-homepage.css";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";
import AdminSidebar from "../../components/AdminSidebar.jsx";

import React, { useEffect, useState } from "react";
import getRespectiveDistrict from "../../services/district.service.js";
import adminService from "../../services/admin.service.js";
import getAllStates from "../../services/state.service.js";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function DeclareResults() {
  const navigate = useNavigate();
  // State and cities dropdown
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [districtId, setDistrictId] = useState("");

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
      const response = await adminService.declareElectionResult(districtId);
      navigate("/admin/home");
      toast.success("Election results have been successfully declared!");
    } catch (err) {
      toast.error("Internal server error. Try again after some time.")
    }
  };
  return (
    <React.Fragment>
      <Navbar3></Navbar3>

      <div className="homepage-container">
        <AdminSidebar></AdminSidebar>

        <div className="right-homepage-container">
          <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
            Declare Results
          </h1>
          <form onSubmit={handleSubmit}>
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

            <button className="btn btn-blue col-12" type="submit">
              Declare Results
            </button>

            <div class="row mt-2 mb-2">
              <div class="col">
                <hr />
              </div>
              <div class="col-auto">OR</div>
              <div class="col">
                <hr />
              </div>
            </div>

            <button className="btn btn-blue col-12" type="submit">
              Declare Results in All Constituencies
            </button>
          </form>
        </div>
      </div>

      <Footer1></Footer1>
    </React.Fragment>
  );
}

export default DeclareResults;
