import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ProgressAnalytics = ({ data }) => {
  // Early return if no data is passed
  if (!data || typeof data !== "object") {
    return (
      <div className="card p-3 shadow-sm">
        <h4 className="mb-3">Progress & Analytics</h4>
        <div className="text-center text-muted my-5">
          Loading analytics...
        </div>
      </div>
    );
  }

  const {
    total_daily_logs = 0,
    total_nutrition_logs = 0,
    weekly_trends = {},
  } = data;

  const {
    dates = [],
    steps = [],
    sleep_hours = [],
    calories_burned = [],
    water_intake = [],
  } = weekly_trends;

  const isEmpty = [steps, sleep_hours, calories_burned, water_intake].every(
    (arr) => Array.isArray(arr) && arr.every((v) => v === 0)
  );

  const chartData = (label, values, color) => ({
    labels: dates,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: color,
      },
    ],
  });

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Progress & Analytics</h4>

      <div className="mb-2 text-muted">
        Total Daily Logs: <strong>{total_daily_logs}</strong>
      </div>
      <div className="mb-4 text-muted">
        Total Nutrition Logs: <strong>{total_nutrition_logs}</strong>
      </div>

      {isEmpty ? (
        <div className="text-center text-muted my-5">
          No progress data available yet. Start logging your activity to see trends here!
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Bar data={chartData("Steps", steps, "#4caf50")} />
          </div>
          <div className="mb-4">
            <Bar data={chartData("Sleep (hrs)", sleep_hours, "#3f51b5")} />
          </div>
          <div className="mb-4">
            <Bar data={chartData("Calories Burned", calories_burned, "#ff9800")} />
          </div>
          <div className="mb-4">
            <Bar data={chartData("Water Intake (L)", water_intake, "#00bcd4")} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressAnalytics;
