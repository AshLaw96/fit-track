import React, { useState, useEffect, useMemo } from "react";
import api from "../../utils/api";
import ExerciseFormModal from "./ExerciseFormModal";
import { getExerciseIcon } from "../../utils/iconHelper";
import { isThisWeek, isThisMonth, parseISO, format } from "date-fns";
import Swal from "sweetalert2";
import debounce from "lodash.debounce";

const formatDate = (dateStr) => format(parseISO(dateStr), "MMM d, yyyy");
const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

const ExerciseLogPage = ({ onDataChanged }) => {
  const [exercises, setExercises] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch exercises (reusable)
  const fetchExercises = async () => {
    setLoading(true);
    try {
      const res = await api.get("/exercises/");
      let data = Array.isArray(res.data.results) ? res.data.results : [];

      // Sort by date descending
      data.sort((a, b) => new Date(b.date) - new Date(a.date));

      setExercises(data);
      setErrorMessage("");
    } catch (err) {
      console.error("Failed to fetch exercises:", err);
      setErrorMessage("Failed to fetch exercises");
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced version for useEffect only
  const debouncedFetchExercises = useMemo(() => debounce(fetchExercises, 300), []);

  useEffect(() => {
    debouncedFetchExercises();
    return () => debouncedFetchExercises.cancel();
  }, [debouncedFetchExercises]);

  useEffect(() => {
    if (filter === "week") {
      setFiltered(exercises.filter((ex) => isThisWeek(parseISO(ex.date))));
    } else if (filter === "month") {
      setFiltered(exercises.filter((ex) => isThisMonth(parseISO(ex.date))));
    } else {
      setFiltered(exercises);
    }
  }, [exercises, filter]);

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
        content: "swal-content",
      },
      buttonsStyling: false,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/exercises/${id}/`);
      await fetchExercises(); // Still usable here
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
      await fetchExercises(); // Still usable here
      onDataChanged?.();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Save failed:", err);
      setErrorMessage("Failed to save the exercise.");
    }
  };

  return (
    <div className="custom-wrap">
      <h2 className="custom-heading page-title">Exercise Log</h2>

      {successMessage && (
        <div className="alert alert-success text-center">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="alert alert-danger text-center">{errorMessage}</div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <label htmlFor="filterSelect" className="fw-bold">Filter:</label>
        <select
          id="filterSelect"
          className="form-select w-50"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter exercises"
        >
          <option value="all">All</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center">No exercises found.</p>
      ) : (
        <>
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
                      {capitalize(ex.type)}
                    </td>
                    <td>{ex.name}</td>
                    <td>{ex.duration} min</td>
                    <td>{ex.calories_burned}</td>
                    <td>{ex.notes}</td>
                    <td>{formatDate(ex.date)}</td>
                    <td>
                      <div className="d-grid gap-1">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(ex)}
                          aria-label={`Edit ${ex.name}`}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(ex.id)}
                          aria-label={`Delete ${ex.name}`}
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
                      {getExerciseIcon(ex.name)} {capitalize(ex.type)}
                    </h5>
                    <small className="text-muted">{format(parseISO(ex.date), "MMM d")}</small>
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
                      aria-label={`Edit ${ex.name}`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(ex.id)}
                      aria-label={`Delete ${ex.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleAdd} aria-label="Add new exercise">
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
