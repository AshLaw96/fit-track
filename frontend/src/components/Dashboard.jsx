import React from "react";
import { useAuth } from "../contexts/AuthContext";
import GuestDash from "./GuestDash";
import UserDash from "./UserDash";

const Dashboard = ({ dashboardData, fetchAllData }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <UserDash dashboardData={dashboardData} fetchAllData={fetchAllData} /> : <GuestDash />;
};

export default Dashboard;
