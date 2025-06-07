import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = form;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setSubmitted(true);

    setTimeout(() => {
    }, 500);
  };

  return (
    <div className="custom-wrap">
      <h3 className="custom-heading page-title">Contact Support</h3>
      <p className="mb-3">
        Need more help? Fill out the form below or start a live chat with us.
      </p>

      {submitted ? (
        <div className="alert alert-success">
          🎉 Your message has been sent! We’ll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          {error && <div className="alert alert-danger">{error}</div>}

          <div>
            <label htmlFor="name" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="form-label">
              Category (Optional)
            </label>
            <select
              id="category"
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
            <label htmlFor="message" className="form-label">
              Message <span className="text-danger">*</span>
            </label>
            <textarea
              id="message"
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
    </div>
  );
};

export default ContactSupport;
