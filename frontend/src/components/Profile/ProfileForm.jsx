import React, { useMemo } from "react";
import { useUnits } from "../../contexts/UnitsContext";

const ProfileForm = ({ profile, onChange }) => {
  const { units } = useUnits();

  const convertHeight = (value, toUnit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;

    switch (toUnit) {
      case "inches":
        return (val / 2.54).toFixed(1); // cm → in
      case "meters":
        return (val / 100).toFixed(2); // cm → m
      case "centimeters":
      default:
        return val.toFixed(1);
    }
  };

  const convertWeight = (value, toUnit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;

    switch (toUnit) {
      case "pounds":
        return (val * 2.20462).toFixed(1); // kg → lbs
      case "grams":
        return (val * 1000).toFixed(0); // kg → g
      case "kilograms":
      default:
        return val.toFixed(1);
    }
  };

  const reverseConvertHeight = (value, fromUnit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;

    switch (fromUnit) {
      case "inches":
        return (val * 2.54).toFixed(1); // in → cm
      case "meters":
        return (val * 100).toFixed(1); // m → cm
      case "centimeters":
      default:
        return val;
    }
  };

  const reverseConvertWeight = (value, fromUnit) => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;

    switch (fromUnit) {
      case "pounds":
        return (val / 2.20462).toFixed(1); // lb → kg
      case "grams":
        return (val / 1000).toFixed(3); // g → kg
      case "kilograms":
      default:
        return val;
    }
  };

  // UseMemo to avoid recalculating unnecessarily
  const displayHeight = useMemo(
    () => convertHeight(profile.height_cm, units.length),
    [profile.height_cm, units.length]
  );

  const displayWeight = useMemo(
    () => convertWeight(profile.weight_kg, units.weight),
    [profile.weight_kg, units.weight]
  );

  const handleHeightChange = (e) => {
    const converted = reverseConvertHeight(e.target.value, units.length);
    onChange({
      ...e,
      target: { ...e.target, name: "height_cm", value: converted },
    });
  };

  const handleWeightChange = (e) => {
    const converted = reverseConvertWeight(e.target.value, units.weight);
    onChange({
      ...e,
      target: { ...e.target, name: "weight_kg", value: converted },
    });
  };

  const getLengthLabel = () => {
    switch (units.length) {
      case "meters":
        return "m";
      case "inches":
        return "in";
      default:
        return "cm";
    }
  };

  const getWeightLabel = () => {
    switch (units.weight) {
      case "pounds":
        return "lb";
      case "grams":
        return "g";
      default:
        return "kg";
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h5 className="custom-heading text-center mb-3">Your Info</h5>

      <div className="mb-3">
        <label htmlFor="username" className="form-label visually-hidden">
          Username
        </label>
        <input
          id="username"
          className="form-control"
          type="text"
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label visually-hidden">
          Email
        </label>
        <input
          id="email"
          className="form-control"
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dob" className="form-label visually-hidden">
          Date of Birth
        </label>
        <input
          id="dob"
          className="form-control"
          type="date"
          name="dob"
          value={profile.dob}
          onChange={onChange}
        />
      </div>

      <div className="d-flex gap-2">
        <div className="flex-fill">
          <label htmlFor="height" className="form-label visually-hidden">
            Height
          </label>
          <input
            id="height"
            className="form-control"
            type="number"
            name="height_cm"
            step="0.1"
            min="0"
            placeholder={`Height (${getLengthLabel()})`}
            value={displayHeight}
            onChange={handleHeightChange}
          />
        </div>

        <div className="flex-fill">
          <label htmlFor="weight" className="form-label visually-hidden">
            Weight
          </label>
          <input
            id="weight"
            className="form-control"
            type="number"
            name="weight_kg"
            step="0.1"
            min="0"
            placeholder={`Weight (${getWeightLabel()})`}
            value={displayWeight}
            onChange={handleWeightChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
