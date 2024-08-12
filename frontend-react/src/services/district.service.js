import httpClient from "../http-common";

const getRespectiveDistrict = (id) => {
  return httpClient.get(`/eci/get-district`, {
    params: {
      stateId: id, // Pass the id as a query parameter
    },
  });
};

export default getRespectiveDistrict;
