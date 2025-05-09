import axios from "axios";

// Create an Axios instance
const api = axios.create({
  // Proxied to Django backend
  baseURL: "/api",
  // No cookies — using JWT
  withCredentials: false,
});

// Request interceptor to add access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper to refresh token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("No refresh token");

  try {
    const response = await axios.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    const newAccess = response.data.access;
    localStorage.setItem("access_token", newAccess);
    api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
    return newAccess;
  } catch (err) {
    console.error("Token refresh failed:", err);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // Redirect to login
    window.location.href = "/auth";
    throw err;
  }
};

// Response interceptor for token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/token/")
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
