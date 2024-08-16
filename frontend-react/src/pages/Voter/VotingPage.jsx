import "../../css/voter-homepage.css";
import "../../css/kyc.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import React, { useEffect, useState } from "react";
import voterService from "../../services/voter.service.js";
import { useNavigate } from "react-router-dom";
import VoterSidebar from "../../components/VoterSidebar.jsx";
import { toast } from "react-toastify";

function VotingPage() {
  const navigate = useNavigate();

  const [candidateDto, setCandidateDto] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voterId, setVoterId] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [electionDate, setElectionDate] = useState(null);

  const isVoted = sessionStorage.getItem("isVoted") === "true"; // Ensure isVoted is treated as a boolean
  const today = new Date().toISOString().split("T")[0];

  const fetchCandidate = async () => {
    const storedVoterId = sessionStorage.getItem("id");
    if (storedVoterId) {
      try {
        setVoterId(storedVoterId);
        const response = await voterService.knowCandidate(storedVoterId);
        setCandidateDto(response.data); // Assume response.data is an array of candidates
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    }
  };

  useEffect(() => {
    const getDate = async () => {
      try {
        const voterId = sessionStorage.getItem("id");
        const response = await voterService.viewDate(voterId);
        setElectionDate(response.data.electionDate);
        if (today === electionDate) fetchCandidate();
      } catch (e) {
        console.error("Something went wrong: " + e);
        toast.error("Something went wrong ");
      }
    };
    getDate();
  }, []); // Add an empty dependency array here to fetch the date only once

  const handleRadioChange = (candidateId) => {
    setCandidateId(candidateId);
    setSelectedCandidate(candidateId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCandidate !== null) {
        const dto = { voterId, candidateId }; // Use the updated state
        const response = await voterService.castVote(dto);
        console.log(response.data);
        sessionStorage.setItem("isVoted", true);
        navigate("/voter/home");
        toast.success("Thank for your Vote!");
      } else {
        console.error("No candidate selected");
      }
    } catch (err) {
      console.error("Vote submission failed:", err);
    }
  };

  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <VoterSidebar />

        <div className="right-homepage-container">
          {/* Condition 1: If the user has already voted */}
          {isVoted && (
            <div className="alert alert-warning" role="alert">
              <p>
                It looks like you've already cast your vote for this election.
                Each voter is allowed to vote only once to ensure a fair and
                secure voting process.
              </p>
              <p>
                {" "}
                If you believe there is an error or if you have any questions,
                please <a href="/voter/complaint">register a complaint</a>{" "}
                regarding the issue.
              </p>
            </div>
          )}

          {/* Condition 2: If today is not the election date */}
          {!isVoted && today !== electionDate && (
            <div className="alert alert-warning" role="alert">
              <p>
                Voting is not available today as it is not the scheduled
                election date.
              </p>
              <p>
                Please check the{" "}
                <a href="/voter/district-date">election schedule</a> or{" "}
                <a href="/voter/complaint">contact the election commission</a>{" "}
                for more details.
              </p>
              <p>
                We appreciate your patience and encourage you to be prepared for
                the election day.
              </p>
            </div>
          )}

          {/* Condition 3: If the user can vote (not voted and today is election date) */}
          {!isVoted && today === electionDate && (
            <form onSubmit={handleSubmit}>
              {candidateDto.map((dto, index) => (
                <div className="kyc-container mb-5" key={index}>
                  <div className="left-kyc-container">
                    <div className="placeholder-glow">
                      <span className="placeholder bg-success candidate-image"></span>
                    </div>
                  </div>

                  <div className="right-kyc-container">
                    <div>
                      <h5 className="font-mont">Candidate Name: </h5>
                      <p>{dto.candiateName}</p>
                    </div>
                    <div>
                      <h5 className="font-mont">Party Name: </h5>
                      <p>{dto.partyName || "Independent Candidate"}</p>
                    </div>
                    <div>
                      <h5 className="font-mont">Symbol:</h5>
                      <div className="placeholder-glow">
                        <span className="placeholder bg-success candidate-symbol"></span>
                      </div>
                    </div>
                  </div>

                  <input
                    type="radio"
                    id={`radio${index}`}
                    name="candidate"
                    value={dto.candidateId}
                    onChange={() => handleRadioChange(dto.candidateId)}
                  />
                  <label htmlFor={`radio${index}`}></label>
                </div>
              ))}

              <button className="btn btn-blue vote-button" type="submit">
                Cast Vote
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer1 />
    </React.Fragment>
  );
}

export default VotingPage;
