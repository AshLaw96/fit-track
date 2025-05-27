import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import ProfileImage from "./ProfileImage";
import ProfileForm from "./ProfileForm";
import QuickStats from "./QuickStats";
import DeleteAccount from "./DeleteAccount";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
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
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) return <p className="text-center">Loading profile...</p>;

  const achievements = {
    sleep: 2,
    diet: 3,
    fitness: 2,
  };

  return (
    <div className="container py-4 custom-wrap">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="text-center custom-heading mb-4">Your Profile</h3>

      <ProfileImage />

      <form onSubmit={handleSubmit} className="mb-4">
        <ProfileForm profile={profile} onChange={handleChange} />
        <button
          type="submit"
          className="btn btn-outline-primary w-100 mt-3"
          disabled={saving}
        >
          {saving ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>

      <QuickStats achievements={achievements} />
      <DeleteAccount />
    </div>
  );
};

export default UserProfile;
