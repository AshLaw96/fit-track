import React, { useState, useEffect, useCallback } from "react";
import api from "../utils/api";
import ExerciseFormModal from "./ExerciseFormModal";
import { getExerciseIcon } from "../utils/iconHelper";
import { isThisWeek, isThisMonth, parseISO, format } from "date-fns";
import Swal from "sweetalert2";

const ExerciseLogPage = ({ onDataChanged }) => {
  const [exercises, setExercises] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchExercises = async () => {
    try {
      const res = await api.get("/exercises/");
      const data = Array.isArray(res.data.results) ? res.data.results : [];
      setExercises(data);
    } catch (err) {
      console.error("Failed to fetch exercises:", err);
      setExercises([]);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const applyFilter = useCallback(() => {
    if (filter === "week") {
      setFiltered(exercises.filter((ex) => isThisWeek(parseISO(ex.date))));
    } else if (filter === "month") {
      setFiltered(exercises.filter((ex) => isThisMonth(parseISO(ex.date))));
    } else {
      setFiltered(exercises);
    }
  }, [exercises, filter]);

  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const handleAdd = () => {
    setSelectedExercise(null);
    setShowModal(true);
  };

  const handleEdit = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Exercise?",
      text: "This will permanently remove the exercise from your log.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal",
        confirmButton: "btn-confirm",
        cancelButton: "btn-cancel",
        title: "swal-title",
        content: "swal-content"
      },
      // disable default styles
      buttonsStyling: false
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/exercises/${id}/`);
      await fetchExercises();
      setSuccessMessage("Exercise deleted successfully!");
      onDataChanged?.();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Failed to delete the exercise.", "error");
    }
  };

  const handleSave = async (form) => {
    try {
      if (selectedExercise) {
        await api.put(`/exercises/${selectedExercise.id}/`, form);
        setSuccessMessage("Exercise updated successfully!");
      } else {
        await api.post("/exercises/", form);
        setSuccessMessage("Exercise added successfully!");
      }
      setShowModal(false);
      await fetchExercises();
      onDataChanged?.();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="custom-wrap">
      <h2 className="custom-heading">Exercise Log</h2>

      {successMessage && (
        <div className="alert alert-success text-center">{successMessage}</div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <label className="fw-bold">Filter:</label>
        <select
          className="form-select w-50"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="d-none d-md-block">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Notes</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ex) => (
              <tr key={ex.id}>
                <td>
                  <span className="me-1">{getExerciseIcon(ex.name)}</span>
                  {ex.type.charAt(0).toUpperCase() + ex.type.slice(1)}
                </td>
                <td>{ex.name}</td>
                <td>{ex.duration} min</td>
                <td>{ex.calories_burned}</td>
                <td>{ex.notes}</td>
                <td>{format(parseISO(ex.date), "MMM d, yyyy")}</td>
                <td>
                  <div className="d-grid gap-1">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(ex)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(ex.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="d-block d-md-none">
        {filtered.map((ex) => (
          <div className="card mb-3 shadow-sm" key={ex.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">
                  {getExerciseIcon(ex.name)}{" "}
                  {ex.type.charAt(0).toUpperCase() + ex.type.slice(1)}
                </h5>
                <small className="text-muted">
                  {format(parseISO(ex.date), "MMM d")}
                </small>
              </div>
              <p className="mb-1 fw-bold">{ex.name}</p>
              <p className="mb-1">{ex.duration} min — {ex.calories_burned} kcal</p>
              {ex.notes && (
                <p className="mb-2 text-muted" style={{ fontSize: "0.9rem" }}>
                  <i>{ex.notes}</i>
                </p>
              )}
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(ex)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(ex.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleAdd}>
          <i className="fa-solid fa-plus me-2"></i> Add Exercise
        </button>
      </div>

      <ExerciseFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleSave}
        exercise={selectedExercise}
      />
    </div>
  );
};

export default ExerciseLogPage;
