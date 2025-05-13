import React, {  useState } from "react";
import { startTokenRefreshTimer } from "../utils/api";
import api from "../utils/api";
import "../styles/auth.css";
import { useAuth } from "../contexts/AuthContext";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/token/", { username, password });
      const { access, refresh } = res.data;
      login(access, refresh);
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;

      startTokenRefreshTimer();

      toast.success("Login successful!");

      // Redirect to dashboard
      navigate('/', { replace: true });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form className="auth-form auth-card p-4 mx-auto" onSubmit={handleLogin}>
      <h3 className="auth-title mb-3 text-center">Log In</h3>

      {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

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
      <div className="text-end mb-3">
      <button
        type="button"
        className="btn btn-link p-0"
        onClick={() =>  navigate("/reset-password", { replace: true })}
      >
        Forgot password?
      </button>
      </div>
      <button className="btn btn-primary w-100">Log In</button>
    </form>
  );
};

export default LoginForm;
