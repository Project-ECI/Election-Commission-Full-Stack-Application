import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";
import Sidebar from "../../components/Sidebar.jsx";

import image from "../../assets/images/image-for-loginpage.png";
import { useEffect, useState } from "react";
import voterService from "../../services/voter.service.js";
import { useNavigate } from "react-router-dom";

function CastVote() {
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
        navigate("/voter-homepage");
      } else {
        console.error("No candidate selected");
      }
    } catch (err) {
      console.error("Vote submission failed:", err);
    }
  };

  return (
    <div>
      <Navbar3 />

      <div className="homepage-container">
        <Sidebar />
        <div className="right-homepage-container">
          <div className="upper">
            <h1 className="font-mont">Welcome Back!</h1>
            <img src={image} className="img-fluid" width="320px" alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="lower">
              <div className="content">
                <ul>
                  {candidateDto.map((dto) => (
                    <li key={dto.candidateId} className="id-card">
                      <div
                        className="id-body"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <div className="checkbox-container">
                          <input
                            type="radio"
                            id={`card-radio-${dto.candidateId}`}
                            name="candidate"
                            value={dto.candidateId}
                            checked={selectedCandidate === dto.candidateId}
                            onChange={() => handleRadioChange(dto.candidateId)}
                            style={{
                              transform: "scale(1.5)",
                              marginRight: "10px",
                            }}
                          />
                        </div>
                        <div className="id-content" style={{ flexGrow: 1 }}>
                          <div className="id-header">
                            <img
                              // src={userInfo.avatar}
                              alt="User Avatar"
                              className="user-avatar"
                            />
                            <h2>{dto.candidateName}</h2>
                          </div>
                          <div className="id-body" style={{ display: "flex" }}>
                            <div className="rightdiv">
                              <h3>Party :</h3>
                              <h2>
                                {dto.partyName || "Independent Candidate"}
                              </h2>
                            </div>
                            <img
                              // src={image2}
                              alt="User Avatar"
                              className="user-avatar"
                              style={{ marginRight: "50px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-blue margintop" type="submit">
                Submit Vote
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer1 />
    </div>
  );
}

export default CastVote;
