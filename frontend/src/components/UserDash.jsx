import React, { useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import ActivitySummary from "./ActivitySummary";
import WorkoutNutrition from "./WorkoutNutrition";
import DailyGoals from "./DailyGoals";
import ProgressAnalytics from "./ProgressAnalytics";
import ChallengesMotivation from "./ChallengesMotivation";
import { format, subDays, eachDayOfInterval } from "date-fns";
import { estimateStepsFromExercise } from "../utils/stepEstimator";

const UserDash = ({ dashboardData, fetchAllData }) => {
  const [exercises, setExercises] = useState([]);
  const [meals, setMeals] = useState([]);
  const [sleepLogs, setSleepLogs] = useState([]);
  const [profile, setProfile] = useState({ username: "User" });
  const [challengeData, setChallengeData] = useState({});

  const fetchLogs = useCallback(async () => {
    try {
      const [mealsRes, exercisesRes, sleepRes] = await Promise.all([
        api.get("/meals/"),
        api.get("/exercises/"),
        api.get("/sleep_logs/"),
      ]);
      setMeals(mealsRes.data?.results || []);
      setExercises(exercisesRes.data?.results || []);
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

  const fetchChallengeData = async () => {
    try {
      const res = await api.get("/challenges/");
      setChallengeData(res.data);
    } catch (err) {
      console.error("Failed to fetch challenges:", err);
    }
  }

  useEffect(() => {
    fetchChallengeData();
  }, []);

  if (!dashboardData || !exercises || !meals || !sleepLogs) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const today = format(new Date(), "yyyy-MM-dd");

  const todaysCaloriesBurned = exercises
    .filter((ex) => ex.date === today)
    .reduce((sum, ex) => sum + parseFloat(ex.calories_burned || 0), 0);

  const totalWater = meals
    .filter((meal) => meal.date === today && meal.meal_type === "drink" && meal.water_amount)
    .reduce((sum, meal) => sum + parseFloat(meal.water_amount || 0), 0);

  const todaySleep = sleepLogs
    .filter((log) => log.date === today)
    .reduce((sum, log) => sum + parseFloat(log.duration_hours || 0), 0);

  const activitySummaryWithWater = {
    ...dashboardData.activity_summary,
    water_intake: totalWater ?? dashboardData.activity_summary?.water_intake,
  };

  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  }).map((d) => format(d, "yyyy-MM-dd"));

  const weeklyTrends = {
    dates: last7Days,
    steps: last7Days.map((date) =>
      exercises
        .filter((ex) => ex.date === date)
        .reduce((sum, ex) => sum + estimateStepsFromExercise(ex), 0)
    ),
    sleep_hours: last7Days.map((date) =>
      sleepLogs
        .filter((log) => log.date === date)
        .reduce((sum, log) => sum + parseFloat(log.duration_hours || 0), 0)
    ),
    calories_burned: last7Days.map((date) =>
      exercises
        .filter((ex) => ex.date === date)
        .reduce((sum, ex) => sum + parseFloat(ex.calories_burned || 0), 0)
    ),
    water_intake: last7Days.map((date) =>
      meals
        .filter((meal) => meal.date === date && meal.meal_type === "drink" && meal.water_amount)
        .reduce((sum, meal) => sum + parseFloat(meal.water_amount || 0), 0)
    ),
  };

  return (
    <div className="container py-4 custom-wrap">
      <h2 className="mb-4 text-center custom-heading">
        Welcome back, {profile.username || "User"}!
      </h2>
      <div className="row g-4">
        <div className="col-md-6">
          <ActivitySummary
            data={{
              ...activitySummaryWithWater,
              calories_burned: todaysCaloriesBurned,
              sleep: todaySleep.toFixed(1),
            }}
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
          <ProgressAnalytics
            data={{
              ...dashboardData.analytics,
              weekly_trends: weeklyTrends,
            }}
          />
        </div>
        <div className="col-md-12">
          <ChallengesMotivation data={challengeData} refreshData={fetchChallengeData} />
        </div>
      </div>
    </div>
  );
};

export default UserDash;
