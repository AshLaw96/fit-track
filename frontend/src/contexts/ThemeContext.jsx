import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const { user, setUser, isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  // Fetch user's dark mode preference from backend
  useEffect(() => {
    const fetchPreference = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const res = await api.get("/preferences/");
        const prefersDark = res.data.prefers_dark_mode;
        setDarkMode(prefersDark);
        document.body.classList.toggle("dark-mode", prefersDark);
      } catch (err) {
        console.error("Error fetching theme preference:", err);
      }
    };

    fetchPreference();
  }, [user, isAuthenticated]);

  // Toggle & persist preference
  const handleSetDarkMode = async (enabled) => {
    setDarkMode(enabled);
    document.body.classList.toggle("dark-mode", enabled);

    if (user) {
      setUser({ ...user, prefersDarkMode: enabled });

      try {
        await api.post("/preferences/", {
          prefers_dark_mode: enabled,
        });
      } catch (err) {
        console.error("Error saving theme preference:", err);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode: handleSetDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
