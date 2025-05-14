import React, { useState, useEffect, useCallback } from "react";
import api from "../utils/api";
import ExerciseFormModal from "./ExerciseFormModal";
import { getExerciseIcon } from "../utils/iconHelper";
import { isThisWeek, isThisMonth, parseISO } from "date-fns";

const ExerciseLogPage = () => {
  const [exercises, setExercises] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchExercises = async () => {
  try {
    const res = await api.get("/exercises/");
    const data = Array.isArray(res.data) ? res.data : [];
    console.log("Fetched exercises:", data);
    setExercises(data);
  } catch (err) {
    console.error(err);
    // fallback to empty array on error
    setExercises([]);
  }
};

  useEffect(() => {
    fetchExercises();
  }, []);

  const applyFilter = useCallback(() => {
  console.log("Applying filter:", filter);

  const logDates = exercises.map((ex) => [ex.name, ex.date]);
  console.log("Exercise dates:", logDates);

  if (filter === "week") {
    const result = exercises.filter((ex) => isThisWeek(parseISO(ex.date)));
    console.log("Filtered by week:", result);
    setFiltered(result);
  } else if (filter === "month") {
    const result = exercises.filter((ex) => isThisMonth(parseISO(ex.date)));
    console.log("Filtered by month:", result);
    setFiltered(result);
  } else {
    console.log("All exercises:", exercises);
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
    if (!window.confirm("Delete this exercise?")) return;
    try {
      await api.delete(`/exercises/${id}/`);
      fetchExercises();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (form) => {
    try {
      if (selectedExercise) {
        await api.put(`/exercises/${selectedExercise.id}/`, form);
        setTimeout(() => fetchExercises(), 300);
      } else {
        await api.post("/exercises/", form);
        // Give server time to commit
        setTimeout(() => fetchExercises(), 300);
      }
      fetchExercises();
      setShowModal(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

return (
    <div className="custom-wrap">
      <h2 className="custom-heading">Exercise Log</h2>

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

      {filtered.length === 0 ? (
        <p className="text-center text-muted">No exercises to display.</p>
      ) : (
        <div className="table-responsive">
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
                  <td>{ex.date}</td>
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
      )}

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
