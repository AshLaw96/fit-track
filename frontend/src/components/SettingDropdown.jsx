import React from "react";
import "../styles/SettingItem.css";

const SettingDropdown = ({ label, Icon, options, value, onChange }) => {
  return (
    <div className="setting-item dropdown">
      <div className="setting-label">
        {Icon && <Icon className="setting-icon" />}
        <span>{label}</span>
      </div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
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
