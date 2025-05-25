import React from "react";
import { useUnits } from "../contexts/UnitsContext";

const ProfileForm = ({ profile, onChange }) => {
  const { units } = useUnits();

  const convertHeight = (value, to) =>
    to === "imperial" ? (value / 2.54).toFixed(1) : (value * 2.54).toFixed(0);
  const convertWeight = (value, to) =>
    to === "imperial" ? (value * 2.20462).toFixed(1) : (value / 2.20462).toFixed(1);

  return (
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
          placeholder={`Height (${units === "metric" ? "cm" : "in"})`}
          value={
            units === "metric"
              ? profile.height_cm
              : convertHeight(profile.height_cm, "imperial")
          }
          onChange={(e) =>
            onChange({
              ...e,
              target: {
                ...e.target,
                value:
                  units === "imperial"
                    ? convertHeight(e.target.value, "metric")
                    : e.target.value,
              },
            })
          }
        />
        <input
          className="form-control"
          type="number"
          name="weight_kg"
          placeholder={`Weight (${units === "metric" ? "kg" : "lb"})`}
          value={
            units === "metric"
              ? profile.weight_kg
              : convertWeight(profile.weight_kg, "imperial")
          }
          onChange={(e) =>
            onChange({
              ...e,
              target: {
                ...e.target,
                value:
                  units === "imperial"
                    ? convertWeight(e.target.value, "metric")
                    : e.target.value,
              },
            })
          }
      />
    </div>
  </div>
);
};

export default ProfileForm;
