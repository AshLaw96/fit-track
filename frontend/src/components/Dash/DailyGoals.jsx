import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DailyGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ goal_type: "", target_value: "" });
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [progressUpdates, setProgressUpdates] = useState({});

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await api.get("/goals/");
      console.log("Fetched goals:", res.data);

      const goalData = Array.isArray(res.data.results)
        ? res.data.results
        : [];

      setGoals(goalData);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
      toast.error("Failed to fetch goals.");
      setGoals([]);
    }
  };

  const getUnit = (type) => {
  switch (type) {
    case "sleep":
      return "hrs slept";
    case "sleep_quality":
      // e.g., out of 100
      return "sleep score";
    case "diet":
      return "cups water";
    case "diet_variety":
      // tracking 3 main meals
      return "meals logged";
    case "calories":
      return "kcal";
    case "protein":
      return "grams protein";
    case "carbs":
      return "grams carbs";
    case "fats":
      return "grams fat";
    case "fitness":
      return "steps";
    case "distance":
      return "km run";
    case "workouts":
      return "sessions";
    case "meditation":
      return "mins meditated";
    case "hydration":
      return "litres";
    case "heart_rate":
      return "bpm avg";
    case "mood":
      // e.g., out of 10
      return "mood rating";
    case "screen_time":
      return "hrs";
    case "reading":
      return "pages read";
    default:
      return "units";
  }
};

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      await api.post("/goals/", {
        ...newGoal,
        target_value: parseFloat(newGoal.target_value),
      });
      toast.success("Goal added!");
      setNewGoal({ goal_type: "", target_value: "" });
      fetchGoals();
    } catch (err) {
      toast.error("Error adding goal.");
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}/`);
      toast.success("Goal deleted.");
      fetchGoals();
    } catch {
      toast.error("Failed to delete goal.");
    }
  };

  const handleUpdateGoal = async (goal) => {
    try {
      await api.put(`/goals/${goal.id}/`, {
        goal_type: goal.goal_type,
        target_value: parseFloat(goal.target_value),
      });
      toast.success("Goal updated.");
      setEditingGoalId(null);
      fetchGoals();
    } catch {
      toast.error("Failed to update goal.");
    }
  };

  const handleProgressSubmit = async (goalId) => {
    const value = parseFloat(progressUpdates[goalId]);
    if (!value || value <= 0) return;

    try {
      await api.post("/progress/", {
        goal_id: goalId,
        progress_value: value,
      });
      toast.success("Progress added.");
      setProgressUpdates({ ...progressUpdates, [goalId]: "" });
      fetchGoals();
    } catch {
      toast.error("Failed to add progress.");
    }
  };

  return (
  <div className="container mt-4">
    <div className="card shadow-sm">
      <div className="card-body">
        <h4 className="card-title mb-3">Daily Goals</h4>

        {Array.isArray(goals) && goals.length === 0 && (
          <p>No goals yet. Add one below.</p>
        )}

        {Array.isArray(goals) &&
          goals.filter((goal) => goal.status !== "achieved").map((goal) => {
            const percent = Math.min(
              (goal.current_value / goal.target_value) * 100,
              100
            );
            const isEditing = editingGoalId === goal.id;

            return (
              <div key={goal.id} className="mb-4 border-bottom pb-3">
                {isEditing ? (
                  <div className="row g-2 mb-2">
                    <div className="col-12 col-md-4">
                      <select
                        className="form-select"
                        value={goal.goal_type}
                        onChange={(e) =>
                          setGoals((prev) =>
                            prev.map((g) =>
                              g.id === goal.id
                                ? { ...g, goal_type: e.target.value }
                                : g
                            )
                          )
                        }
                      >
                        <option value="">Choose goal type</option>
                        {/* ...options here... */}
                      </select>
                    </div>
                    <div className="col-12 col-md-4">
                      <div className="input-group flex-wrap">
                        <input
                          type="number"
                          min="1"
                          className="form-control"
                          placeholder={`Target (${getUnit(goal.goal_type)})`}
                          value={goal.target_value}
                          onChange={(e) =>
                            setGoals((prev) =>
                              prev.map((g) =>
                                g.id === goal.id
                                  ? { ...g, target_value: e.target.value }
                                  : g
                              )
                            )
                          }
                        />
                        <span className="input-group-text">
                          {getUnit(goal.goal_type)}
                        </span>
                      </div>
                    </div>
                    <div className="col-6 col-md-2">
                      <button
                        className="btn btn-success w-100"
                        onClick={() => handleUpdateGoal(goal)}
                      >
                        Save
                      </button>
                    </div>
                    <div className="col-6 col-md-2">
                      <button
                        className="btn btn-secondary w-100"
                        onClick={() => setEditingGoalId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-2">
                      <strong>{goal.goal_type.replace("_", " ").toUpperCase()}</strong>
                      <div className="d-flex flex-wrap gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setEditingGoalId(goal.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="text-muted mb-1">
                      Progress: {goal.current_value}/{goal.target_value}{" "}
                      {getUnit(goal.goal_type)}
                    </div>
                    <div className="progress mb-2" style={{ height: "20px" }}>
                      <div
                        className={`progress-bar ${
                          goal.status === "achieved" ? "bg-success" : ""
                        }`}
                        style={{ width: `${percent}%` }}
                      >
                        {Math.round(percent)}%
                      </div>
                    </div>

                    <div className="input-group input-group-sm flex-column flex-md-row">
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={progressUpdates[goal.id] || ""}
                        placeholder={`Add progress (${getUnit(goal.goal_type)})`}
                        onChange={(e) =>
                          setProgressUpdates({
                            ...progressUpdates,
                            [goal.id]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn btn-outline-success mt-2 mt-md-0"
                        onClick={() => handleProgressSubmit(goal.id)}
                      >
                        Add
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}

        {/* Add New Goal Form */}
        <form onSubmit={handleAddGoal} className="mt-4 pt-3 border-top">
          <h5>Add New Goal</h5>
          <div className="row g-2 align-items-center">
            <div className="col-12 col-md-5">
              <select
                required
                className="form-select"
                value={newGoal.goal_type}
                onChange={(e) =>
                  setNewGoal({ ...newGoal, goal_type: e.target.value })
                }
              >
                <option value="">Choose goal type</option>
                {/* ...options here... */}
              </select>
            </div>

            <div className="col-12 col-md-5">
              <div className="input-group flex-wrap">
                <input
                  required
                  type="number"
                  className="form-control"
                  min="1"
                  placeholder={`Target (${getUnit(newGoal.goal_type)})`}
                  value={newGoal.target_value}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, target_value: e.target.value })
                  }
                />
                <span className="input-group-text">
                  {getUnit(newGoal.goal_type)}
                </span>
              </div>
            </div>

            <div className="col-12 col-md-2">
              <button type="submit" className="btn btn-primary w-100">
                Add Goal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}

export default DailyGoals;
