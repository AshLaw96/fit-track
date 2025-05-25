import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatWidget from "./ChatWidget";

const ContactSupport = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: "General",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic front-end validation
    if (!form.name || !form.email || !form.message) {
      setError("Please fill out all required fields.");
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setError("");
      // Optional: send to backend/API here
    }, 500);
  };

  return (
    <div className="custom-wrap">
      <h3 className="custom-heading">Contact Support</h3>
      <p className="mb-3">Need more help? Fill out the form below or chat with us.</p>

      {submitted ? (
        <div className="alert alert-success">
          Your message has been sent! We’ll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <div className="alert alert-danger">{error}</div>}

          <div>
            <label className="form-label">Name*</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label">Email*</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
            >
              <option>General</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Technical Issue</option>
              <option>Account Help</option>
            </select>
          </div>

          <div>
            <label className="form-label">Message*</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      )}

      <div className="mt-4 text-center">
        <Link to="/help" className="btn btn-outline-secondary">
          ← Back to Help page
        </Link>
      </div>

      <ChatWidget />
    </div>
  );
};

export default ContactSupport;
