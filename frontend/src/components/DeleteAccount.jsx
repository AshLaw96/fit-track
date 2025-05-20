import React from "react";
import { MdDelete } from "react-icons/md";

const DeleteAccount = () => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      alert("Account deletion triggered.");
    }
  };

  return (
    <div className="mt-4">
      <button
        className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
        onClick={handleDelete}
        style={{ borderRadius: "0.5rem" }}
      >
        <MdDelete className="me-2" />
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
