// src/pages/StateListPage.js
import React, { useState, useEffect } from "react";
import stateService from "../../services/state.service";

function StateListPage() {
  const [states, setStates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch state data from the backend when the component mounts
    const fetchStates = async () => {
      try {
        const response = await stateService.getAllStates();
        setStates(response.data); // Update state with fetched data
      } catch (err) {
        console.error("Failed to fetch states:", err);
        setError("Failed to load state data.");
      }
    };

    fetchStates();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>States List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {states.map((state) => (
          <li key={state.id}>{state.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StateListPage;
