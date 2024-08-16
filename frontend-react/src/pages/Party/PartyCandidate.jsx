import "../../css/castVote.css";
import "../../css/voter-homepage.css";

import Footer1 from "../../components/Footer1.jsx";
import Navbar3 from "../../components/Navbar3.jsx";

import partyService from "../../services/party.service.js";
import PartySidebar from "../../components/PartySidebar.jsx";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

function PartyCandidate() {
  const [partyId, setPartyId] = useState("");
  const [acceptedCandidates, setAcceptedCandidates] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const partyI = sessionStorage.getItem("id");
        setPartyId(partyI);

        const response = await partyService.getAcceptedCandidateList(partyI);
        setAcceptedCandidates(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Failed to fetch candidates:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleReject = async (candidateId) => {
    try {
      const response = await partyService.removeFromParty(candidateId);
      toast.success("The candidate has been successfully removed from the party.");
      setAcceptedCandidates((prev) =>
        prev.filter((dto) => dto.candidateId !== candidateId)
      );
    } catch (err) {
      toast.error("Internal server error. Try again after some time.");
    }
  };

  return (
    <div>
      <Navbar3 />
      <div className="homepage-container">
        <PartySidebar />
        <div className="right-homepage-container">
          <div className="">
            <h1 className="font-mont"> Candidates From Your Party</h1>
          </div>

          {isLoading ? (
            <p>Loading candidates...</p>
          ) : (
            <>
              {/* Accepted Candidates Table */}
              {acceptedCandidates.length > 0 ? (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Candidate Name</th>
                        <th scope="col">Constituency</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {acceptedCandidates.map((dto, index) => (
                        <tr key={dto.candidateId}>
                          <th scope="row">{index + 1}</th>
                          <td>{dto.candidateName}</td>
                          <td>{dto.constituency}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleReject(dto.candidateId)}
                              className="btn btn-danger"
                            >
                              Remove from Party
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No accepted candidates found.</p>
              )}
            </>
          )}
        </div>
      </div>
      <Footer1 />
    </div>
  );
}

export default PartyCandidate;
