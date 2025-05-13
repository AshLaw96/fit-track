import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/logoutModal.css";
import { useAuth } from "../contexts/AuthContext";

const LogoutModal = ({ show, onClose }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
  setTimeout(() => {
    // this triggers context change
    logout();
    toast.success("You have been logged out successfully.");
    // closes modal
    onClose();
    navigate("/", { state: { message: "You have been logged out." } });
    // defer to next tick
  }, 0);
}, [onClose, navigate, logout]);

  useEffect(() => {
    if (!show) return;

    // Reset countdown if modal is reopened
    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handleLogout();
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [show, handleLogout]);

  if (!show) return null;

  return (
    <div className="modal-backdrop show" style={{ zIndex: 1050 }}>
      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 text-center">
            <h5 className="modal-title mb-3">Logging out...</h5>
            <p>You will be logged out in {countdown} second{countdown !== 1 && "s"}.</p>
            <button className="btn btn-secondary mt-3" onClick={handleLogout}>
              Logout now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;