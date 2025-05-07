import React, { useState } from "react";
import api from "../api";
import "../styles/auth.css";

const RegisterForm = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return alert("Passwords do not match!");
    }

    try {
      await api.post("/register/", {
        username,
        email,
        password: password1,
      });
      alert("Registration successful! Please log in.");
      if (onSwitchToLogin) onSwitchToLogin();
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <h3 className="mb-4 text-primary">Sign Up</h3>
      <div className="form-group mb-3">
        <input
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <input
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
      </div>
      <button className="btn btn-primary w-100">Sign Up</button>
    </form>
  );
};

export default RegisterForm;
