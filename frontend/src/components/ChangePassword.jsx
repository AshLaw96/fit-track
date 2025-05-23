import React, { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import "../styles/SettingItem.css";
import { useAuth } from "../contexts/AuthContext";
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

        // Logout and redirect user after password change
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

  const isFormValid = currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="setting-item">
      <div
        className="setting-label clickable"
        onClick={() => setOpen(!open)}
      >
        <span className="setting-icon">🔐</span>
        <span>Change Password</span>
        <span className="toggle-arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <form className="password-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
