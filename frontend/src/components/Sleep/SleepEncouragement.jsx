import React, { useEffect, useState } from "react";

const tips = [
  "Establish a regular bedtime routine!",
  "Avoid screens 1 hour before bed.",
  "Keep your bedroom cool and dark.",
  "Try deep breathing before sleep.",
  "Limit caffeine after noon.",
  "Avoid heavy meals close to bedtime.",
  "Exercise regularly but not right before bed.",
  "Use your bed only for sleep and intimacy.",
  "Reduce noise with earplugs or white noise machines.",
  "Limit naps to 20-30 minutes earlier in the day.",
  "Try reading a book to relax before sleeping.",
  "Avoid alcohol close to bedtime as it disrupts sleep.",
  "Make sure your mattress and pillows are comfortable.",
  "Dim the lights as you wind down.",
  "Practice mindfulness or meditation to calm your mind.",
  "Keep a consistent wake-up time, even on weekends.",
  "Avoid drinking too many liquids before bed.",
  "Write down your worries to clear your mind.",
  "Try aromatherapy with lavender to promote relaxation.",
  "Limit exposure to bright lights at night.",
];

const calculateAverage = (arr) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

const SleepEncouragement = ({ logs }) => {
  const [tip, setTip] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Pick an initial tip
    setTip(tips[Math.floor(Math.random() * tips.length)]);

    // Setup interval to change tip every 60 seconds
    const interval = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Array.isArray(logs) && logs.length > 0) {
      const validDurations = logs
        .map((log) => parseFloat(log.duration_hours))
        .filter((d) => !isNaN(d));

      const userAvg = calculateAverage(validDurations);
      const benchmarkAvg = 7.5;

      if (userAvg >= benchmarkAvg) {
        setFeedback(`💤 Great job! Your average sleep is ${userAvg.toFixed(1)} hours. Keep it up!`);
      } else if (userAvg >= 6) {
        setFeedback(`😴 You're getting some rest, but your average sleep is ${userAvg.toFixed(1)} hours. Try to aim for 7-8 hours!`);
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
