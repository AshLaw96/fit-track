import React from "react";
import { MdDelete } from "react-icons/md";

const DeleteAccount = () => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Trigger delete logic here
      alert("Account deletion triggered.");
    }
  };

  return (
    <div className="mt-4">
      <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center" onClick={handleDelete}>
        <MdDelete className="me-2" />
        DELETE ACCOUNT
      </button>
    </div>
  );
};

export default DeleteAccount;
