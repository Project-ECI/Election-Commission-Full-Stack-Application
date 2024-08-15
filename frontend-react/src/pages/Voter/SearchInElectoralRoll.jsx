import "../../css/voter-homepage.css";
import "../../css/kyc.css";

import image from "../../assets/images/party-login.png";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useState } from "react";
import globalService from "../../services/global.service.js";
import VoterSidebar from "../../components/VoterSidebar.jsx";

function SearchInElectoralRoll() {
  const [voterId, setVoterId] = useState("");
  const [data, setData] = useState(null); // Set initial data as null to handle empty state

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    try {
      const response = await globalService.searchVoter(voterId);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching voter data:", error);
      setData([]); // Handle error by setting an empty array
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
              <h1 className="font-mont">Search In Electoral Roll</h1>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="voter-id"
                    placeholder="Enter Voter-Id"
                    onChange={(e) => setVoterId(e.target.value)}
                    value={voterId}
                  />
                </div>

                <button className="btn btn-blue col-12" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>

          {data && typeof data === "object" && (
            <div className="kyc-container mb-5">
              <div className="left-kyc-container">
                <div className="placeholder-glow">
                  <span className="placeholder bg-success candidate-image"></span>
                </div>
              </div>

              <div className="right-kyc-container">
                <div>
                  <h5 className="font-mont">Name: </h5>
                  <p>{data.fullName}</p>
                </div>
                <div>
                  <h5 className="font-mont">Gender: </h5>
                  <p>{data.gender ? "Female" : "Male"}</p>
                </div>
                <div></div>
                <div>
                  <h5 className="font-mont">Date of Birth: </h5>
                  <p>{data.dob}</p>
                </div>
                <div>
                  <h5 className="font-mont">District: </h5>
                  <p>{data.district}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer1 />
    </React.Fragment>
  );
}

export default SearchInElectoralRoll;
