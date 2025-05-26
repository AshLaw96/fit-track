import React from "react";
import api from "../../utils/api";

const AlarmSetting = ({ alarm, setAlarm }) => {
  const handleChange = async (e) => {
    const newAlarm = { ...alarm, [e.target.name]: e.target.value };
    setAlarm(newAlarm);

    try {
      await api.put("/sleep/schedule/", {
        target_bedtime: newAlarm.sleep,
        target_wake_time: newAlarm.wake,
      });
    } catch (err) {
      console.error("Failed to save sleep schedule:", err);
    }
  };


  return (
    <div className="card p-3 shadow-sm mt-3">
      <h5 className="mb-3">Set Alarms</h5>

      <label htmlFor="sleepAlarm" className="form-label">Sleep Alarm</label>
      <input
        id="sleepAlarm"
        type="time"
        name="sleep"
        value={alarm.sleep || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />

      <label htmlFor="wakeAlarm" className="form-label">Wake-up Alarm</label>
      <input
        id="wakeAlarm"
        type="time"
        name="wake"
        value={alarm.wake || ""}
        onChange={handleChange}
        className="form-control mb-3"
      />

      {/* Alarm summary */}
      {alarm.sleep && alarm.wake && (
        <div className="alert alert-info mt-2">
          Alarms set: Sleep at <strong>{alarm.sleep}</strong>, Wake at <strong>{alarm.wake}</strong>
        </div>
      )}
    </div>
  );
};

export default AlarmSetting;
