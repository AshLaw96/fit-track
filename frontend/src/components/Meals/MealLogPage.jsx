import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import MealFormModal from "./MealFormModal";
import { format, parseISO } from "date-fns";
import { getMealIcon } from "../../utils/iconHelper";
import Swal from "sweetalert2";

const MealLogPage = ({ onDataChanged }) => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchMeals = async () => {
    try {
      const res = await api.get("/meals/");
      const sortedMeals = (res.data.results || []).sort((a, b) => new Date(b.date) - new Date(a.date));
      setMeals(sortedMeals);
    } catch (err) {
      console.error("Failed to fetch meals:", err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  useEffect(() => {
    if (onDataChanged && meals.length) {
      const totalWater = meals
        .filter(m => m.meal_type === "drink" && m.water_amount)
        .reduce((sum, m) => sum + parseFloat(m.water_amount), 0);

      onDataChanged({ water_intake: totalWater.toFixed(2) });
    }
  }, [meals, onDataChanged]);

  const handleAdd = () => {
    setSelectedMeal(null);
    setShowModal(true);
  };

  const handleEdit = (meal) => {
    setSelectedMeal(meal);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Meal?",
      text: "This will permanently remove the meal from your log.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal",
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
        title: "swal-title",
        content: "swal-content",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/meals/${id}/`);
      await fetchMeals();
      Swal.fire("Deleted!", "Meal has been removed.", "success");
      onDataChanged?.();
    } catch (err) {
      console.error("Failed to delete meal:", err);
      Swal.fire("Error", "Failed to delete the meal.", "error");
    }
  };

  const handleSave = async (formData) => {
    const cleanedData = {
      ...formData,
      calories: parseFloat(formData.calories),
      protein: formData.protein ? parseFloat(formData.protein) : 0,
      carbs: formData.carbs ? parseFloat(formData.carbs) : 0,
      fats: formData.fats ? parseFloat(formData.fats) : 0,
      water_amount: formData.meal_type === "drink" ? parseFloat(formData.water_amount || 0) : null,
    };
    try {
      if (selectedMeal) {
        await api.put(`/meals/${selectedMeal.id}/`, cleanedData);
        setSuccessMessage("Meal updated!");
      } else {
        await api.post("/meals/", cleanedData);
        setSuccessMessage("Meal added!");
      }
      setShowModal(false);
      await fetchMeals();
      onDataChanged?.();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="custom-wrap">
      <h2 className="custom-heading">Meal Log</h2>
      {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

      {/* Desktop Table */}
      {meals.length > 0 ? (
        <div className="d-none d-md-block">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Type</th>
                <th>Food Entry</th>
                <th>Calories / Nutrients</th>
                <th>Notes</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal) => (
                <tr key={meal.id}>
                  <td>{getMealIcon(meal.meal_type)} {meal.meal_type}</td>
                  <td>{meal.name}</td>
                  <td>{meal.calories} kcal<br />{meal.protein}g P / {meal.carbs}g C / {meal.fats}g F</td>
                  <td>{meal.notes}</td>
                  <td>{format(parseISO(meal.date), "MMM d, yyyy")}</td>
                  <td>
                    <div className="d-grid gap-1">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(meal)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(meal.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted text-center">No meals logged.</p>
      )}

      {/* Mobile Cards */}
      <div className="d-block d-md-none">
        {meals.map((meal) => (
          <div className="card mb-3 shadow-sm" key={meal.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">{getMealIcon(meal.meal_type)} {meal.meal_type}</h5>
                <small className="text-muted">{format(parseISO(meal.date), "MMM d")}</small>
              </div>
              <p className="mb-1 fw-bold">{meal.name}</p>
              <p className="mb-1">{meal.calories} kcal — {meal.protein}g P / {meal.carbs}g C / {meal.fats}g F</p>
              {meal.notes && <p className="mb-2 text-muted" style={{ fontSize: "0.9rem" }}><i>{meal.notes}</i></p>}
              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(meal)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(meal.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleAdd}>
          <i className="fa-solid fa-plus me-2"></i> Add Meal
        </button>
      </div>

      <MealFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleSave}
        meal={selectedMeal}
      />
    </div>
  );
};

export default MealLogPage;
