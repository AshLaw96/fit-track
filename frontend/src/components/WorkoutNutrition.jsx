import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const WorkoutNutrition = ({ data }) => {
  const { workouts, nutrition } = data || {};

  const pieData = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        data: [nutrition?.protein, nutrition?.carbs, nutrition?.fats],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
      },
    ],
  };

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Workout & Nutrition</h4>
      <div>
        <strong>Recent Workouts:</strong>
        <ul>
          {workouts?.map((w, i) => (
            <li key={i}>{w.type} - {w.duration}</li>
          )) || <li>No workouts logged</li>}
        </ul>
      </div>
      <div className="mt-3">
        <strong>Macronutrients:</strong>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default WorkoutNutrition;