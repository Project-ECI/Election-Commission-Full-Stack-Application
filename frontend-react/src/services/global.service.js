import httpClient from "../http-common";

// Define the service object
const globalService = {
  knowCandidateGlobal: (id) => {
    return httpClient.get("/eci/know-your-candidate", {
      params: {
        stateId: id, // Pass the id as a query parameter
      },
    });
  },
};

// Export the service object as the default export
export default globalService;
