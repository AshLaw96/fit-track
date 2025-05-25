import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import TroubleshootingItem from "./TroubleshootingItem";

const troubleshootingData = [
  {
    issue: "I can't register a new account",
    solution: "Ensure all fields are filled correctly, especially password requirements. If your email is already used, try resetting your password instead.",
  },
  {
    issue: "Logged forms are not saving my data",
    solution: "Double-check your internet connection. Try reloading the app and re-submitting the form.",
  },
  {
    issue: "App is crashing or freezing",
    solution: "Try closing and reopening the app. If it continues, clear the browser/app cache or update to the latest version.",
  },
  {
    issue: "I'm using the app on different devices and data isn't syncing",
    solution: "Ensure you are logged in with the same account. Data may take a moment to sync — try refreshing the dashboard.",
  },
  {
    issue: "The app is not sending password reset emails",
    solution: "Check your spam folder and ensure your email is correct. If you still don't receive it, visit the Contact Support page.",
  },
  {
    issue: "Form validation errors are not showing",
    solution: "Make sure JavaScript is enabled in your browser. If you're using an extension like an ad blocker or script blocker, try disabling it and reloading the page."
  },
  {
    issue: "Progress not updating after logging data",
    solution: "Wait a few seconds and refresh your dashboard. If it still doesn't update, ensure you hit the “Submit” button and see a success message."
  },
  {
    issue: "Notifications not appearing",
    solution: "Check your browser or app settings to ensure notifications are enabled. If they are, try logging out and back in again.",
  },
  {
    issue: "Can't upload a profile picture",
    Solution: "Ensure your file is under the allowed size (e.g., 2MB) and is a supported format (JPEG, PNG). Try another image if the issue persists."
  }
];

const Troubleshooting = () => {
  const [search, setSearch] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(troubleshootingData, {
      keys: ["issue", "solution"],
      threshold: 0.35,
    });
  }, []);

  const filteredIssues = search
    ? fuse.search(search).map((result) => result.item)
    : troubleshootingData;

  return (
    <div className="custom-wrap">
      <h3 className="custom-heading">Troubleshooting & Technical Support</h3>

      <input
        type="text"
        placeholder="Search common problems..."
        className="form-control mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredIssues.length > 0 ? (
        filteredIssues.map((issue, index) => (
          <TroubleshootingItem
            key={index}
            issue={issue.issue}
            solution={issue.solution}
          />
        ))
      ) : (
        <div className="card text-center">
          <p className="mb-0">No matching issues found.</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <p>
          Still stuck?{" "}
          <Link to="/help/contact" className="text-primary">
            Contact Support
          </Link>
        </p>
        <Link to="/help" className="btn btn-outline-secondary mt-2">
          ← Back to Help Page
        </Link>
      </div>
    </div>
  );
};

export default Troubleshooting;
