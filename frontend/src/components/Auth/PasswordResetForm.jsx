import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "../../styles/auth.css";

const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await api.post("/password-reset/", { email: email.trim() });
      setSubmitted(true);

      setTimeout(() => {
        navigate("/auth");
      }
      // Redirect after 10 seconds
      , 10000);

    } catch (err) {
      console.error("Password reset request failed:", err);
      if (err.response?.status === 404) {
        setError("No account found with that email.");
      } else {
        setError("There was an error. Please try again.");
      }
    }
  
  };

  // Countdown Effect
  useEffect(() => {
    if (submitted) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/auth");
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [submitted, navigate]);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="auth-form-wrapper auth-card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        {submitted ? (
          <div className="text-center">
            <h4 className="mb-3">Check your inbox</h4>
            <p className="text-muted">
              If an account exists for that email, you'll receive a password reset link.
            </p>
            <p className="text-muted mt-3">
              Redirecting to login in <strong>{countdown}</strong> seconds...
            </p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleReset}>
            <h3 className="auth-title mb-3 text-center">Reset Password</h3>

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

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
