import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useUnits } from "../../contexts/UnitsContext";

const mealTypes = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
  { value: "drink", label: "Drink" },
];

const getToday = () => new Date().toISOString().split("T")[0];

const defaultForm = {
  meal_type: "breakfast",
  name: "",
  calories: "",
  protein: "",
  carbs: "",
  fats: "",
  notes: "",
  date: getToday(),
  water_amount: "",
};

const MealFormModal = ({ show, handleClose, onSave, meal }) => {
  const { units } = useUnits();
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(meal ? { ...defaultForm, ...meal } : defaultForm);
  }, [meal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const convertWater = (value, to) =>
    to === "imperial"
      ? (value * 33.814).toFixed(1)
      : (value / 33.814).toFixed(2);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{meal ? "Edit Meal" : "Add Meal"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Meal Type</Form.Label>
            <Form.Select name="meal_type" value={form.meal_type} onChange={handleChange} required>
              {mealTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Food Name</Form.Label>
            <Form.Control type="text" name="name" value={form.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Calories</Form.Label>
            <Form.Control type="number" name="calories" value={form.calories} min="0" step="1" onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Protein (g)</Form.Label>
            <Form.Control type="number" name="protein" value={form.protein} min="0" step="0.1" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Carbs (g)</Form.Label>
            <Form.Control type="number" name="carbs" value={form.carbs} min="0" step="0.1" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fats (g)</Form.Label>
            <Form.Control type="number" name="fats" value={form.fats} min="0" step="0.1" onChange={handleChange} />
          </Form.Group>

          {form.meal_type === "drink" && (
            <Form.Group className="mb-3">
              <Form.Label>Water Amount ({units === "metric" ? "liters" : "oz"})</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                name="water_amount"
                value={
                  units === "metric"
                    ? form.water_amount
                    : convertWater(form.water_amount, "imperial")
                }
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    water_amount:
                      units === "imperial"
                        ? convertWater(e.target.value, "metric")
                        : e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" name="notes" value={form.notes} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
            <Button variant="primary" type="submit">{meal ? "Update" : "Add"}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MealFormModal;
