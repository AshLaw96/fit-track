import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from "recharts";

const average = (arr) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const SleepLogChart = ({ logs }) => {
  const [view, setView] = useState("week");

  if (!Array.isArray(logs)) {
    return <div className="text-muted">No sleep data available yet.</div>;
  }

  const today = new Date();
  const cutoff = new Date(today);
  cutoff.setDate(today.getDate() - (view === "week" ? 7 : 30));

  const filteredLogs = logs.filter(
    (log) => new Date(log.date) >= cutoff
  );

  const validDurations = filteredLogs
    .map((log) => parseFloat(log.duration_hours))
    .filter((d) => !isNaN(d));
  const userAvg = average(validDurations).toFixed(1);

  if (filteredLogs.length === 0 || validDurations.length === 0) {
    return (
      <div className="card p-3 mt-4 shadow-sm text-muted">
        Not enough data to display chart.
      </div>
    );
  }

  const avgUserAvg = view === "week" ? 7.5 : 7.2;

  const chartData = [
    {
      name: `${view === "week" ? "Weekly" : "Monthly"} Avg`,
      "Your Sleep": parseFloat(userAvg),
      "Avg User": avgUserAvg,
    },
  ];

  const showBadge = parseFloat(userAvg) >= 8;

  return (
    <div className="card p-3 mt-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" aria-label="Sleep Duration Comparison">
          Sleep Duration Comparison
        </h5>
        <div className="btn-group btn-group-sm">
          <button
            className={`btn ${view === "week" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("week")}
          >
            Weekly
          </button>
          <button
            className={`btn ${view === "month" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("month")}
          >
            Monthly
          </button>
        </div>
      </div>

      {parseFloat(userAvg) < 6 && (
        <div className="alert alert-warning mb-2">
          ⚠️ Your {view} average sleep is below 6 hours. Consider adjusting your sleep habits.
        </div>
      )}

      {showBadge && (
        <div className="alert alert-success mb-2">
          🏆 Great job! Your {view} average sleep is {userAvg} hrs. Keep it up!
        </div>
      )}

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Your Sleep" fill="#8884d8" animationDuration={800}>
            <LabelList dataKey="Your Sleep" position="top" />
          </Bar>
          <Bar dataKey="Avg User" fill="#82ca9d" animationDuration={800}>
            <LabelList dataKey="Avg User" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SleepLogChart;
