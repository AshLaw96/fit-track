import React, { useRef, useState, useEffect } from "react";
import { FaUserEdit, FaCamera, FaSpinner } from "react-icons/fa";
import api from "../../utils/api";

const ProfileImage = () => {
  const fileInputRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/");
        const savedUrl = res.data?.profile_image_url;
        if (savedUrl) setImageUrl(savedUrl);
      } catch (err) {
        console.error("Could not load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

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
      alert("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileSelect = () => fileInputRef.current.click();

  return (
    <div className="text-center position-relative mb-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Profile"
          className="rounded-circle border shadow-sm"
          style={{ width: 96, height: 96, objectFit: "cover" }}
        />
      ) : (
        <div
          className="rounded-circle bg-secondary d-flex justify-content-center align-items-center mx-auto"
          style={{ width: 96, height: 96 }}
        >
          <FaUserEdit className="text-white" size={32} />
        </div>
      )}

      <button
        type="button"
        className="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle shadow-sm"
        title="Edit Photo"
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
    </div>
  );
};

export default ProfileImage;
