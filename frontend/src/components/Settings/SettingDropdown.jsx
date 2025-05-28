import React from "react";
import "../../styles/SettingItem.css";

const SettingDropdown = ({ label, Icon, options, value, onChange }) => {
  const id = `dropdown-${label.replace(/\s+/g, "").toLowerCase()}`;

  return (
    <div className="setting-item dropdown">
      <label htmlFor={id} className="setting-label">
        {Icon && <Icon className="setting-icon" />}
        <span>{label}</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="setting-select"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SettingDropdown;
