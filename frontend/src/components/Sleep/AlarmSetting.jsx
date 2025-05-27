import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const AlarmSetting = ({ alarm, setAlarm }) => {
  const [localAlarm, setLocalAlarm] = useState(alarm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLocalAlarm(alarm);
  }, [alarm]);

  useEffect(() => {
    // Debounce API update by 500ms after user stops typing
    const handler = setTimeout(() => {
      const updateAlarm = async () => {
        setLoading(true);
        setError(null);
        try {
          await api.put("/sleep/schedule/", {
            target_bedtime: localAlarm.sleep,
            target_wake_time: localAlarm.wake,
          });
          setAlarm(localAlarm); // update parent state after successful save
        } catch (err) {
          setError("Failed to save sleep schedule.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      if (localAlarm.sleep && localAlarm.wake) {
        updateAlarm();
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [localAlarm, setAlarm]);

  const handleChange = (e) => {
    setLocalAlarm({ ...localAlarm, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-3 shadow-sm mt-3">
      <h5 className="mb-3">Set Alarms</h5>

      <label htmlFor="sleepAlarm" className="form-label">
        Sleep Alarm
      </label>
      <input
        id="sleepAlarm"
        type="time"
        name="sleep"
        value={localAlarm.sleep || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <label htmlFor="wakeAlarm" className="form-label">
        Wake-up Alarm
      </label>
      <input
        id="wakeAlarm"
        type="time"
        name="wake"
        value={localAlarm.wake || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />

      {loading && <div className="alert alert-info">Saving...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Alarm summary */}
      {localAlarm.sleep && localAlarm.wake && (
        <div className="alert alert-info mt-2">
          Alarms set: Sleep at <strong>{localAlarm.sleep}</strong>, Wake at{" "}
          <strong>{localAlarm.wake}</strong>
        </div>
      )}
    </div>
  );
};

export default AlarmSetting;
