import "../../css/voter-homepage.css";
import "../../css/kyc.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import React, { useEffect, useState } from "react";
import voterService from "../../services/voter.service.js";
import { useNavigate } from "react-router-dom";
import VoterSidebar from "../../components/VoterSidebar.jsx";

function VotingPage() {
    const navigate = useNavigate();
    const [candidateDto, setCandidateDto] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [voterId, setVoterId] = useState("");

    useEffect(() => {
        const fetchCandidate = async () => {
            const storedVoterId = sessionStorage.getItem("id");
            if (storedVoterId) {
                try {
                    setVoterId(storedVoterId);
                    const response = await voterService.knowCandidate(storedVoterId);
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

    const handleRadioChange = (candidateId) => {
        setSelectedCandidate(candidateId);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedCandidate !== null) {
                const response = await voterService.castVote({
                    voterId,
                    candidateId: selectedCandidate,
                });
                console.log(response.data);
                navigate("/voter/home");
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
                    <form onSubmit={handleSubmit}>
                        {candidateDto.map((dto, index) => (
                            <div className="kyc-container mb-5">
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

                                <input type="radio" 
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
                </div>

            </div>

            <Footer1 />
        </React.Fragment>
    )
}

export default VotingPage;