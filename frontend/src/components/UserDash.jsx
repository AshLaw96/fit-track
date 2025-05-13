import React, { useEffect, useState } from "react";
import api from "../utils/api";
import ActivitySummary from "./ActivitySummary";
import WorkoutNutrition from "./WorkoutNutrition";
import DailyGoals from "./DailyGoals";
import ProgressAnalytics from "./ProgressAnalytics";
import ChallengesMotivation from "./ChallengesMotivation";

const UserDash = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard/");
        setDashboardData(res.data);
      } catch (err) {
        setError("Failed to load dashboard");
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!dashboardData) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container py-4 custom-wrap">
      <h2 className="mb-4 text-center custom-heading">
        Welcome back, {dashboardData.user.first_name || "User"}!
      </h2>
      <div className="row g-4">
        <div className="col-md-6">
          <ActivitySummary data={dashboardData.activity_summary} />
        </div>
        <div className="col-md-6">
          <WorkoutNutrition data={dashboardData.workout_nutrition} />
        </div>
        <div className="col-md-6">
          <DailyGoals data={dashboardData.daily_goals} />
        </div>
        <div className="col-md-6">
          <ProgressAnalytics data={dashboardData.analytics} />
        </div>
        <div className="col-md-12">
          <ChallengesMotivation data={dashboardData.challenges} />
        </div>
      </div>
    </div>
  );
};

export default UserDash;
