import React, { useState, useEffect } from "react";
import api from "../utils/api";
import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";
import QuickStats from "./QuickStats";
import DeleteAccount from "./DeleteAccount";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/");
        const sanitized = {
          ...res.data,
          dob: res.data.dob || "",
          height_cm: res.data.height_cm ?? "",
          weight_kg: res.data.weight_kg ?? "",
          email: res.data.email || "",
          username: res.data.username || "",
        };
        setProfile(sanitized);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...profile,
        height_cm: parseFloat(profile.height_cm) || 0,
        weight_kg: parseFloat(profile.weight_kg) || 0,
      };

      await api.patch("/profile/", payload);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Profile update failed. Please check your input.");
    }
  };

  if (loading || !profile) return <p>Loading...</p>;

  const achievements = {
    sleep: 2,
    diet: 3,
    fitness: 2,
  };

  const activeCount = 20;

  return (
    <div className="container py-4 custom-wrap">
      <h3 className="text-center custom-heading">Your Profile</h3>
      <ProfileImage />
      <form onSubmit={handleSubmit}>
        <ProfileForm profile={profile} onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-100">Save Changes</button>
      </form>
      <QuickStats activeCount={activeCount} achievements={achievements} />
      <DeleteAccount />
    </div>
  );
};

export default UserProfile;
