import "../../css/voter-homepage.css";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useEffect, useState } from "react";
import voterService from "../../services/voter.service.js";
import VoterSidebar from "../../components/VoterSidebar.jsx";

function KnowCandidate() {
  const [candidateDto, setCandidateDto] = useState([]);

  useEffect(() => {
    const fetchCandidate = async () => {
      const candidateId = sessionStorage.getItem("id");
      if (candidateId) {
        try {
          const response = await voterService.knowCandidate(candidateId);
          if (response.data.length === 0) {
            console.log("No candidate found");
          } else {
            setCandidateDto(response.data); // Assume response.data is an array of candidates
          }
        } catch (error) {
          console.error("Error fetching candidate data:", error);
        }
      }
    };
    fetchCandidate();
  }, []);

  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <VoterSidebar />

        <div className="right-homepage-container">
          <div className="lower">
            <div className="content">
              <div className="left">
                <ul>
                  {candidateDto.map((dto, index) => (
                    <li key={index} className="id-card">
                      <div className="id-header">
                        <img
                          // src={userInfo.avatar}
                          alt="User Avatar"
                          className="user-avatar"
                        />
                        <h2>{dto.candiateName}</h2>
                      </div>
                      <div className="id-body" style={{ display: "flex" }}>
                        <div className="rightdiv">
                          <h3>Party :</h3>
                          <h2>{dto.partyName || "Independent Candidate"}</h2>
                        </div>
                        <img
                          // src={image2}
                          alt="User Avatar"
                          className="user-avatar"
                          style={{ marginRight: "50px" }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </React.Fragment>
  );
}

export default KnowCandidate;
