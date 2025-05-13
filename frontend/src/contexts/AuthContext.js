import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("access_token");
  });

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const res = await api.post("/token/refresh/", {
        refresh: localStorage.getItem("refresh_token"),
      });

      const newAccess = res.data.access;
      localStorage.setItem("access_token", newAccess);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Refresh token expired or invalid", err);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const startTokenRefreshTimer = () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp * 1000;
        const now = Date.now();
        const refreshTime = exp - now - 60000;

        if (refreshTime <= 0) {
          refreshToken();
        } else {
          setTimeout(() => {
            refreshToken();
            startTokenRefreshTimer();
          }, refreshTime);
        }
      } catch (e) {
        console.error("Invalid token format", e);
        logout();
      }
    };

    if (isAuthenticated) {
      startTokenRefreshTimer();
    }
  }, [isAuthenticated, refreshToken, logout]);

  const login = (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
