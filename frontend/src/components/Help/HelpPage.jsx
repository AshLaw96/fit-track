import React from "react";
import { Link } from "react-router-dom";
import { HelpIcons } from "../../utils/iconHelper";

const helpSections = [
  {
    title: "Frequently Asked Questions",
    description:
      "Quick answers to common questions about using the app — from setting up your account and logging activities to tracking progress and customizing your preferences.",
    icon: <HelpIcons.Question className="text-xl" />,
    link: "/help/faq",
  },
  {
    title: "Troubleshooting & Tech Support",
    description:
      "Step-by-step solutions for common technical problems, like resetting your password, recovering your account, fixing app crashes, and connecting with other apps.",
    icon: <HelpIcons.Tools className="text-xl" />,
    link: "/help/troubleshooting",
  },
  {
    title: "Contact Support",
    description:
      "Need personalized help? Reach out to our support team or connect with other users for peer assistance through our easy-to-use contact form.",
    icon: <HelpIcons.Headset className="text-xl" />,
    link: "/help/contact",
  },
  {
    title: "Tutorials & Guides",
    description:
      "Learn how to get the most from our app with step-by-step guides and walkthroughs for key features, like logging meals, setting goals, and tracking your fitness journey.",
    icon: <HelpIcons.GraduationCap className="text-xl" />,
    link: "/help/tutorials",
  },
];

const HelpPage = () => {
  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6 page-title text-center">Help & Support</h1>
      {helpSections.map((section, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-lg shadow-sm p-5 flex gap-4 items-start hover:shadow-md transition-shadow duration-300"
        >
          <div className="text-primary mt-1">{section.icon}</div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">{section.title}</h2>
            <p className="text-gray-700 text-sm mb-3">{section.description}</p>
            <Link
              to={section.link}
              className="self-start text-primary hover:text-secondary font-medium"
            >
              Learn more →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpPage;
