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
};

export default adminService;
