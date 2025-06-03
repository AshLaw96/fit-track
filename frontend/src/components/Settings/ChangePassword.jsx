import React, { useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "../../styles/SettingItem.css";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (newPassword !== confirmPassword) {
      setFormError("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/change-password/", {
        current_password: currentPassword,
        new_password: newPassword,
      });

      toast.success("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpen(false);

      logout?.();
      navigate("/auth");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to change password. Please try again.";
      setFormError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="setting-item">
      <button
        className="setting-label clickable"
        aria-expanded={open}
        aria-controls="change-password-form"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="setting-icon" aria-hidden="true">🔐</span>
        <span>Change Password</span>
        <span className="toggle-arrow" aria-hidden="true">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <form
          id="change-password-form"
          className="password-form"
          onSubmit={handleSubmit}
          aria-live="assertive"
          aria-relevant="additions"
        >
          {formError && (
            <div role="alert" className="alert alert-danger" style={{ marginBottom: "1rem" }}>
              {formError}
            </div>
          )}

          <label htmlFor="current-password">Current Password</label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            autoComplete="current-password"
          />

          <label htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <label htmlFor="confirm-password">Confirm New Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <button type="submit" disabled={loading || !isFormValid}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
