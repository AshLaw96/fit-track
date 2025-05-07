import React, { useState } from "react";
import api from "../api";
import "../styles/auth.css";

const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/token/", {
        username,
        password,
      });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access}`;
      alert("Login successful!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <h3 className="mb-4 text-primary">Log In</h3>
      <div className="form-group mb-3">
        <input
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-4">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="btn btn-primary w-100">Log In</button>
    </form>
  );
};

export default LoginForm;
