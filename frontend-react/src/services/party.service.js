import httpClient from "../http-common";

const partyService = {
  login: (data) => {
    return httpClient.post("/party/login", data);
  },
  register: (data) => {
    return httpClient.post("/party/register", data);
  },
};

export default partyService;
