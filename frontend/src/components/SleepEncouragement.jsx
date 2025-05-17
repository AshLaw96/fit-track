import React, { useEffect, useState } from "react";

// Static encouragement tips
const tips = [
  "Establish a regular bedtime routine!",
  "Avoid screens 1 hour before bed.",
  "Keep your bedroom cool and dark.",
  "Try deep breathing before sleep.",
  "Limit caffeine after noon."
];

// Helper to calculate average
const calculateAverage = (arr) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const SleepEncouragement = ({ logs }) => {
  const [tip, setTip] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // 1. Pick a random tip
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);

    // 2. Analyze user sleep logs
    if (Array.isArray(logs) && logs.length > 0) {
      const validDurations = logs
        .map((log) => parseFloat(log.duration_hours))
        .filter((d) => !isNaN(d));

      const userAvg = calculateAverage(validDurations);
      const benchmarkAvg = 7.5;

      // 3. Generate personalized feedback
      if (userAvg >= benchmarkAvg) {
        setFeedback(`💤 Great job! Your average sleep is ${userAvg.toFixed(1)} hours. Keep it up!`);
      } else if (userAvg >= 6) {
        setFeedback(`😴 You're getting some rest, but your average sleep is ${userAvg.toFixed(1)} hours. Try to aim for 7–8 hours!`);
      } else {
        setFeedback(`⚠️ Your average sleep is only ${userAvg.toFixed(1)} hours. Consider improving your sleep routine for better rest.`);
      }
    } else {
      setFeedback("Add some sleep logs to start tracking your sleep habits.");
    }
  }, [logs]);

  return (
    <div className="card p-3 shadow-sm mt-3">
      <h5>Feedback & Encouragement</h5>
      <p>{feedback}</p>
      <hr />
      <p><strong>Tip:</strong> {tip}</p>
    </div>
  );
};

export default SleepEncouragement;
