import React from "react";

const DailyGoals = ({ data }) => {
  const daily = data?.daily || {};
  const goals = data?.goals || [];

  const hasDailyGoals = Object.keys(daily).length > 0;

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Daily Goals Progress</h4>

      {/* Daily Target Goals */}
      {hasDailyGoals ? (
        Object.entries(daily).map(([goalKey, { goal, current }]) => {
          const percent = Math.min((current / goal) * 100, 100);
          return (
            <div key={goalKey} className="mb-3">
              <label>
                {goalKey.charAt(0).toUpperCase() + goalKey.slice(1)}:
              </label>
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
        })
      ) : (
        <p className="text-muted">No daily goals logged yet.</p>
      )}

      {/* Long-Term Goals */}
      <h5 className="mt-4">Your Goals</h5>
      {goals.length === 0 ? (
        <p className="text-muted">No long-term goals set yet.</p>
      ) : (
        goals.map((g, i) => {
          const percent = Math.min((g.progress / g.target_value) * 100, 100);
          return (
            <div key={i} className="mb-3">
              <label>{g.title}</label>
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
        })
      )}
    </div>
  );
};

export default DailyGoals;
