import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const PasswordResetConfirmForm = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await api.post("/password-reset-confirm/", {
        uid,
        token,
        new_password: newPassword,
      });
      setConfirmed(true);
    } catch (err) {
      console.error("Reset failed:", err);
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="auth-form-wrapper auth-card p-4 shadow w-100" style={{ maxWidth: "400px" }}>
        {confirmed ? (
          <div className="text-center">
            <h4>Password Reset!</h4>
            <p>You may now <a href="/auth">log in</a> with your new password.</p>
          </div>
        ) : (
          <form onSubmit={handleConfirm}>
            <h3 className="auth-title mb-3 text-center">Set New Password</h3>

            {error && <div className="alert alert-danger text-center" role="alert">{error}</div>}

            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary w-100">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetConfirmForm;
