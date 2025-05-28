import React, { useRef, useState, useEffect } from "react";
import { FaUserEdit, FaCamera, FaSpinner } from "react-icons/fa";
import api from "../../utils/api";
import "../../styles/ProfileImage.css";

const ProfileImage = () => {
  const fileInputRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/");
        const savedUrl = res.data?.profile_image_url;
        if (savedUrl) setImageUrl(savedUrl);
      } catch (err) {
        console.error("Could not load profile:", err);
        setError("Could not load profile image.");
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("/upload_profile_image/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const cloudinaryUrl = res.data?.image_url;
      if (cloudinaryUrl) {
        setImageUrl(cloudinaryUrl);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileSelect = () => fileInputRef.current.click();

  return (
    <div className="text-center position-relative mb-4">
      {loading && !imageUrl ? (
        <div className="profile-image loading">
          <FaSpinner className="fa-spin text-muted" size={24} />
        </div>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Profile"
          className="profile-image"
        />
      ) : (
        <div className="profile-image default">
          <FaUserEdit className="text-white" size={32} />
        </div>
      )}

      <button
        type="button"
        className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle shadow-sm"
        title="Edit Photo"
        aria-label="Edit profile photo"
        onClick={triggerFileSelect}
        disabled={loading}
      >
        {loading ? <FaSpinner className="fa-spin" /> : <FaCamera />}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="d-none"
        onChange={handleFileChange}
      />

      <p className="text-muted small mt-2">
        {loading ? "Uploading..." : "Click to add or edit profile image"}
      </p>

      {error && <p className="text-danger small">{error}</p>}
    </div>
  );
};

export default ProfileImage;
