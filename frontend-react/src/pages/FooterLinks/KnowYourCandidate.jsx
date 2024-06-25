import "../../css/knowYourCandidate.css";
import Footer1 from "../../components/Footer1.jsx";
import Navbar1 from "../../components/Navbar1.jsx";
import image1 from "../../assets/images/virat.png";
import image2 from "../../assets/images/download.png";
import React, { useState } from "react";

function KnowYourCandidate() {
  const userInfo = {
    name: "Virat",
    address: "Party Name",
    avatar: image1, // Replace with actual path to user's image
  };
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);

    switch (selectedState) {
      case "Maharashtra":
        setCities(["Pune", "Mumbai", "Nagpur"]);
        break;
      case "Goa":
        setCities(["South Goa", "North Goa", "Panaji"]);
        break;
      case "Gujrat":
        setCities(["Gandhinagar", "Ahmedabad", "Surat"]);
        break;
      default:
        setCities([]);
        break;
    }
    setSelectedCity(""); // Reset selected city when state changes
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
  };

  return (
    <div>
      <Navbar1 />
      <div className="main margin-10">
        <div className="upper">
          <h1 className="font-mont">Know Your Candidate</h1>
          <div className="form-group dropdown">
            <select
              id="state"
              className="form-control"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Goa">Goa</option>
              <option value="Gujrat">Gujrat</option>
            </select>
            <i className="bi bi-arrow-down-square-fill form-icon2"></i>
          </div>

          {/* City Dropdown */}
          <div className="form-group dropdown">
            <select
              id="city"
              className="form-control"
              disabled={cities.length === 0}
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <i className="bi bi-arrow-down-square-fill form-icon2"></i>
          </div>
        </div>
        {selectedCity && (
          <div className="lower">
            <div className="content">
              <div className="left">
                <div className="id-card">
                  <div className="id-header">
                    <img
                      src={userInfo.avatar}
                      alt="User Avatar"
                      className="user-avatar"
                    />
                    <h2>{userInfo.name}</h2>
                  </div>
                  <div className="id-body" style={{ display: "flex" }}>
                    <div className="rightdiv">
                      <h3>Party :</h3>
                      <h2>{userInfo.address}</h2>
                    </div>
                    <img
                      src={image2}
                      alt="User Avatar"
                      className="user-avatar"
                      style={{ marginRight: "50px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer1 />
    </div>
  );
}

export default KnowYourCandidate;
