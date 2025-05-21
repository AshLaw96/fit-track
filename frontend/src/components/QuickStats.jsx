import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../utils/api"; // or your API utility

const QuickStats = ({ activeCount, achievements }) => {
  const [challengeProgress, setChallengeProgress] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await api.get("/user_challenges/");
        const formatted = res.data.map((uc) => ({
          name: uc.title,
          progress: uc.progress,
          target: uc.target,
          percent: Math.min((uc.progress / uc.target) * 100, 100),
        }));
        setChallengeProgress(formatted);
      } catch (err) {
        console.error("Error fetching challenge data:", err);
      }
    };

    fetchChallenges();
  }, []);

  const renderStars = (count) =>
    Array.from({ length: 3 }).map((_, i) =>
      i < count ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />
    );

  return (
    <div className="card p-3">
      <h5 className="custom-heading text-center mb-3">Quick Stats</h5>
      <div className="text-center mb-3">
        <p className="text-muted small mb-1">Active Days</p>
        <h3 className="fw-bold text-primary">{activeCount}</h3>
      </div>

      {/* Challenge Progress Bar Chart */}
      {challengeProgress.length > 0 && (
        <>
          <h6 className="text-center fw-bold">Challenge Progress</h6>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={challengeProgress}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(val) => `${val.toFixed(1)}%`} />
              <Bar dataKey="percent" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {/* Achievements */}
      <div className="mt-4">
        <h6 className="text-center fw-bold">Achievements</h6>
        <div className="d-flex justify-content-around mt-2">
          {["Sleep", "Diet", "Fitness"].map((label) => (
            <div key={label} className="text-center">
              <p className="mb-1">{label}</p>
              <div>{renderStars(achievements[label.toLowerCase()] || 0)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
