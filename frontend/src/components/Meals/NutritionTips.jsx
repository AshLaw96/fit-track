import React, { useEffect, useState } from "react";

const nutritionTips = [
  "Eat more whole foods like fruits, vegetables, and whole grains.",
  "Stay hydrated - aim for 6-8 glasses of water a day.",
  "Include lean protein in every meal to stay full longer.",
  "Avoid sugary drinks - water is your best friend.",
  "Limit processed and packaged foods where possible.",
  "Don't skip breakfast - fuel your body early.",
  "Practice portion control - even healthy foods can add up.",
  "Opt for healthy fats like avocado, nuts, and olive oil.",
  "Plan your meals ahead to avoid last-minute junk food.",
  "Try to cook at home more often than eating out.",
  "Read food labels - watch for added sugars and sodium.",
  "Eat slowly and mindfully to avoid overeating.",
  "Fill half your plate with vegetables at lunch and dinner.",
  "Snack smart - go for protein or fiber-rich options.",
  "Limit your alcohol intake for better metabolism.",
  "Make colorful meals - more colors mean more nutrients.",
  "Watch out for hidden calories in dressings and sauces.",
  "Practice balance, not perfection - all foods can fit.",
];

const NutritionTips = () => {
  const [tip, setTip] = useState("");

  useEffect(() => {
    // Set initial tip
    setTip(nutritionTips[Math.floor(Math.random() * nutritionTips.length)]);

    const interval = setInterval(() => {
      setTip(nutritionTips[Math.floor(Math.random() * nutritionTips.length)]);
    }, 60000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-3 shadow-sm mt-4">
      <h5 className="mb-2">🍎 Nutrition Tip</h5>
      <p className="mb-0">{tip}</p>
    </div>
  );
};

export default NutritionTips;
