import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../utils/api";

const UnitsContext = createContext();

export const UnitsProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [units, setUnitsState] = useState({
    weight: "kg",
    volume: "l",
    length: "cm",
  });

  // Load units from backend when user changes
  useEffect(() => {
    const fetchUnits = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const res = await api.get("/preferences/");
        setUnitsState(
          res.data.unit_preferences || {
            weight: "kg",
            volume: "l",
            length: "cm",
          }
        );
      } catch (err) {
        console.error("Error fetching units:", err);
      }
    };

    fetchUnits();
  }, [user, isAuthenticated]);

  // Update units locally and in backend
  const setUnits = async (newUnits) => {
    setUnitsState(newUnits);

    if (isAuthenticated) {
      try {
        await api.post("/preferences/", { unit_preferences: newUnits });
      } catch (err) {
        console.error("Error saving units:", err);
      }
    }
  };

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnits = () => useContext(UnitsContext);
