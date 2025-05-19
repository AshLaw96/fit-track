import React from "react";

const ProfileForm = ({ profile, onChange }) => (
  <form>
    <div className="mb-2">
      <input className="form-control" type="text" name="username" placeholder="Username" value={profile.username} onChange={onChange} />
    </div>
    <div className="mb-2">
      <input className="form-control" type="email" name="email" placeholder="Email" value={profile.email} onChange={onChange} />
    </div>
    <div className="mb-2">
      <input className="form-control" type="date" name="dob" value={profile.dob} onChange={onChange} />
    </div>
    <div className="d-flex justify-content-between">
      <input className="form-control me-1" type="number" name="height" placeholder="Height" value={profile.height} onChange={onChange} />
      <input className="form-control ms-1" type="number" name="weight" placeholder="Weight" value={profile.weight} onChange={onChange} />
    </div>
  </form>
);

export default ProfileForm;
