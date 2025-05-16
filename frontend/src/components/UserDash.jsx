import React, { useEffect, useState } from "react";
import api from "../utils/api";
import ActivitySummary from "./ActivitySummary";
import WorkoutNutrition from "./WorkoutNutrition";
import DailyGoals from "./DailyGoals";
import ProgressAnalytics from "./ProgressAnalytics";
import ChallengesMotivation from "./ChallengesMotivation";
import { format } from "date-fns";

const UserDash = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [exercises, setExercises] = useState(null);
  const [meals, setMeals] = useState(null);
  const [error, setError] = useState(null);


  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/");
      setDashboardData(res.data);
    } catch (err) {
        setError("Failed to load dashboard");
        console.error(err);
      }
  };

  // Fetch exercise logs
  const fetchExercises = async () => {
  try {
    const today = format(new Date(), "yyyy-MM-dd");
    const res = await api.get(`/exercises/?date=${today}`);
    setExercises(res.data.results || []);
  } catch (err) {
    console.error("Failed to load today's exercises", err);
  }
};

  // Fetch meal logs
  const fetchMeals = async () => {
    try {
      const res = await api.get("/meals/");
      setMeals(res.data.results || []);
    } catch (err) {
      setError("Failed to load meals");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchExercises();
    fetchMeals();
  }, []);

  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!dashboardData) return <div className="text-center mt-5">Loading...</div>;

  // Calculate total calories burned from exercise logs
  const todaysCaloriesBurned =
    exercises?.reduce((sum, exercise) => sum + parseFloat(exercise.calories_burned), 0) || 0;

  // Calculate total water from meal logs
  const totalWater =
    meals?.filter((meal) => meal.meal_type === "drink" && meal.water_amount)
          .reduce((sum, meal) => sum + parseFloat(meal.water_amount), 0) || 0;

   // Merge water intake into activity summary
  const activitySummaryWithWater = {
    ...dashboardData.activity_summary,
    water_intake: totalWater ?? dashboardData.activity_summary?.water_intake,
  };

  return (
    <div className="container py-4 custom-wrap">
      <h2 className="mb-4 text-center custom-heading">
        Welcome back, {dashboardData.user.first_name || "User"}!
      </h2>
      <div className="row g-4">
        <div className="col-md-6">
          <ActivitySummary data={{...activitySummaryWithWater, calories_burned: todaysCaloriesBurned}} />
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
