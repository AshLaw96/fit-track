import React from "react";
import { Link } from "react-router-dom";

const ActivitySummary = ({ data }) => {
  const { sleep, steps, calories_burned, weight, water_intake } = data || {};

  const hasData =
    sleep || steps || calories_burned || weight || water_intake;

  if (!hasData) {
    return (
      <div className="card p-3 shadow">
        <h5 className="mb-3">Today's Activity Summary</h5>
        <div className="text-muted">No activity data yet. Start logging your day!</div>
      </div>
    );
  }

  return (
    <div className="card p-3 shadow">
      <h5 className="mb-3">Today's Activity Summary</h5>
      <div>
        🛌 Sleep:{" "}
        {sleep ? (
          <Link to="/sleep" className="text-decoration-underline">
            {sleep} hrs
          </Link>
        ) : (
          "0 hrs"
        )}
      </div>
      <div>👣 Steps: {steps}</div>
      <div>🔥 Calories Burned: {calories_burned}</div>
      <div>⚖️ Weight: {weight} kg</div>
      <div>
        💧 Water Intake:{" "}
        {water_intake ? (
          <Link to="/meals?filter=water" className="text-decoration-underline">
            {water_intake} L
          </Link>
        ) : (
          "0 L"
        )}
      </div>
    </div>
  );
};

export default ActivitySummary;
