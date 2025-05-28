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
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
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
      toast.error(
        err.response?.data?.detail || "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="setting-item" aria-expanded={open}>
      <div
        className="setting-label clickable"
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen(!open)}
        aria-controls="change-password-form"
      >
        <span className="setting-icon">🔐</span>
        <span>Change Password</span>
        <span className="toggle-arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <form
          id="change-password-form"
          className="password-form"
          onSubmit={handleSubmit}
        >
          <label>
            Current Password
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm New Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" disabled={loading || !isFormValid}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
