import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import image from "../../assets/images/image-for-loginpage.png";
import { useEffect, useState } from "react";
import CandidateSidebar from "../../components/CandidateSidebar.jsx";
import candidateService from "../../services/candidate.service.js";
import { useNavigate } from "react-router-dom";

function ApplicationStatus() {
  const navigate = useNavigate();
  const [candidateId, setCandidateId] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");

  // Fetch application status
  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const storedCandidateId = sessionStorage.getItem("id");
        setCandidateId(storedCandidateId);
        const response = await candidateService.applicationStatus(
          storedCandidateId
        );
        setApplicationStatus(response.data);
        if (response.data === "accepted") sessionStorage.setItem("status", "Accepted");
        else if (response.data === "rejected") sessionStorage.setItem("status", "Rejected");
        else if (response.data === "pending") sessionStorage.setItem("status", "Pending");
        else sessionStorage.setItem("status", "Not Applicable");
      } catch (err) {
        console.error("Failed to fetch application status:", err);
      }
    };

    fetchApplicationStatus();
  }, []);

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <CandidateSidebar />
        <div className="right-homepage-container">
          <div>
            {applicationStatus === 'rejected' && (
              <div className="alert alert-danger" role="alert">
                Your Application is rejected by the party.
              </div>
            )}
            {applicationStatus === 'accepted' && (
              <div className="alert alert-success" role="alert">
                Your Application is accepted by the party.
              </div>
            )}
            {applicationStatus === 'pending' && (
              <div className="alert alert-warning" role="alert">
                Your Application is pending.
              </div>
            )}
            {applicationStatus === 'NA' && (
              <div className="alert alert-info" role="alert">
                Application Status is not applicable to you as you are an independent candidate.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default ApplicationStatus;
