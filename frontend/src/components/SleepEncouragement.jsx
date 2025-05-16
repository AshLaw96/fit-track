import React, { useEffect, useState } from "react";

const messages = [
  "Establish a regular bedtime routine!",
  "Avoid screens 1 hour before bed.",
  "Keep your bedroom cool and dark.",
  "Try deep breathing before sleep.",
  "Limit caffeine after noon."
];

const getRandomMessage = (exclude) => {
  const filtered = messages.filter(msg => msg !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
};

const SleepEncouragement = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(getRandomMessage(""));
  }, []);

  const handleNewMessage = () => {
    setMessage(getRandomMessage(message));
  };

  return (
    <div className="card p-3 shadow-sm mt-3">
      <h5>Feedback & Encouragement</h5>
      <p>🌙 {message}</p>
      <button className="btn btn-sm btn-outline-primary mt-2" onClick={handleNewMessage}>
        Show Another Tip
      </button>
    </div>
  );
};

export default SleepEncouragement;
