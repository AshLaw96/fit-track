export const triggerNotification = (addNotification, type, data = {}) => {
  const generateId = () =>
    `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

  switch (type) {
    case "sleep":
      return addNotification({
        id: generateId(),
        title: "Sleep Reminder ⏰",
        description: "Your bedtime is coming up. Time to wind down.",
        link: "/sleep/#alarm-setting",
      });

    case "goal":
      return addNotification({
        id: generateId(),
        title: "Daily Goal Achieved 🎯",
        description: "You've completed today's goal!",
        link: "/profile/#achievements",
      });

    case "leaderboard":
      return addNotification({
        id: generateId(),
        title: "Leaderboard Rank Changed 🏆",
        description: `You've moved to #${data.rank}!`,
        link: "/#leaderboard",
      });

    case "challenge":
      return addNotification({
        id: generateId(),
        title: "Challenge Ending Soon ⏳",
        description:
          "Only 1 day left to complete your challenge. Give it your best shot!",
        link: "/#active-challenge",
      });

    case "streak":
      return addNotification({
        id: generateId(),
        title: `${data.count}-Day Streak! 🎉`,
        description:
          "Amazing consistency! You've achieved 7 days straight streak.",
        link: "/profile/#active-days",
      });

    case "reminder":
      return addNotification({
        id: generateId(),
        title: "New Day, New Energy 💪",
        description: "Make today count. You're stronger than you think.",
        link: "/",
      });

    default:
      return null;
  }
};
