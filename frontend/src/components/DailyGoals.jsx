import React, { useEffect, useRef, useMemo } from "react";
import { useNotifications } from "../contexts/NotificationContext";
import { triggerNotification } from "../utils/NotificationTriggers";

const DailyGoals = ({ data }) => {
  const daily = useMemo(() => data?.daily || {}, [data]);
  const goals = data?.goals || [];
  const { addNotification } = useNotifications();
  const notifiedRef = useRef(false);

  const hasDailyGoals = Object.keys(daily).length > 0;

  useEffect(() => {
    if (!hasDailyGoals || notifiedRef.current) return;

    const allMet = Object.values(daily).every(({ goal, current }) => current >= goal);
    if (allMet) {
      triggerNotification(addNotification, "daily-goal");
      notifiedRef.current = true;
    }
  }, [daily, hasDailyGoals, addNotification]);

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
