import React, { useState } from "react";
import api from "../../utils/api";
import "../../styles/auth.css";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const isValidPassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return minLength && hasUpper && hasLower && hasNumber;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    if (password1 !== password2) {
      return setError("Passwords do not match.");
    }

    if (!isValidPassword(password1)) {
      return setError(
        "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, and a number."
      );
    }

    try {
      await api.post("/register/", {
        username,
        email,
        password: password1,
        password2,
      });

      setSuccess("Registration successful! Redirecting to login...");
      setUsername("");
      setEmail("");
      setPassword1("");
      setPassword2("");
      setTimeout(() => {
        if (onSwitchToLogin) onSwitchToLogin();
      }, 2000);
    } catch (err) {
      const data = err.response?.data || {};
      setFieldErrors(data);

      if (data.non_field_errors) {
        setError(data.non_field_errors[0]);
      } else {
        setError("Please correct the highlighted fields.");
      }
    }
  };

  return (
    <form className="auth-form auth-card p-4 mx-auto" onSubmit={handleRegister}>
      <h3 className="auth-title mb-3 text-center">Sign Up</h3>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && <div className="alert alert-success text-center">{success}</div>}

      <div className="form-group mb-3">
        <input
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {fieldErrors.username && (
          <small className="text-danger">{fieldErrors.username[0]}</small>
        )}
      </div>

      <div className="form-group mb-3">
        <input
          className="form-control"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {fieldErrors.email && (
          <small className="text-danger">{fieldErrors.email[0]}</small>
        )}
      </div>

      <div className="form-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <small className="form-text text-muted">
          Must be at least 8 characters, include a number, uppercase and lowercase letter.
        </small>
        {fieldErrors.password && (
          <small className="text-danger">{fieldErrors.password[0]}</small>
        )}
      </div>

      <div className="form-group mb-4">
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        {password2 && password1 !== password2 && (
          <small className="form-text text-danger">Passwords do not match.</small>
        )}
        {fieldErrors.password2 && (
          <small className="text-danger">{fieldErrors.password2[0]}</small>
        )}
      </div>

      <button className="btn btn-primary w-100">Sign Up</button>
    </form>
  );
};

export default RegisterForm;
