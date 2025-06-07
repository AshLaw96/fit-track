import React from "react";
import { useNotifications } from "../contexts/NotificationContext";
import { triggerNotification } from "../utils/triggerNotification";

const NotificationTester = () => {
  const { addNotification } = useNotifications();

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", margin: "1rem" }}>
      <h3>Notification Tester</h3>
      <button onClick={() => triggerNotification(addNotification, "sleep")}>
        Trigger Sleep
      </button>
      <button onClick={() => triggerNotification(addNotification, "leaderboard", { rank: 2 })}>
        Trigger Leaderboard Rank
      </button>
      <button onClick={() => triggerNotification(addNotification, "challenge")}>
        Trigger Challenge Reminder
      </button>
      <button onClick={() => triggerNotification(addNotification, "streak", { count: 7 })}>
        Trigger Streak
      </button>
    </div>
  );
};

export default NotificationTester;