import {
  FaDumbbell,
  FaRunning,
  FaWalking,
  FaBiking,
  FaSwimmer,
  FaFootballBall,
  FaHeartbeat,
  FaQuestionCircle,
  FaSpa,
  FaCoffee,
} from "react-icons/fa";
import {
  MdBreakfastDining,
  MdLunchDining,
  MdDinnerDining,
} from "react-icons/md";
import { GiFruitBowl, GiMeal } from "react-icons/gi";

// Exercise icons
const exerciseIconMap = {
  run: <FaRunning />,
  jog: <FaRunning />,
  cardio: <FaHeartbeat />,
  gym: <FaDumbbell />,
  strength: <FaDumbbell />,
  football: <FaFootballBall />,
  soccer: <FaFootballBall />,
  walk: <FaWalking />,
  swim: <FaSwimmer />,
  bike: <FaBiking />,
  stretch: <FaSpa />,
  yoga: <FaSpa />,
  flexibility: <FaSpa />,
};

export const getExerciseIcon = (name) => {
  const lower = name.toLowerCase();
  const match = Object.keys(exerciseIconMap).find((key) => lower.includes(key));
  return exerciseIconMap[match] || <FaQuestionCircle />;
};

// Meal icons
export const getMealIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "breakfast":
      return <MdBreakfastDining title="Breakfast" />;
    case "lunch":
      return <MdLunchDining title="Lunch" />;
    case "dinner":
      return <MdDinnerDining title="Dinner" />;
    case "snacks":
      return <GiFruitBowl title="Snacks" />;
    case "drinks":
      return <FaCoffee title="Drinks" />;
    default:
      return <GiMeal title="Meal" />;
  }
};
