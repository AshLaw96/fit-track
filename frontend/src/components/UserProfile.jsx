import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";
import QuickStats from "./QuickStats";
import DeleteAccount from "./DeleteAccount";

const UserProfile = () => {
  const defaultProfile = {
    username: "",
    email: "",
    dob: "2025-03-26",
    height: "",
    weight: "",
  };

  // Load from localStorage on first render
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [achievements] = useState({
    sleep: 2,
    diet: 3,
    fitness: 2,
  });

  const [activeCount] = useState(20);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      const updated = { ...prev, [name]: value };
      // Save immediately
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="container py-4 custom-wrap">
      <h3 className="text-center custom-heading">Your Profile</h3>
      <ProfileImage />
      <ProfileForm profile={profile} onChange={handleChange} />
      <QuickStats
        activeCount={activeCount}
        achievements={achievements}
      />
      <DeleteAccount />
    </div>
  );
};

export default UserProfile;
