import httpClient from "../http-common";

const partyService = {
  login: (data) => {
    return httpClient.post("/party/login", data);
  },
  register: (data) => {
    return httpClient.post("/party/register", data);
  },
  allParty: () => {
    return httpClient.get("/eci/all-parties");
  },
  getcandidateList: (data) => {
    return httpClient.post("/party/get-candidate", data);
  },
  acceptForm: (data) => {
    return httpClient.post("/party/accept-candidate-form", data);
  },
  getAcceptedCandidateList: (partyId) => {
    return httpClient.post("/party/accepted-candidate", partyId);
  },
};

export default partyService;
