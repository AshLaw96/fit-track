import React from "react";
import { Link } from "react-router-dom";

const ActivitySummary = ({ data, profile }) => {
  const { avg_sleep_hours, steps, calories_burned, water_intake } = data || {};
  const sleep = avg_sleep_hours;

  // Extract weight safely from profile
  const weight = profile?.weight_kg ?? 0;

  // Handle unit display
  const displayWeight =
    profile?.unit_preference === "imperial"
      ? `${(weight * 2.205).toFixed(1)} lbs`
      : `${weight} kg`;

  const hasData =
  avg_sleep_hours != null ||
  steps != null ||
  calories_burned != null ||
  weight != null ||
  water_intake != null;

  if (!hasData) {
    return (
      <div className="card p-3 shadow">
        <h5 className="mb-3">Today's Activity Summary</h5>
        <div className="text-muted">No activity data yet. Start logging your day!</div>
      </div>
    );
  }

  return (
    <section className="card p-3 shadow" aria-label="Today's Activity Summary">
      <h5 className="mb-3">Today's Activity Summary</h5>
      <div>
        🛌 Sleep:{" "}
        {sleep != null ? (
          <Link to="/sleep" className="text-decoration-underline">
            {sleep.toFixed(1)} hrs
          </Link>
        ) : (
          "0 hrs"
        )}
      </div>
      <div>
        👣 Steps:{" "}
        {steps != null ? (
          <Link to="/exercises" className="text-decoration-underline">
            {steps.toLocaleString()}
          </Link>
        ) : (
          0
        )}
      </div>
      <div>
        🔥 Calories Burned:{" "}
        {calories_burned != null ? (
          <Link to="/exercises" className="text-decoration-underline">
            {calories_burned.toLocaleString()}
          </Link>
        ) : (
          0
        )}
      </div>
      <div>
        ⚖️ Weight:{" "}
        {weight ? (
          <Link to="/profile" className="text-decoration-underline">
            {displayWeight}
          </Link>
        ) : (
          "0 kg"
        )}
      </div>
      <div>
        💧 Water Intake:{" "}
        {water_intake != null ? (
          <Link to="/meals?filter=water" className="text-decoration-underline">
            {water_intake.toFixed(1)} L
          </Link>
        ) : (
          "0 L"
        )}
      </div>
    </section>
  );
};

export default ActivitySummary;
