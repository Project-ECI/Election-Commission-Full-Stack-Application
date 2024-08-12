import httpClient from "../http-common";

const login = (data) => {
  return httpClient.post("/voter/login", data);
};
export default login;
