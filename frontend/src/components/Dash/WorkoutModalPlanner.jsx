import React from "react";
import { Modal, Button } from "react-bootstrap";

const WorkoutModalPlanner = ({
  show,
  onClose,
  onSave,
  dayIndex,
  date,
  sessions,
  setSessions,
  dayLabel,
}) => {
  const handleChange = (i, field, value) => {
    const updated = [...sessions];
    updated[i][field] = value;
    setSessions(updated);
  };

  const addSession = () =>
    setSessions([...sessions, { time: "", type: "", duration: "" }]);

  const deleteSession = (i) => {
    const updated = [...sessions];
    updated.splice(i, 1);
    setSessions(updated);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Edit Workouts for {dayLabel} ({date})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {sessions.map((session, i) => (
          <div className="d-flex gap-2 mb-2" key={i}>
            <input
              type="time"
              className="form-control"
              value={session.time}
              onChange={(e) => handleChange(i, "time", e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Activity"
              value={session.type}
              onChange={(e) => handleChange(i, "type", e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Duration (e.g. 1hr)"
              value={session.duration}
              onChange={(e) => handleChange(i, "duration", e.target.value)}
            />
            <Button variant="danger" onClick={() => deleteSession(i)}>
              &times;
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={addSession}>
          + Add Another Workout
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkoutModalPlanner;
