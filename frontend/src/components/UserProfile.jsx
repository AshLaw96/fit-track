import React, { useState, useEffect } from "react";
import api from "../utils/api";
import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";
import QuickStats from "./QuickStats";
import DeleteAccount from "./DeleteAccount";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle input change in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...profile,
        height_cm: parseFloat(profile.height_cm) || 0,
        weight_kg: parseFloat(profile.weight_kg) || 0,
      };

      await api.patch("/profile/", payload);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Profile update failed. Please check your input.");
    }
  };

  if (loading || !profile) return <p>Loading...</p>;

  const achievements = {
    sleep: 2,
    diet: 3,
    fitness: 2,
  };

  return (
    <div className="container py-4 custom-wrap">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="text-center custom-heading">Your Profile</h3>
      <ProfileImage />
      <form onSubmit={handleSubmit}>
        <ProfileForm profile={profile} onChange={handleChange} />
        <button type="submit" className="btn btn-primary w-100">
          Save Changes
        </button>
      </form>
      <QuickStats achievements={achievements} />
      <DeleteAccount />
    </div>
  );
};

export default UserProfile;
