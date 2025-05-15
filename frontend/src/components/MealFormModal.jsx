import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const mealTypes = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
  { value: "drink", label: "Drink" },
];

const MealFormModal = ({ show, handleClose, onSave, meal }) => {
  const [form, setForm] = useState({
    meal_type: "breakfast",
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    notes: "",
    date: "",
    water_amount: "",
  });

  useEffect(() => {
    if (meal) {
      setForm({
        meal_type: meal.meal_type || "breakfast",
        name: meal.name || "",
        calories: meal.calories || "",
        protein: meal.protein || "",
        carbs: meal.carbs || "",
        fats: meal.fats || "",
        notes: meal.notes || "",
        date: meal.date || "",
        water_amount: meal.water_amount || "",
      });
    } else {
      setForm({
        meal_type: "breakfast",
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        notes: "",
        date: new Date().toISOString().slice(0, 10),
        water_amount: "",
      });
    }
  }, [meal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{meal ? "Edit Meal" : "Add Meal"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Meal Type</Form.Label>
            <Form.Select
              name="meal_type"
              value={form.meal_type}
              onChange={handleChange}
              required
            >
              {mealTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Food Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Calories</Form.Label>
            <Form.Control
              type="number"
              name="calories"
              value={form.calories}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Protein (g)</Form.Label>
            <Form.Control
              type="number"
              name="protein"
              value={form.protein}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Carbs (g)</Form.Label>
            <Form.Control
              type="number"
              name="carbs"
              value={form.carbs}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fats (g)</Form.Label>
            <Form.Control
              type="number"
              name="fats"
              value={form.fats}
              onChange={handleChange}
            />
          </Form.Group>

          {form.meal_type === "drink" && (
            <Form.Group className="mb-3">
                <Form.Label>Water Amount (liters)</Form.Label>
                <Form.Control
                type="number"
                step="0.1"
                name="water_amount"
                value={form.water_amount || ""}
                onChange={handleChange}
                required
                />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {meal ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MealFormModal;