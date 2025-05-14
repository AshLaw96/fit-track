import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const WorkoutNutrition = ({ data }) => {
  const { workouts = [], nutrition = {} } = data || {};
  const hasWorkouts = workouts.length > 0;
  const hasMacros = nutrition?.protein || nutrition?.carbs || nutrition?.fats;

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Workout & Nutrition</h4>

      <div>
        <strong>Recent Workouts:</strong>
        {hasWorkouts ? (
          <ul>
            {workouts.map((w, i) => (
              <li key={i}>{w.type} - {w.duration}</li>
            ))}
          </ul>
        ) : (
          <div className="text-muted">No workouts logged yet.</div>
        )}
      </div>

      <div className="mt-3">
        <strong>Macronutrients:</strong>
        {hasMacros ? (
          <Pie
            data={{
              labels: ["Protein", "Carbs", "Fats"],
              datasets: [{
                data: [nutrition.protein, nutrition.carbs, nutrition.fats],
                backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
              }],
            }}
          />
        ) : (
          <div className="text-muted">No nutrition data available yet.</div>
        )}
      </div>
    </div>
  );
};

export default WorkoutNutrition;