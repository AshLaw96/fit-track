import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ExerciseFormModal = ({ show, handleClose, onSave, exercise }) => {
  const [form, setForm] = useState({
    type: "",
    category: "cardio",
    name: "",
    duration: "",
    calories_burned: "",
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (exercise) {
      setForm({
        type: exercise.type || "",
        category: exercise.category || "cardio",
        name: exercise.name || "",
        duration: exercise.duration || "",
        calories_burned: exercise.calories_burned || "",
        notes: exercise.notes || "",
      });
    } else {
      setForm({
        type: "",
        category: "cardio",
        name: "",
        duration: "",
        calories_burned: "",
        notes: "",
      });
    }
    setSuccessMessage("");
  }, [exercise]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await onSave(form);
      setSuccessMessage("Exercise saved successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        handleClose();
        // Delay before closing modal
      }, 1000);
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{exercise ? "Edit" : "Add"} Exercise</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && (
          <Alert variant="success" className="text-center">
            {successMessage}
          </Alert>
        )}
        <Form className="px-1 px-sm-2">
          <Form.Group className="mb-3">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Jogging"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="flexibility">Flexibility</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Specific Type</Form.Label>
            <Form.Control
              name="type"
              value={form.type}
              onChange={handleChange}
              placeholder="e.g. Jog, Swim, Bench Press"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Calories Burned</Form.Label>
            <Form.Control
              name="calories_burned"
              type="number"
              value={form.calories_burned}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="e.g. Warm-up routine, weather notes..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {exercise ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseFormModal;