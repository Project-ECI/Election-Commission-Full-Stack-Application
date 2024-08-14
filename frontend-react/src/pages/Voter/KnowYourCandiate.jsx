import "../../css/voter-homepage.css";
import "../../css/kyc.css";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";

import React, { useEffect, useState } from "react";
import voterService from "../../services/voter.service.js";
import VoterSidebar from "../../components/VoterSidebar.jsx";

function KnowYourCandidate() {
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
                        </div>
                    ))
                    }




                </div>
            </div>
            <Footer1 />
        </React.Fragment>
    )
}

export default KnowYourCandidate;