import React, { createContext, useContext, useState } from "react";

const UnitsContext = createContext();

export const UnitsProvider = ({ children }) => {
  // default to metric
  const [units, setUnits] = useState("metric");

  return (
    <UnitsContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitsContext.Provider>
  );
};

export const useUnits = () => useContext(UnitsContext);
