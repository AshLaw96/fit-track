import React from "react";
import "../../styles/SettingItem.css";

const SettingToggle = ({ label, Icon, enabled, onToggle, id }) => {
  // Generate a unique ID for the input if not provided
  const inputId = id || `setting-toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="setting-item toggle">
      <div className="setting-label">
        {Icon && <Icon className="setting-icon" />}
        <span>{label}</span>
      </div>
      <label className="switch" htmlFor={inputId}>
        <input type="checkbox" id={inputId} checked={enabled} onChange={onToggle} aria-checked={enabled} role="switch" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default SettingToggle;