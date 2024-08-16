import httpClient from "../http-common";

const getRespectiveDistrict = (stateId) => {
  return httpClient.get(`/eci/get-district/${stateId}`);
};

export default getRespectiveDistrict;
