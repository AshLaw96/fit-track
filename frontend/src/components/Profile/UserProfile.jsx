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
  const [achievementCounts, setAchievementCounts] = useState({
    sleep: 0,
    diet: 0,
    fitness: 0,
  });

  // Fetch profile
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

  // Fetch achievements
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await api.get("/achievements/");
        const all = Array.isArray(res.data?.results) ? res.data.results : [];

        // Group and count achievements by category
        const grouped = all.reduce(
          (acc, item) => {
            const cat = item.category.toLowerCase();
            if (["sleep", "diet", "fitness"].includes(cat)) {
              acc[cat] = (acc[cat] || 0) + 1;
            }
            return acc;
          },
          { sleep: 0, diet: 0, fitness: 0 }
        );

        setAchievementCounts(grouped);
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
      }
    };
    fetchAchievements();
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

  return (
    <div className="container py-4 custom-wrap">
      <ToastContainer position="top-right" autoClose={3000} />
      <h3 className="text-center custom-heading mb-4 page-title">Your Profile</h3>

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

      <QuickStats achievements={achievementCounts} />
      <DeleteAccount />
    </div>
  );
};

export default UserProfile;
