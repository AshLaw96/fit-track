import React from "react";
import "../../styles/SettingItem.css";

const SettingToggle = ({ label, Icon, enabled, onToggle }) => {
  return (
    <div className="setting-item toggle">
      <div className="setting-label">
        {Icon && <Icon className="setting-icon" />}
        <span>{label}</span>
      </div>
      <label className="switch">
        <input type="checkbox" checked={enabled} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default SettingToggle;