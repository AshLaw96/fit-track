import React from "react";

const DailyGoals = ({ data }) => {
  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Daily Goals Progress</h4>
      {Object.entries(data || {}).map(([goal, { goal: g, current }]) => {
        const percent = Math.min((current / g) * 100, 100);
        return (
          <div key={goal} className="mb-2">
            <label>{goal.charAt(0).toUpperCase() + goal.slice(1)}:</label>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
              >
                {Math.round(percent)}%
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyGoals;
