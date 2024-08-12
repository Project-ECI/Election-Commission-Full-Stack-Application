import httpClient from "../http-common";

// Define the service object
const voterService = {
  login: (data) => {
    return httpClient.post("/voter/login", data);
  },
  register: (data) => {
    return httpClient.post("/voter/register", data);
  },
};

// Export the service object as the default export
export default voterService;
