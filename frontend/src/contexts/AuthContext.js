import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api, { startTokenRefreshTimer, refreshAccessToken } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  // Rehydrate token and user on page load
  useEffect(() => {
    const tryRefresh = async () => {
      const token = localStorage.getItem("access_token");
      const refresh = localStorage.getItem("refresh_token");

      if (token && refresh) {
        try {
          const decoded = jwtDecode(token);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            await refreshAccessToken();
          }

          const newToken = localStorage.getItem("access_token");
          setUser(jwtDecode(newToken));
          setIsAuthenticated(true);
          startTokenRefreshTimer();
        } catch (err) {
          logout();
        }
      }
    };

    tryRefresh();
  }, [logout]);

  // Listen for storage updates in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          setUser(jwtDecode(token));
          setIsAuthenticated(true);
        } catch {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    setIsAuthenticated(true);
    setUser(jwtDecode(access));
    startTokenRefreshTimer();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
