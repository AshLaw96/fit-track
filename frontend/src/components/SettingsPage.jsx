import React, { useState } from "react";
import SettingToggle from "../components/SettingToggle";
import SettingDropdown from "../components/SettingDropdown";
import ChangePassword from "../components/ChangePassword";
import { Icons } from "../utils/iconHelper";
import { useNotifications } from "../contexts/NotificationContext";
import "../styles/SettingsPage.css";
import { useTheme } from "../contexts/ThemeContext";
import { useUnits } from "../contexts/UnitsContext";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const {units, setUnits} = useUnits();
  const [privacy, setPrivacy] = useState("private");
  const {darkMode, setDarkMode} = useTheme();

  const { addNotification } = useNotifications();

  const handleToggleNotifications = () => {
    setNotifications(!notifications);

    if (!notifications) {
      addNotification({
        title: "Welcome!",
        description: "Notifications are now enabled.",
        link: "/dashboard",
      });
    }
  };

  return (
    <div className="custom-wrap">
      <h2 className="custom-heading">Settings</h2>  
      
      <ChangePassword />

      <SettingToggle
        label="Allow Notifications"
        Icon={Icons.Bell}
        enabled={notifications}
        onToggle={handleToggleNotifications}
      />

      <SettingToggle
        label="Theme Settings"
        Icon={Icons.DarkMode}
        enabled={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
      />

      <SettingDropdown
        label="Units of Measure"
        Icon={Icons.Language}
        value={units}
        options={[
          { value: "metric", label: "Metric" },
          { value: "imperial", label: "Imperial" },
        ]}
        onChange={setUnits}
      />

      <SettingDropdown
        label="Privacy Settings"
        Icon={Icons.Lock}
        value={privacy}
        options={[
          { value: "private", label: "Private" },
          { value: "public", label: "Public" },
        ]}
        onChange={setPrivacy}
      />
    </div>
  );
};

export default SettingsPage;
