import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const QuickStats = ({ activeCount, achievements }) => {
  const renderStars = (count) =>
    Array.from({ length: 3 }).map((_, i) =>
      i < count ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} />
    );

  return (
    <div className="border-top mt-4 pt-3">
      <h5 className="fw-bold">Quick Stats Summary</h5>
      <p className="text-muted small mb-1">Active</p>
      <h3>{activeCount}</h3>

      {/* Placeholder Bar Graph */}
      <div className="d-flex justify-content-center align-items-end gap-1 my-3" style={{ height: "100px" }}>
        {[60, 30, 80, 100, 50].map((h, i) => (
          <div key={i} className="bg-secondary" style={{ width: "10px", height: `${h}%` }}></div>
        ))}
      </div>

      <div>
        <h6 className="fw-bold">Achievements</h6>
        <div className="d-flex justify-content-around">
          {["Sleep", "Diet", "Fitness"].map((label, idx) => (
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
