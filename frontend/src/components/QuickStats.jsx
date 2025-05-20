import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const QuickStats = ({ activeCount, achievements }) => {
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

      <div className="d-flex justify-content-center align-items-end gap-2 mb-4" style={{ height: "100px" }}>
        {[60, 30, 80, 100, 50].map((h, i) => (
          <div key={i} className="bg-secondary rounded" style={{ width: "10px", height: `${h}%` }}></div>
        ))}
      </div>

      <div>
        <h6 className="text-center fw-bold">Achievements</h6>
        <div className="d-flex justify-content-around mt-2">
          {["Sleep", "Diet", "Fitness"].map((label) => (
            <div key={label} className="text-center">
              <p className="mb-1">{label}</p>
              <div>{renderStars(achievements[label.toLowerCase()])}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
