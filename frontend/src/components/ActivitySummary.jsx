import React from "react";
import { Link } from "react-router-dom";

const ActivitySummary = ({ data, profile }) => {
  const { sleep, steps, calories_burned, water_intake } = data || {};

  // pull directly from profile
  const weight = profile?.weight_kg;

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
      <div>
        👣 Steps:{} 
          {steps ? (
            <Link to="/exercises" className="text-decoration-underline">
              {steps}
            </Link>
          ) : (
            0
          )}
      </div>
      <div>
        🔥 Calories Burned:{}
          {calories_burned ? (
            <Link to="/exercises" className="text-decoration-underline">
              {calories_burned}
            </Link>
          ) : (
            0
          )}
      </div>
      <div>⚖️ Weight:{} 
        {weight ? ( 
          <Link to="/profile" className="text-decoration-underline">
            {weight} kg
          </Link>
        ) : (
          0 
          )} kg
      </div>
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
