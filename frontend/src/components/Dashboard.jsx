import React from "react";
import { useAuth } from "../contexts/AuthContext";
import GuestDash from "./GuestDash";
import UserDash from "./UserDash";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <UserDash /> : <GuestDash />;
};

export default Dashboard;
