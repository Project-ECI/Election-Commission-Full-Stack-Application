import httpClient from "../http-common";

// Define the service object
const adminService = {
  login: (data) => {
    return httpClient.post("/admin/login", data);
  },
  SetElectionDate: (data) => {
    return httpClient.post("/admin/set/election", data);
  },
  declareElectionResult: (data) => {
    return httpClient.put("/admin/declare-results", data);
  },
  getAllVoter: () => {
    return httpClient.get("/admin/getall/voter");
  },
  getAllCandidate: () => {
    return httpClient.get("/admin/getall/candidate");
  },
  getAllParty: () => {
    return httpClient.get("/admin/getall/party");
  },
  deleteVoter: (id) => {
    return httpClient.delete(`/admin/delete/voter/${id}`);
  },
  deleteCandidate: (id) => {
    return httpClient.delete(`/admin/delete/candidate/${id}`);
  },
  deleteParty: (partyId) => {
    return httpClient.delete(`/admin/delete/party/${partyId}`);
  },
};

export default adminService;
