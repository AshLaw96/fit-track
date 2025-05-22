import React, { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/DeleteAccount.css";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(useAuth);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    try {
      setLoading(true);
      await api.delete("/delete_account/");

      // Clear auth
      localStorage.clear();
      if (logout) logout();

      setDeleted(true);
      alert("Your account has been deleted.");

      navigate("/goodbye");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("There was an error deleting your account. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        className="btn btn-danger w-100 d-flex align-items-center justify-content-center delete-account-btn"
        onClick={handleDelete}
        disabled={loading || deleted}
      >
        <MdDelete className="me-2" />
        {loading ? "Deleting..." : deleted ? "Account Deleted" : "Delete Account"}
      </button>
    </div>
  );
};

export default DeleteAccount;
