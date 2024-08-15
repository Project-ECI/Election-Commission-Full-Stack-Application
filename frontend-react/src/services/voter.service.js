import httpClient from "../http-common";

// Define the service object
const voterService = {
  login: (data) => {
    return httpClient.post("/voter/login", data);
  },
  register: (data) => {
    return httpClient.post("/voter/register", data);
  },
  knowCandidate: (id) => {
    return httpClient.post("/voter/know-your-candidate", id);
  },
  castVote: (data) => {
    return httpClient.post("/voter/vote", data);
  },
  viewDate: (voterId) => {
    return httpClient.get(`/voter/view/election-date/${voterId}`);
  },
};

// Export the service object as the default export
export default voterService;
