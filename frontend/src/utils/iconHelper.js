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
  FaBell,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaTools,
  FaHeadset,
  FaGraduationCap,
} from "react-icons/fa";
import {
  MdBreakfastDining,
  MdLunchDining,
  MdDinnerDining,
  MdDarkMode,
  MdOutlineLanguage,
  MdPassword,
} from "react-icons/md";
import { GiFruitBowl, GiMeal } from "react-icons/gi";

// Exercise Icons
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

// Meal Icons
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

// Settings Icons
export const Icons = {
  Password: MdPassword,
  Bell: FaBell,
  DarkMode: MdDarkMode,
  Language: MdOutlineLanguage,
  Lock: FaLock,
  Eye: FaEye,
  EyeSlash: FaEyeSlash,
};

// Help Icons
export const HelpIcons = {
  Tools: FaTools,
  Headset: FaHeadset,
  GraduationCap: FaGraduationCap,
  Question: FaQuestionCircle,
};
