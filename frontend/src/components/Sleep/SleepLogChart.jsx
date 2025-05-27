import React, { useState, useMemo } from "react";
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

  // Call hooks unconditionally
  const filteredLogs = useMemo(() => {
    if (!Array.isArray(logs)) return [];
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - (view === "week" ? 7 : 30));
    return logs.filter((log) => new Date(log.date) >= cutoff);
  }, [logs, view]);

  const validDurations = useMemo(() => {
    return filteredLogs
      .map((log) => (log.duration_hours != null ? parseFloat(log.duration_hours) : NaN))
      .filter((d) => !isNaN(d));
  }, [filteredLogs]);

  const userAvg = useMemo(() => Number(average(validDurations).toFixed(1)), [validDurations]);

  // Now conditionally render
  if (!Array.isArray(logs)) {
    return <div className="text-muted">No sleep data available yet.</div>;
  }

  if (filteredLogs.length === 0 || validDurations.length === 0) {
    return (
      <div className="card p-3 mt-4 shadow-sm text-muted">
        Not enough data to display chart.
      </div>
    );
  }

  const avgUserAvg = view === "week" ? 7.5 : 7.2;
  const showBadge = userAvg >= 8;

  return (
    <div className="card p-3 mt-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" aria-label="Sleep Duration Comparison">
          Sleep Duration Comparison
        </h5>
        <div className="btn-group btn-group-sm" role="group" aria-label="Select time range">
          <button
            className={`btn ${view === "week" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("week")}
            aria-pressed={view === "week"}
          >
            Weekly
          </button>
          <button
            className={`btn ${view === "month" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setView("month")}
            aria-pressed={view === "month"}
          >
            Monthly
          </button>
        </div>
      </div>

      {userAvg < 6 && (
        <div className="alert alert-warning mb-2" role="alert" aria-live="polite">
          ⚠️ Your {view} average sleep is below 6 hours. Consider adjusting your sleep habits.
        </div>
      )}

      {showBadge && (
        <div className="alert alert-success mb-2" role="alert" aria-live="polite">
          🏆 Great job! Your {view} average sleep is {userAvg} hrs. Keep it up!
        </div>
      )}

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={[{
          name: `${view === "week" ? "Weekly" : "Monthly"} Avg`,
          "Your Sleep": userAvg,
          "Avg User": avgUserAvg,
        }]}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 10]} label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => `${value} hrs`} />
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
