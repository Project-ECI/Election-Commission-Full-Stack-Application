import httpClient from "../http-common";

const getAllStates = () => {
  return httpClient.get("/eci/get-all-state");
};

export default getAllStates;
