import React from "react";

const ActivitySummary = ({ data }) => {
  return (
    <div className="card p-3 shadow">
      <h5 className="mb-3">Today's Activity Summary</h5>
      <div>🛌 Sleep: {data.sleep} hrs</div>
      <div>👣 Steps: {data.steps}</div>
      <div>🔥 Calories Burned: {data.calories_burned}</div>
      <div>⚖️ Weight: {data.weight} kg</div>
      <div>💧 Water Intake: {data.water_intake} L</div>
    </div>
  );
};

export default ActivitySummary;
