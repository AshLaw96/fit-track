import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";
import QuickStats from "./QuickStats";
import DeleteAccount from "./DeleteAccount";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    dob: "2025-03-26",
    height: "",
    weight: "",
  });

  const [achievements] = useState({
    sleep: 2,
    diet: 3,
    fitness: 2,
  });

  const [activeCount] = useState(20);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-4" style={{ maxWidth: "400px" }}>
      <h3 className="text-center fw-bold mb-4">FitTrack</h3>
      <ProfileImage />
      <ProfileForm profile={profile} onChange={handleChange} />
      <QuickStats activeCount={activeCount} achievements={achievements} />
      <DeleteAccount />
    </div>
  );
};

export default UserProfile;
