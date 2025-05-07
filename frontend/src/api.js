import axios from "axios";

const api = axios.create({
  // will be proxied to http://localhost:8000/api
  baseURL: "/api",
});

// Set token automatically if available
const token = localStorage.getItem("access_token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
