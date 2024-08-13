import httpClient from "../http-common";

// Define the service object
const candidateService = {
  login: (data) => {
    return httpClient.post("/candidate/login", data);
  },
  register: (data) => {
    return httpClient.post("/candidate/register", data);
  },
  nominate: (data) => {
    return httpClient.post("/candidate/nomination", data);
  },
};

// Export the service object as the default export
export default candidateService;
