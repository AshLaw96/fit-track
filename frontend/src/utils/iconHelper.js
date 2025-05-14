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
} from "react-icons/fa";

const iconMap = {
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
  const match = Object.keys(iconMap).find((key) => lower.includes(key));
  return iconMap[match] || <FaQuestionCircle />;
};
