import React from "react";
import SettingToggle from "./SettingToggle";
import SettingDropdown from "./SettingDropdown";
import ChangePassword from "./ChangePassword";
import { Icons } from "../../utils/iconHelper";
import { useNotifications } from "../../contexts/NotificationContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useUnits } from "../../contexts/UnitsContext";
import "../../styles/SettingsPage.css";

const SettingsPage = () => {
  const { units, setUnits } = useUnits();
  const { darkMode, setDarkMode } = useTheme();
  const { addNotification, allowNotifications, setAllowNotifications } = useNotifications();

  const handleToggleNotifications = () => {
    const newValue = !allowNotifications;
    setAllowNotifications(newValue);

    if (newValue) {
      addNotification({
        title: "Notifications Enabled",
        description: "You'll now receive alerts and reminders.",
        link: "/",
      });
    }
  };

  return (
    <div className="custom-wrap settings-page" role="region" aria-labelledby="settings-heading">
      <h2 id="settings-heading" className="custom-heading mb-4 page-title">Settings</h2>

      <ChangePassword />

      <SettingToggle
        label="Allow Notifications"
        Icon={Icons.Bell}
        enabled={allowNotifications}
        onToggle={handleToggleNotifications}
      />

      <SettingToggle
        label="Theme Settings"
        Icon={Icons.DarkMode}
        enabled={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
      />

      <SettingDropdown
        label="Weight Units"
        Icon={Icons.Weight}
        value={units.weight}
        options={[
          { value: "kilograms", label: "Kilograms" },
          { value: "grams", label: "Grams" },
          { value: "pounds", label: "Pounds" },
        ]}
        onChange={(value) => setUnits({ ...units, weight: value })}
      />

      <SettingDropdown
        label="Volume Units"
        Icon={Icons.Fluid}
        value={units.volume}
        options={[
          { value: "liters", label: "Liters" },
          { value: "milliliters", label: "Milliliters" },
          { value: "gallons", label: "Gallons" },
        ]}
        onChange={(value) => setUnits({ ...units, volume: value })}
      />

      <SettingDropdown
        label="Length Units"
        Icon={Icons.Ruler}
        value={units.length}
        options={[
          { value: "centimeters", label: "Centimeters" },
          { value: "meters", label: "Meters" },
          { value: "inches", label: "Inches" },
        ]}
        onChange={(value) => setUnits({ ...units, length: value })}
      />

    </div>
  );
};

export default SettingsPage;
