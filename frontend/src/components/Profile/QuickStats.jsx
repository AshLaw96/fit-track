import React, { useEffect, useState, useRef } from "react";
import { useNotifications } from "../../contexts/NotificationContext";
import { triggerNotification } from "../../utils/NotificationTriggers";
import api from "../../utils/api";
import AchievementStars from "./AchievementStars";
import { CheckCircle, XCircle } from "lucide-react";

const QuickStats = ({ achievements }) => {
  const [challengeHistory, setChallengeHistory] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const { addNotification } = useNotifications();
  const notifiedRef = useRef(false);

  // Load challenge history
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.get("/user_challenges/");
        const challenges = Array.isArray(res.data) ? res.data : [res.data];
        const today = new Date();

        const processed = challenges
          .map((c) => {
            const endDate = c.end_date ? new Date(c.end_date) : null;
            const completed = c.completed || (c.progress >= (c.target_value || 1));
            const failed = !completed && endDate && today > endDate;

            return {
              id: c.id,
              title: c.title || c.challenge_title || "Untitled",
              start_date: c.start_date,
              end_date: c.end_date,
              status: completed ? "Completed" : failed ? "Failed" : "In Progress",
              sortKey: endDate || new Date(0),
            };
          })
          .filter((c) => c.status !== "In Progress")
          .sort((a, b) => b.sortKey - a.sortKey);

        setChallengeHistory(processed);
      } catch (err) {
        console.error("Error fetching challenge history:", err);
      } finally {
        setLoadingChallenges(false);
      }
    };

    fetchChallenges();
  }, []);

  // Load user streak count
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await api.get("/activity/streak/");
        const streak = res.data.streak_count || 0;
        setActiveCount(streak);

        if (streak >= 7 && !notifiedRef.current) {
          triggerNotification(addNotification, "streak", { count: streak });
          notifiedRef.current = true;
        }
      } catch (err) {
        console.error("Failed to fetch activity streak:", err);
        setActiveCount(0);
      }
    };

    fetchActivity();
  }, [addNotification]);

  return (
    <div className="card p-4 mt-4 shadow-sm">
      <h5 className="custom-heading text-center mb-3">Quick Stats</h5>

      {/* Active Days */}
      <div className="text-center mb-3" id="active-days">
        <p className="text-muted small mb-1">Active Days</p>
        <h3 className="fw-bold text-primary">{activeCount}</h3>
      </div>

      {/* Challenge History */}
      <div id="challenge-history" className="mt-3">
        <h6 className="text-center fw-bold">Challenge History</h6>
        {loadingChallenges ? (
          <p className="text-center text-muted small">Loading challenge history...</p>
        ) : challengeHistory.length === 0 ? (
          <p className="text-center text-muted small">No completed or failed challenges yet.</p>
        ) : (
          <ul className="list-group">
            {challengeHistory.map((c) => (
              <li
                key={c.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{c.title}</strong>
                  <div className="text-muted small">
                    {c.start_date} → {c.end_date}
                  </div>
                </div>
                <span
                  className={`badge ${
                    c.status === "Completed" ? "bg-success" : "bg-danger"
                  } d-flex align-items-center`}
                >
                  {c.status === "Completed" ? (
                    <CheckCircle size={16} className="me-1" />
                  ) : (
                    <XCircle size={16} className="me-1" />
                  )}
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Achievements */}
      <div className="mt-4" id="achievements">
        <h6 className="text-center fw-bold">Achievements</h6>
        <div className="d-flex justify-content-around mt-2">
          {["Sleep", "Diet", "Fitness"].map((label) => (
            <AchievementStars
              key={label}
              label={label}
              count={achievements[label.toLowerCase()] || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
