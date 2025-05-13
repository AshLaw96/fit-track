import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const ProgressAnalytics = ({ data }) => {
  const { weight, sleep, strength, periods } = data || {};

  const chartData = (label, values) => ({
    labels: periods,
    datasets: [
      {
        label,
        data: values,
        fill: false,
        borderColor: "#007bff",
        tension: 0.4,
      },
    ],
  });

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Progress & Analytics</h4>
      <div className="mb-4">
        <Line data={chartData("Weight", weight)} />
      </div>
      <div className="mb-4">
        <Line data={chartData("Sleep (hrs)", sleep)} />
      </div>
      <div>
        <Line data={chartData("Strength", strength)} />
      </div>
    </div>
  );
};

export default ProgressAnalytics;