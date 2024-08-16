import "../../css/voter-homepage.css";

import Navbar3 from "../../components/Navbar3.jsx";
import Footer1 from "../../components/Footer1.jsx";
import AdminSidebar from "../../components/AdminSidebar.jsx";

import React, { useEffect, useState } from "react";
import adminService from "../../services/admin.service.js";

import { toast } from "react-toastify";

function ManageUsers() {
  const [selectedType, setSelectedType] = useState(""); // Default to empty string
  const [voterData, setVoterData] = useState([]);
  const [candidateData, setCandidateData] = useState([]);
  const [partyData, setPartyData] = useState([]);

  useEffect(() => {
    if (selectedType === "Voter") {
      fetchVoters();
    } else if (selectedType === "Candidate") {
      fetchCandidates();
    } else if (selectedType === "Party") {
      fetchParties();
    }
  }, [selectedType]);

  const fetchVoters = async () => {
    const response = await adminService.getAllVoter();
    setVoterData(response.data);
  };

  const fetchCandidates = async () => {
    const response = await adminService.getAllCandidate();
    setCandidateData(response.data);
  };

  const fetchParties = async () => {
    const response = await adminService.getAllParty();
    setPartyData(response.data);
  };

  const handleDelete = async (id) => {
    try {
      if (selectedType === "Voter") {
        const response = await adminService.deleteVoter(id);
        toast.success("The voter has been successfully deleted from the system.")
        fetchVoters();
      } else if (selectedType === "Candidate") {
        const response = await adminService.deleteCandidate(id);
        toast.success("The candidate has been successfully deleted from the system.")
        fetchCandidates();
      } else if (selectedType === "Party") {
        const response = await adminService.deleteParty(id);
        toast.success("The party has been successfully deleted from the system.")
        fetchParties();
      }
    } catch (error) {
      toast.error("Internal server error. Try again after some time.");
    }
  };

  return (
    <React.Fragment>
      <Navbar3 />

      <div className="homepage-container">
        <AdminSidebar />

        <div className="right-homepage-container">
          <h1 className="font-mont mb-2" style={{ fontWeight: "600" }}>
            Manage Users
          </h1>

          <div className="form-group mb-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-control"
            >
              <option value="">Select User Type</option> {/* Default value */}
              <option value="Voter">Voter</option>
              <option value="Candidate">Candidate</option>
              <option value="Party">Party</option>
            </select>
            <i className="bi bi-arrow-down-square-fill form-icon2"></i>
          </div>

          <div className="table-responsive">
            {selectedType === "Voter" && (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {voterData.map((voter) => (
                    <tr key={voter.voterId}>
                      <td>{voter.voterId}</td>
                      <td>{voter.fullName}</td>
                      <td>{voter.email}</td>
                      <td>{voter.mobileNo}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(voter.voterId)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {selectedType === "Candidate" && (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile No</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {candidateData.map((candidate) => (
                    <tr key={candidate.voterId}>
                      <td>{candidate.voterId}</td>
                      <td>{candidate.fullName}</td>
                      <td>{candidate.email}</td>
                      <td>{candidate.mobileNo}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(candidate.voterId)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {selectedType === "Party" && (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Party Name</th>
                    <th>Email</th>
                    <th>Objective</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partyData.map((party) => (
                    <tr key={party.partyId}>
                      <td>{party.partyId}</td>
                      <td>{party.fullName}</td>
                      <td>{party.email}</td>
                      <td>{party.objective}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(party.partyId)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Footer1 />
    </React.Fragment>
  );
}

export default ManageUsers;
