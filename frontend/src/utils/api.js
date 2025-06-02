import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Base API instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  withCredentials: false,
});

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

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("No refresh token available");

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/token/refresh/`,
      { refresh: refreshToken }
    );

    const newAccess = response.data.access;
    localStorage.setItem("access_token", newAccess);
    api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;

    return newAccess;
  } catch (err) {
    console.error("Token refresh failed", err);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/auth";
    throw err;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isTokenUrl = originalRequest.url.includes("/token/");
    const isRetry = originalRequest._retry;

    if (error.response?.status === 401 && !isRetry && !isTokenUrl) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export const startTokenRefreshTimer = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const accessToken = localStorage.getItem("access_token");

  if (!refreshToken || !accessToken) return;

  try {
    const decoded = jwtDecode(accessToken);
    const exp = decoded.exp * 1000;
    const now = Date.now();
    const refreshTime = exp - now - 60000;

    if (refreshTime <= 0) {
      refreshAccessToken().then(() => startTokenRefreshTimer());
    } else {
      setTimeout(async () => {
        try {
          await refreshAccessToken();
          startTokenRefreshTimer();
        } catch (err) {
          console.error("Silent refresh failed", err);
        }
      }, refreshTime);
    }
  } catch (e) {
    console.error("Invalid access token format", e);
  }
};

export default api;

// --- SleepLog helpers ---
export const getSleepLogs = async () => {
  const response = await api.get("/sleep_logs/");
  return response;
};

export const createSleepLog = async (data) => {
  const response = await api.post("/sleep_logs/", data);
  return response;
};

export const updateSleepLog = async (id, data) => {
  const response = await api.put(`/sleep_logs/${id}/`, data);
  return response;
};

export const deleteSleepLog = async (id) => {
  const response = await api.delete(`/sleep_logs/${id}/`);
  return response;
};
