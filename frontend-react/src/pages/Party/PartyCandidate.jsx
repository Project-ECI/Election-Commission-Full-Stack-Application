import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import partyService from "../../services/party.service.js";
import PartySidebar from "../../components/PartySidebar.jsx";
import { useEffect, useState } from "react";

function PartyCandidate() {
  const [partyId, setPartyId] = useState("");
  const [candidateDto, setCandidateDto] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // To show a loading indicator

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const partyId = sessionStorage.getItem("id"); // Get partyId from session storage
        setPartyId(partyId);

        const response = await partyService.getAcceptedCandidateList(partyId);

        if (response.data.length === 0) {
          setCandidateDto([]);
        } else {
          setCandidateDto(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
      } finally {
        setIsLoading(false); // Stop the loading indicator
      }
    };

    fetchCandidates();
  }, []);

  const handleReject = async (candidateId) => {
    try {
      await partyService.rejectCandidate(candidateId);
      setCandidateDto((prev) =>
        prev.filter((dto) => dto.candidateId !== candidateId)
      );
      alert("Candidate rejected.");
    } catch (err) {
      console.error("Failed to reject candidate:", err);
    }
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <PartySidebar />
        <div className="right-homepage-container">
          <div className="upper">
            <h1 className="font-mont">Know Your Candidate</h1>
          </div>

          {isLoading ? (
            <p>Loading candidates...</p> // Show a loading message
          ) : candidateDto.length > 0 ? (
            <div className="lower">
              <div className="content">
                <div className="left">
                  <ul>
                    {candidateDto.map((dto, index) => (
                      <li key={index} className="id-card">
                        <div className="id-header">
                          <h2>{dto.candidateName}</h2>
                        </div>
                        <div className="id-body" style={{ display: "flex" }}>
                          <div className="rightdiv">
                            <h3>Constituency: {dto.constituency}</h3>
                          </div>
                        </div>
                        <div
                          className="id-footer"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "10px",
                          }}
                        >
                          <button
                            onClick={() => handleReject(dto.candidateId)}
                            className="btn btn-danger"
                          >
                            Reject
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p>No candidates found.</p> // Show a message if the list is empty
          )}
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default PartyCandidate;
