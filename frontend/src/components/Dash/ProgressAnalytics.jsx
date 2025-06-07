import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ProgressAnalytics = ({ data }) => {
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
    weekly_trends: {
    dates = [],
    steps = [],
    sleep_hours = [],
    calories_burned = [],
    water_intake = [],
  } = {},
  } = data;

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

      {Array.isArray(steps) && steps.some(v => v > 0) && (
        <div className="mb-4">
          <Bar data={chartData("Steps", steps, "#4caf50")} />
        </div>
      )}

      {Array.isArray(sleep_hours) && sleep_hours.some(v => v > 0) && (
        <div className="mb-4">
          <Bar data={chartData("Sleep (hrs)", sleep_hours, "#3f51b5")} />
        </div>
      )}

      {Array.isArray(calories_burned) && calories_burned.some(v => v > 0) && (
        <div className="mb-4">
          <Bar data={chartData("Calories Burned", calories_burned, "#ff9800")} />
        </div>
      )}

      {Array.isArray(water_intake) && water_intake.some(v => v > 0) && (
        <div className="mb-4">
          <Bar data={chartData("Water Intake (L)", water_intake, "#00bcd4")} />
        </div>
      )}

      {/* Show empty message only if all arrays are empty or invalid */}
      {![
        ...(Array.isArray(steps) ? steps : []),
        ...(Array.isArray(sleep_hours) ? sleep_hours : []),
        ...(Array.isArray(calories_burned) ? calories_burned : []),
        ...(Array.isArray(water_intake) ? water_intake : []),
      ].some(v => v > 0) && (
        <div className="text-center text-muted my-5">
          No progress data available yet. Start logging your activity to see trends here!
        </div>
      )}
    </div>
  );
};

export default ProgressAnalytics;
