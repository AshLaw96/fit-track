import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import "../../styles/AchievementStars.css";

const AchievementStars = ({ count = 0, label = "" }) => {
  const maxStars = 3;
  const isMaxed = count >= maxStars;

  return (
    <div className="text-center">
      <p className="mb-1">{label}</p>
      <div className="d-flex justify-content-center align-items-center gap-1">
        {Array.from({ length: maxStars }).map((_, i) => {
          const filled = i < count;
          return filled ? (
            <FaStar
              key={i}
              className={`achievement-star ${
                isMaxed ? "text-success" : "text-accent"
              }`}
              aria-label="Achieved"
            />
          ) : (
            <FaRegStar
              key={i}
              className="text-muted achievement-star"
              aria-label="Not achieved"
            />
          );
        })}
        {isMaxed && (
          <Badge bg="success" className="ms-2">
            Level Up!
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AchievementStars;
