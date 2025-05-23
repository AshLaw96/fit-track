import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "../styles/DeleteAccount.css";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
      customClass: {
        popup: "custom-swal",
      },
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await api.delete("/delete_account/");

      // Clear auth
      localStorage.clear();
      if (logout) logout();

      setDeleted(true);

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your account has been successfully deleted.",
        confirmButtonColor: "#0d6efd",
        customClass: {
          popup: "custom-swal",
        },
      });

      navigate("/goodbye");
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error("Error deleting account. Please try again.");
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
