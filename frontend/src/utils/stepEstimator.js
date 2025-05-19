export const estimateStepsFromExercise = (ex) => {
  const duration = ex.duration || 0;
  switch (ex.type) {
    case "cardio":
      return duration * 120;
    case "strength":
      return duration * 60;
    case "flexibility":
      return duration * 30;
    case "sports":
      return duration * 100;
    default:
      return duration * 80;
  }
};
