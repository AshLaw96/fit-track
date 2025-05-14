import React from "react";

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
      <div>🛌 Sleep: {sleep} hrs</div>
      <div>👣 Steps: {steps}</div>
      <div>🔥 Calories Burned: {calories_burned}</div>
      <div>⚖️ Weight: {weight} kg</div>
      <div>💧 Water Intake: {water_intake} L</div>
    </div>
  );
};

export default ActivitySummary;
