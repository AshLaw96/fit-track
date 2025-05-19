import React from "react";
import { FaUserEdit, FaCamera } from "react-icons/fa";

const ProfileImage = () => (
  <div className="position-relative mb-3">
    <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center mx-auto" style={{ width: 96, height: 96 }}>
      <FaUserEdit className="text-white" size={32} />
    </div>
    <button type="button" className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle">
      <FaCamera />
    </button>
    <p className="text-muted small mt-2">Click icon to add or edit profile image</p>
  </div>
);

export default ProfileImage;
