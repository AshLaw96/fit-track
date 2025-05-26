import React from "react";
import { Link } from "react-router-dom";
import { HelpIcons } from "../../utils/iconHelper";

const helpSections = [
  {
    title: "Frequently asked questions",
    description:
      "This section will contain a searchable list of common questions related to the app features, such as, how to set up an account, logging activities, tracking progress, setting goals, calculating calories, changing setting preferences.",
    icon: <HelpIcons.Question className="text-xl" />,
    // Link to the FAQ page
    link: "/help/faq",
  },
  {
    title: "Troubleshooting & tech support",
    description:
      "This section will contain how to solve technical issues, such as, resetting password, changing emails, recovering account, app crashing, troubleshooting connections with third party apps.",
    icon: <HelpIcons.Tools className="text-xl" />,
    // Link to troubleshooting page
    link: "/help/troubleshooting",
  },
  {
    title: "Contact support",
    description:
      "This section will contain a contact form for users to contact admin for any issues they need help with or if they want to ask another user for help from peer support.",
    icon: <HelpIcons.Headset className="text-xl" />,
    // Link to contact support page
    link: "/help/contact",
  },
  {
    title: "Tutorials & guides",
    description:
      "This section will contain step-by-step guides and walk through on how to use the in app features like logging meals or setting fitness goals.",
    icon: <HelpIcons.GraduationCap className="text-xl" />,
    // Link to tutorial page
    link: "/help/tutorials",
  },
];

const HelpPage = () => {
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {helpSections.map((section, idx) => (
        <div
          key={idx}
          className="border rounded-lg p-4 shadow-sm text-left flex gap-5"
        >
          <div className="mt-1 text-primary">{section.icon}</div>
          <div>
            <h2 className="font-semibold">{section.title}</h2>
            <p className="text-sm text-gray-700">{section.description}</p>
            <Link to={section.link} className="text-primary hover:text-secondary">
              Learn more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpPage;
