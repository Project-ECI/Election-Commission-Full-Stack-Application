import React, { useState } from "react";

const StateCityDropdown = () => {
  const [selectedState, setSelectedState] = useState("");
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
        setCities(["Gandhinagar", "Ahemdabad", "Surat"]);
        break;
      default:
        setCities([]);
        break;
    }
  };

  return (
    <div style={{ marginBottom: "20px", maxWidth: "100%" }}>
      <label htmlFor="state" style={{ marginRight: "10px", display: "block" }}>
        Select a State:
      </label>
      <select
        id="state"
        value={selectedState}
        onChange={handleStateChange}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        <option value="">Select a state...</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Goa">Goa</option>
        <option value="Gujrat">Gujrat</option>
        {/* Add more states as needed */}
      </select>

      <label htmlFor="city" style={{ marginRight: "10px", display: "block" }}>
        Select a City:
      </label>
      <select
        id="city"
        disabled={cities.length === 0}
        style={{ width: "100%", padding: "8px" }}
      >
        <option value="">Select a city...</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateCityDropdown;

/*
const StateCityDropdown = () => {
  // State to hold selected state and cities data
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);

  // Function to handle state change
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);

    // Define cities based on selected state
    switch (selectedState) {
      case "California":
        setCities(["Los Angeles", "San Francisco", "San Diego"]);
        break;
      case "Texas":
        setCities(["Houston", "Austin", "Dallas"]);
        break;
      case "New York":
        setCities(["New York City", "Buffalo", "Rochester"]);
        break;
      default:
        setCities([]);
        break;
    }
  };

  return (
    <div>
      <label htmlFor="state">Select a State:</label>
      <select id="state" value={selectedState} onChange={handleStateChange}>
        <option value="">Select a state...</option>
        <option value="California">California</option>
        <option value="Texas">Texas</option>
        <option value="New York">New York</option>
     
      </select>

      <label htmlFor="city">Select a City:</label>
      <select id="city" disabled={cities.length === 0}>
        <option value="">Select a city...</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateCityDropdown;
*/
