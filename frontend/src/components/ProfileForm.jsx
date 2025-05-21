import React from "react";

const ProfileForm = ({ profile, onChange }) => (
  <div className="card p-3 mb-3">
    <h5 className="custom-heading text-center mb-3">Your Info</h5>
    <div className="mb-3">
      <input
        className="form-control"
        type="text"
        name="username"
        placeholder="Username"
        value={profile.username}
        onChange={onChange}
      />
    </div>
    <div className="mb-3">
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={onChange}
      />
    </div>
    <div className="mb-3">
      <input
        className="form-control"
        type="date"
        name="dob"
        value={profile.dob}
        onChange={onChange}
      />
    </div>
    <div className="d-flex gap-2">
      <input
        className="form-control"
        type="number"
        name="height_cm"
        placeholder="Height (cm)"
        value={profile.height_cm}
        onChange={onChange}
      />
      <input
        className="form-control"
        type="number"
        name="weight_kg"
        placeholder="Weight (kg)"
        value={profile.weight_kg}
        onChange={onChange}
      />
    </div>
  </div>
);

export default ProfileForm;
