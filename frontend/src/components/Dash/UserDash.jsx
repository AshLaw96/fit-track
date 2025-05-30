import React, { useEffect, useState, useCallback } from "react";
import api from "../../utils/api";
import ActivitySummary from "./ActivitySummary";
import WorkoutNutrition from "./WorkoutNutrition";
import DailyGoals from "./DailyGoals";
import ProgressAnalytics from "./ProgressAnalytics";
import ChallengesMotivation from "./ChallengesMotivation";

const UserDash = ({ dashboardData }) => {
  const [meals, setMeals] = useState([]);
  const [sleepLogs, setSleepLogs] = useState([]);
  const [profile, setProfile] = useState({ username: "User" });

  const fetchLogs = useCallback(async () => {
    try {
      const [mealsRes, sleepRes] = await Promise.all([
        api.get("/meals/"),
        api.get("/sleep_logs/"),
      ]);
      setMeals(mealsRes.data?.results || []);
      setSleepLogs(Array.isArray(sleepRes.data) ? sleepRes.data : []);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
    fetchLogs();
  }, [fetchLogs]);

  if (!dashboardData || !dashboardData.activity_summary || !dashboardData.analytics) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const today = new Date().toISOString().split("T")[0];

  const totalWater = meals
    .filter((meal) => meal.date === today && meal.meal_type === "drink" && meal.water_amount)
    .reduce((sum, meal) => sum + parseFloat(meal.water_amount || 0), 0);

  const todaySleep = sleepLogs
    .filter((log) => log.date === today)
    .reduce((sum, log) => sum + parseFloat(log.duration_hours || 0), 0);

  const activitySummaryWithWater = {
    ...dashboardData.activity_summary,
    water_intake: totalWater ?? dashboardData.activity_summary?.water_intake,
    sleep: todaySleep.toFixed(1),
  };

  return (
    <div className="container py-4 custom-wrap">
      <h2 className="mb-4 text-center custom-heading page-title">
        Welcome back, {profile.username || "User"}!
      </h2>
      <div className="row g-4">
        <div className="col-md-6">
          <ActivitySummary
            data={activitySummaryWithWater}
            profile={profile}
          />
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
          <ChallengesMotivation challenges={dashboardData.challenges} />
        </div>
      </div>
    </div>
  );
};

export default UserDash;
