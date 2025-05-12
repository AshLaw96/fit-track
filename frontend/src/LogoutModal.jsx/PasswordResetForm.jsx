import React, { useState } from "react";
import api from "../utils/api";
import "../styles/auth.css";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await api.post("/password-reset/", { email });
      setSubmitted(true);
    } catch (err) {
      console.error("Password reset request failed:", err);
      setError("There was an error. Please try again.");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="auth-form-wrapper auth-card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        {submitted ? (
          <div className="text-center">
            <h4 className="mb-3">Check your inbox</h4>
            <p className="text-muted">
              If an account exists for that email, you'll receive a password reset link.
            </p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleReset}>
            <h3 className="auth-title mb-3 text-center">Reset Password</h3>

            {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

            <div className="form-group mb-4">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100">Send Reset Link</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetForm;
