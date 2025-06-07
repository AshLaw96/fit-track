import React, { useEffect, useState, useCallback } from "react";
import api from "../../utils/api";
import ActivitySummary from "./ActivitySummary";
import WorkoutNutrition from "./WorkoutNutrition";
import DailyGoals from "./DailyGoals";
import ProgressAnalytics from "./ProgressAnalytics";
import ChallengesMotivation from "./ChallengesMotivation";
import { useLocation } from "react-router-dom";

const UserDash = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [meals, setMeals] = useState([]);
  const [profile, setProfile] = useState({ username: "User" });

  const fetchLogs = useCallback(async () => {
    try {
      const mealsRes = await api.get("/meals/");
      setMeals(mealsRes.data?.results || []);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  }, []);

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await api.get("/dashboard/");
      setDashboardData(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
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
    fetchDashboardData();
  }, [fetchLogs, fetchDashboardData]);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait until DOM has rendered
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        // small delay ensures DOM is ready
      }, 0);
    }
  }, [hash]);

  if (
    !dashboardData ||
    !dashboardData.activity_summary ||
    !dashboardData.analytics
  ) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const today = new Date().toISOString().split("T")[0];

  const totalWater = meals
    .filter(
      (meal) => meal.date === today && meal.meal_type === "drink" && meal.water_amount
    )
    .reduce((sum, meal) => sum + parseFloat(meal.water_amount || 0), 0);

  const activitySummaryWithWater = {
    ...dashboardData.activity_summary,
    water_intake: totalWater ?? dashboardData.activity_summary?.water_intake,
    sleep: dashboardData.activity_summary.sleep_hours_today,
    calories_burned: dashboardData.activity_summary.calories_burned_today,
  };

  return (
  <div className="container py-4 custom-wrap">
    <h2 className="mb-4 text-center custom-heading page-title">
      Welcome back, {profile.username || "User"}!
    </h2>
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <ActivitySummary
          data={activitySummaryWithWater}
          profile={profile}
        />
      </div>
      <div className="col-12 col-lg-6">
        <WorkoutNutrition
          data={dashboardData.workout_nutrition}
          refreshDashboardData={fetchDashboardData}
        />
      </div>
      <div className="col-12 col-lg-6">
        <DailyGoals data={dashboardData.daily_goals} />
      </div>
      <div className="col-12 col-lg-6">
        <ProgressAnalytics data={dashboardData.analytics} />
      </div>
      <div className="col-12">
        <ChallengesMotivation data={dashboardData.challenges} />
      </div>
    </div>
  </div>
);
};

export default UserDash;
