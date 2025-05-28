import React from "react";
import { Link } from "react-router-dom";
import { useUnits } from "../../contexts/UnitsContext";

const ActivitySummary = ({ data, profile }) => {
  const { units } = useUnits();
  const { avg_sleep_hours, steps, calories_burned, water_intake } = data || {};
  const sleep = avg_sleep_hours;
  const weightKg = profile?.weight_kg ?? 0;

  // Convert weight
  const displayWeight = (() => {
    switch (units.weight) {
      case "pounds":
        return `${(weightKg * 2.205).toFixed(1)} lbs`;
      case "grams":
        return `${(weightKg * 1000).toFixed(0)} g`;
      case "kilograms":
      default:
        return `${weightKg} kg`;
    }
  })();

  // Convert water intake
  const displayWaterIntake = (() => {
    if (water_intake == null) return units.volume === "gallons" ? "0 gal" : units.volume === "milliliters" ? "0 mL" : "0 L";

    switch (units.volume) {
      case "gallons":
        return `${(water_intake * 0.264172).toFixed(2)} gal`;
      case "milliliters":
        return `${(water_intake * 1000).toFixed(0)} mL`;
      case "liters":
      default:
        return `${water_intake.toFixed(1)} L`;
    }
  })();

  const hasData =
    avg_sleep_hours != null ||
    steps != null ||
    calories_burned != null ||
    weightKg != null ||
    water_intake != null;

  if (!hasData) {
    return (
      <div className="card p-3 shadow">
        <h5 className="mb-3">Today's Activity Summary</h5>
        <div className="text-muted">
          No activity data yet. Start logging your day!
        </div>
      </div>
    );
  }

  return (
    <section className="card p-3 shadow" aria-label="Today's Activity Summary">
      <h5 className="mb-3">Today's Activity Summary</h5>

      <div>
        🛌 Sleep:{" "}
        {sleep != null ? (
          <Link to="/sleep" className="text-decoration-underline">
            {sleep.toFixed(1)} hrs
          </Link>
        ) : (
          "0 hrs"
        )}
      </div>

      <div>
        👣 Steps:{" "}
        {steps != null ? (
          <Link to="/exercises" className="text-decoration-underline">
            {steps.toLocaleString()}
          </Link>
        ) : (
          0
        )}
      </div>

      <div>
        🔥 Calories Burned:{" "}
        {calories_burned != null ? (
          <Link to="/exercises" className="text-decoration-underline">
            {calories_burned.toLocaleString()}
          </Link>
        ) : (
          0
        )}
      </div>

      <div>
        ⚖️ Weight:{" "}
        <Link to="/profile" className="text-decoration-underline">
          {displayWeight}
        </Link>
      </div>

      <div>
        💧 Water Intake:{" "}
        <Link to="/meals?filter=water" className="text-decoration-underline">
          {displayWaterIntake}
        </Link>
      </div>
    </section>
  );
};

export default ActivitySummary;
