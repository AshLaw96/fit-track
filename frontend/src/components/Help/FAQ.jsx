import React, { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import FAQItem from "./FAQItem";

const faqData = [
  {
    question: "How do I reset my password?",
    answer: "Go to Settings > Change password > Then fill out form and click submit."
  },
  {
    question: "How can I track my daily steps?",
    answer: "Use the Exercise tab to log exercise then your estimated steps will be shown in your dashboard."
  },
  {
    question: "What units can I use?",
    answer: "You can switch between metric and imperial in your profile settings."
  },
  {
    question: "How do I delete my account?",
    answer: "Scroll to the bottom of your Profile page and tap 'Delete Account'."
  },
  {
    question: "How do I recover my account when password is forgotten?",
    answer: "Go to log in form > Click forgot password link > Type email linked to your account > Click link in the sent email to reset password."
  },
  {
    question: "How can I change my email address?",
    answer: "Go to your Profile page > Go to your info section > Enter your new email and click submit."
  },
  {
    question: "How do I log a meal?",
    answer: "Go to the Meals tab > Click 'Log Meal' > Fill out the form with your meal details and click submit."
  },
  {
    question: "Can I edit my name or profile picture?",
    answer: "Yes, go to your Profile page > go to your info section > You can edit your name and upload a new profile picture just above it."
  },
  {
    question: "How do I set a daily goal?",
    answer: "Go to your dashboard > Go to the daily goal section > Click on the add goal button > Fill out the form and click submit."
  },
  {
    question: "Where can I find tutorials for using the app?",
    answer: "Visit the Help section > Click on 'Tutorials & Guides' to access step-by-step guides."
  },
  {
    question: "What does this app do?",
    answer: "This app helps you track your fitness activities, meals, sleep, and overall health progress."
  }
];

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fuse = useMemo(() => new Fuse(faqData, {
    keys: ["question", "answer"],
    threshold: 0.35,
    includeMatches: true,
  }), []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredFAQs = useMemo(() => {
    if (!debouncedSearch) return faqData;
    return fuse.search(debouncedSearch).map(res => ({
      ...res.item,
      matches: res.matches,
    }));
  }, [debouncedSearch, fuse]);

  return (
    <div className="custom-wrap">
      <h3 className="custom-heading mb-3">Frequently Asked Questions</h3>

      <input
        type="text"
        placeholder="Search FAQs..."
        className="form-control form-control-lg mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredFAQs.length > 0 ? (
        filteredFAQs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            matches={faq.matches}
          />
        ))
      ) : (
        <div className="card p-3 text-center">
          <p className="mb-0">No matching FAQs found.</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link to="/help" className="btn btn-outline-secondary">
          ← Back to Help page
        </Link>
      </div>
    </div>
  );
};

export default FAQ;
