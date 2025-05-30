import React, { useEffect, useState, useRef } from "react";
import { useNotifications } from "../../contexts/NotificationContext";
import { triggerNotification } from "../../utils/NotificationTriggers";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import api from "../../utils/api";
import AchievementStars from "./AchievementStars";

const QuickStats = ({ achievements }) => {
  const [challengeProgress, setChallengeProgress] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const { addNotification } = useNotifications();
  const notifiedRef = useRef(false);

  // Load challenge progress
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.get("/user_challenges/active/");
        const raw = Array.isArray(res.data) ? res.data : [res.data];
        const formatted = raw.map((uc) => {
          const percent =
            uc.target > 0 ? Math.min((uc.progress / uc.target) * 100, 100) : 0;
          return {
            name: uc.title,
            progress: uc.progress,
            target: uc.target,
            percent,
          };
        });
        setChallengeProgress(formatted);
      } catch (err) {
        console.error("Error fetching challenge data:", err);
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
      <div className="text-center mb-3">
        <p className="text-muted small mb-1">Active Days</p>
        <h3 className="fw-bold text-primary">{activeCount}</h3>
      </div>

      {/* Challenge Progress */}
      {loadingChallenges ? (
        <p className="text-center text-muted small">Loading challenge progress...</p>
      ) : challengeProgress.length > 0 ? (
        <>
          <h6 className="text-center fw-bold">Challenge Progress</h6>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={challengeProgress}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(val) => `${val.toFixed(1)}%`} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="percent" fill="#0d6efd" name="Completion %" />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p className="text-center text-muted small">No challenges found.</p>
      )}

      {/* Achievements */}
      <div className="mt-4">
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
