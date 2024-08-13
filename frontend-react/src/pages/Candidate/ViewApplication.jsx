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
        setApplicationStatus(response.data); // Update application status
      } catch (err) {
        console.error("Failed to fetch application status:", err);
      }
    };

    fetchApplicationStatus();
  }, []);

  const handleNavigateHome = () => {
    navigate("/candidate-homepage");
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <CandidateSidebar />
        <div className="right-homepage-container">
          <div className="upper">
            <h1 className="font-mont">Welcome Back!</h1>
            <img src={image} className="img-fluid" width="320px" alt="" />
          </div>

          <div className="lower">
            <div className="status-container">
              <h2>Application Status</h2>
              <p>{applicationStatus || "Loading status..."}</p>
            </div>
            <button
              className="btn btn-blue margintop"
              onClick={handleNavigateHome}
            >
              Go to Home Page
            </button>
          </div>
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default ApplicationStatus;
