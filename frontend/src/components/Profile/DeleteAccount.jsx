import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "../../styles/DeleteAccount.css";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDelete = async () => {
    const confirmationOptions = {
      title: "Are you sure?",
      text: "This action will permanently delete your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
      customClass: { popup: "custom-swal" },
    };

    const result = await Swal.fire(confirmationOptions);
    if (!result.isConfirmed) return;

    try {
      setLoading(true);
      await api.delete("/delete_account/");
      localStorage.clear();
      logout?.();

      setDeleted(true);

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your account has been successfully deleted.",
        confirmButtonColor: "#0d6efd",
        customClass: { popup: "custom-swal" },
      });

      navigate("/goodbye");
    } catch (error) {
      console.error("Account deletion failed:", error);
      toast.error("Could not delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4" aria-live="polite">
      <button
        className={`btn btn-danger w-100 d-flex align-items-center justify-content-center delete-account-btn ${deleted ? "btn-outline-danger" : ""}`}
        onClick={handleDelete}
        disabled={loading || deleted}
        aria-disabled={loading || deleted}
      >
        <MdDelete className="me-2" />
        {loading ? "Deleting..." : deleted ? "Account Deleted" : "Delete Account"}
      </button>
    </div>
  );
};

export default DeleteAccount;
