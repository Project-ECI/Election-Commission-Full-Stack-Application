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
  changePass: (data) => {
    return httpClient.put("/voter/change-password", data);
  },
  deleteAccount: (id) => {
    return httpClient.delete(`/admin/delete/voter/${id}`);
  },
};

// Export the service object as the default export
export default voterService;
