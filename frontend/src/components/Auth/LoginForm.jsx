import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../contexts/NotificationContext";
import api from "../../utils/api";
import "../../styles/auth.css";

const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const { fetchNotifications } = useNotifications();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/token/", {
        username: username.trim(),
        password,
      });

      const { access, refresh } = res.data;

      // handles decoding and refresh loop
      login(access, refresh);

      await fetchNotifications();

      toast.success("Login successful!");
      navigate("/", { replace: true });
      if (onSuccess) onSuccess();
    } catch (err) {
      const data = err.response?.data || {};
      const errorMsg =
        data.non_field_errors?.[0] || "Login failed. Please check your credentials.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form auth-card p-4 mx-auto" onSubmit={handleLogin}>
      <h3 className="auth-title mb-3 text-center">Log In</h3>

      {error && <div className="alert alert-danger text-center">{error}</div>}

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
          onClick={() => navigate("/reset-password", { replace: true })}
        >
          Forgot password?
        </button>
      </div>

      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
