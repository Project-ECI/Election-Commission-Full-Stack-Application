import httpClient from "../http-common";

// Define the service object
const voterService = {
  login: (data) => {
    return httpClient.post("/voter/login", data);
  },
  register: (voterRegisterDto) => {
    return httpClient.post("/voter/register", voterRegisterDto);
  },
  knowCandidate: (voterId) => {
    return httpClient.post(`/voter/know-your-candidate/${voterId}`);
  },
  castVote: (data) => {
    return httpClient.post("/voter/vote", data);
  },
  viewDate: (voterId) => {
    return httpClient.get(`/voter/view/election-date/${voterId}`);
  },
  changePass: (data) => {
    return httpClient.put("/voter/change/password", data);
  },
  deleteAccount: (id) => {
    return httpClient.delete(`/admin/delete/voter/${id}`);
  },
  updateProfile: (data) => {
    return httpClient.put("/voter/update-profile", data);
  },
  getDistrictResult: (districtId) => {
    return httpClient.get(`/voter/view/result/${districtId}`);
  },
};

// Export the service object as the default export
export default voterService;
