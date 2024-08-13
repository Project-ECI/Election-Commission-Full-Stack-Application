import httpClient from "../http-common";

// Define the service object
const adminService = {
    login: (data) => {
        return httpClient.post("/admin/login", data);
    },
}

export default adminService;