export const triggerNotification = (addNotification, type, data = {}) => {
  switch (type) {
    case "sleep":
      return addNotification({
        title: "Sleep Reminder ⏰",
        description: "Your bedtime is coming up. Time to wind down.",
        link: "/sleep-tracker",
      });

    case "goal":
      return addNotification({
        title: "Daily Goal Achieved 🎯",
        description: "You've completed today's goal!",
        link: "/progress",
      });

    case "leaderboard":
      return addNotification({
        title: "Leaderboard Rank Changed 🏆",
        description: `You've moved to #${data.rank}!`,
        link: "/leaderboard",
      });

    case "challenge":
      return addNotification({
        title: "Challenge Ending Soon ⏳",
        description:
          "Only 1 day left to complete your challenge. Give it your best shot!",
        link: "/challenges",
      });

    case "streak":
      return addNotification({
        title: `${data.count}-Day Streak! 🎉`,
        description:
          "Amazing consistency! You've achieved 7 days straight steak.",
        link: "/progress",
      });

    case "reminder":
      return addNotification({
        title: "New Day, New Energy 💪",
        description: "Make today count. You're stronger than you think.",
        link: "/dashboard",
      });

    default:
      return null;
  }
};
