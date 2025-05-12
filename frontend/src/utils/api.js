import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Create an Axios instance
const api = axios.create({
  // Proxy to Django
  baseURL: "/api",
  // Using JWTs only
  withCredentials: false,
});

// Attach access token to all requests
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

// Refresh access token helper
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("No refresh token available");

  try {
    const response = await axios.post("/api/token/refresh/", {
      refresh: refreshToken,
    });

    const newAccess = response.data.access;
    localStorage.setItem("access_token", newAccess);
    // Update default header so it’s used in future requests
    api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;

    return newAccess;
  } catch (err) {
    console.error("Token refresh failed", err);
    // Clear localStorage and redirect to login
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/auth";
    throw err;
  }
};

// Intercept 401s (expired access token) and attempt refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Protect against infinite loops
    const isTokenUrl = originalRequest.url.includes("/token/");
    const isRetry = originalRequest._retry;

    if (error.response?.status === 401 && !isRetry && !isTokenUrl) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        // Retry original request
        return api(originalRequest);
      } catch (refreshErr) {
        // Already handled in refreshAccessToken
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

// Start background token refresh
export const startTokenRefreshTimer = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const accessToken = localStorage.getItem("access_token");

  if (!refreshToken || !accessToken) return;

  try {
    // Decode token
    const decoded = jwtDecode(accessToken);
    // Convert to ms
    const exp = decoded.exp * 1000;
    const now = Date.now();

    // 1 min before expiry
    const refreshTime = exp - now - 60000;

    if (refreshTime <= 0) {
      console.warn("Token already expired, forcing refresh");
      // try to refresh immediately
      refreshAccessToken();
    } else {
      setTimeout(async () => {
        try {
          await refreshAccessToken();
          // schedule next
          startTokenRefreshTimer();
        } catch (err) {
          console.error("Silent refresh failed");
        }
      }, refreshTime);
    }
  } catch (e) {
    console.error("Invalid access token format");
  }
};

export default api;
