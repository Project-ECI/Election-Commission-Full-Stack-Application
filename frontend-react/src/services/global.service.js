import httpClient from "../http-common";

// Define the service object
const globalService = {
  knowCandidateGlobal: (id) => {
    return httpClient.get(`/eci/know-your-candidate/${id}`);
  },
  addFeedback: (data) => {
    return httpClient.post("/eci/feedback", data);
  },
  getAllDate: () => {
    return httpClient.get("/eci/view/election-date");
  },
  getAllResult: () => {
    return httpClient.get("/eci/view/result");
  },
  searchVoter: (voterId) => {
    return httpClient.get(`/eci/search-in-electroll-roll/${voterId}`);
  },
};

// Export the service object as the default export
export default globalService;
