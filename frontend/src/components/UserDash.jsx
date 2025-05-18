import React, { useEffect, useState } from "react";
import api from "../utils/api";
import ActivitySummary from "./ActivitySummary";
import WorkoutNutrition from "./WorkoutNutrition";
import DailyGoals from "./DailyGoals";
import ProgressAnalytics from "./ProgressAnalytics";
import ChallengesMotivation from "./ChallengesMotivation";
import { format, subDays } from "date-fns";

const UserDash = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [meals, setMeals] = useState([]);
  const [sleepLogs, setSleepLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [dashboard, exerciseData, mealData, sleepData] = await Promise.all([
        api.get("/dashboard/"),
        api.get("/exercises/"),
        api.get("/meals/"),
        api.get("/sleep_logs/")
      ]);

      setDashboardData(dashboard.data);
      setExercises(exerciseData.data.results || []);
      setMeals(mealData.data.results || []);
      setSleepLogs(sleepData.data.results || []);
    } catch (err) {
      setError("Failed to load dashboard");
      console.error(err);
    }
  };

  const getLast7Days = () => {
    return Array.from({ length: 7 }).map((_, i) =>
      format(subDays(new Date(), 6 - i), "yyyy-MM-dd")
    );
  };

  const weeklyTrends = () => {
    const dates = getLast7Days();
    const trends = {
      dates,
      calories_burned: [],
      sleep_hours: [],
      water_intake: [],
      steps: []
    };

    for (let date of dates) {
      const dailyExercises = exercises.filter((ex) => ex.date === date);
      const calories = dailyExercises.reduce((sum, ex) => sum + (parseFloat(ex.calories_burned) || 0), 0);
      trends.calories_burned.push(calories);

      const dailySleep = sleepLogs.filter((log) => log.date === date);
      const sleep = dailySleep.reduce((sum, log) => sum + (parseFloat(log.duration_hours) || 0), 0);
      trends.sleep_hours.push(sleep);

      const dailyDrinks = meals.filter(
        (meal) => meal.date === date && meal.meal_type === "drink"
      );
      const water = dailyDrinks.reduce((sum, drink) => sum + (parseFloat(drink.water_amount) || 0), 0);
      trends.water_intake.push(water);

      // Placeholder for steps (can replace with real data later)
      trends.steps.push(0);
    }

    return trends;
  };

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  // Show loading state until all data is loaded
  if (!dashboardData || !exercises.length || !meals.length || !sleepLogs.length) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const today = format(new Date(), "yyyy-MM-dd");

  const todaysCaloriesBurned =
    exercises
      .filter((ex) => ex.date === today)
      .reduce((sum, ex) => sum + parseFloat(ex.calories_burned || 0), 0);

  const totalWater =
    meals
      .filter((meal) => meal.date === today && meal.meal_type === "drink" && meal.water_amount)
      .reduce((sum, meal) => sum + parseFloat(meal.water_amount || 0), 0);

  const todaySleep =
    sleepLogs
      .filter((log) => log.date === today)
      .reduce((sum, log) => sum + parseFloat(log.duration_hours || 0), 0);

  const activitySummaryWithWater = {
    ...dashboardData.activity_summary,
    water_intake: totalWater ?? dashboardData.activity_summary?.water_intake,
  };

  const analytics = {
    total_daily_logs: exercises.length + sleepLogs.length,
    total_nutrition_logs: meals.length,
    weekly_trends: weeklyTrends()
  };

  return (
    <div className="container py-4 custom-wrap">
      <h2 className="mb-4 text-center custom-heading">
        Welcome back, {dashboardData.user?.first_name || "User"}!
      </h2>
      <div className="row g-4">
        <div className="col-md-6">
          <ActivitySummary data={{ ...activitySummaryWithWater, calories_burned: todaysCaloriesBurned, sleep: todaySleep.toFixed(1) }} />
        </div>
        <div className="col-md-6">
          <WorkoutNutrition data={dashboardData.workout_nutrition} />
        </div>
        <div className="col-md-6">
          <DailyGoals data={dashboardData.daily_goals} />
        </div>
        <div className="col-md-6">
          <ProgressAnalytics data={analytics} />
        </div>
        <div className="col-md-12">
          <ChallengesMotivation data={dashboardData.challenges} />
        </div>
      </div>
    </div>
  );
};

export default UserDash;
