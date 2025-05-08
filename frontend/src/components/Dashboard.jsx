import React from "react";
import { isLoggedIn } from "../utils/authHelper";
import GuestDash from "./GuestDash";
import UserDash from "./UserDash";

const Dashboard = () => {
  return isLoggedIn() ? <UserDash /> : <GuestDash />;
};

export default Dashboard;
