import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const WorkoutNutrition = ({ data }) => {
  const { workouts = [], todays_macros = {} } = data || {};
  const hasWorkouts = workouts.length > 0;
  const hasMacros = todays_macros?.protein || todays_macros?.carbs || todays_macros?.fats;

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
                data: [todays_macros.protein, todays_macros.carbs, todays_macros.fats],
                backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
              }],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label = tooltipItem.label || "";
                      const value = tooltipItem.raw || 0;
                      return `${label}: ${value}g`;
                    },
                  },
                },
              },
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