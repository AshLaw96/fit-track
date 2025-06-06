import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { format, startOfWeek, addDays } from "date-fns";
import WorkoutPlanner from "./WorkoutModalPlanner";
import api from "../../utils/api";
import { toast } from "react-toastify";
import "../../styles/Workout.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const getDateOfWeek = (i) =>
  format(addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i), "yyyy-MM-dd");

const WorkoutNutrition = ({ data, refreshDashboardData }) => {
  const { todays_macros = {}, workout_plan_id, user_id } = data || {};
  const hasMacros = todays_macros?.protein || todays_macros?.carbs || todays_macros?.fats;

  const defaultWorkouts = days.map((_, i) => ({
    date: getDateOfWeek(i),
    sessions: [],
  }));

  const [weeklyWorkouts, setWeeklyWorkouts] = useState(defaultWorkouts);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const [modalSessions, setModalSessions] = useState([]);
  const [isRepeating, setIsRepeating] = useState(false);
  const [planId, setPlanId] = useState(workout_plan_id); // ✅ Initialize from props

  // ✅ Update isEditing dynamically
  const isEditing = !!planId;

  const normalizeTime = (timeStr) => {
    const parts = timeStr.split(":");
    if (parts.length === 2) {
      const [hh, mm] = parts;
      return `${hh.padStart(2, "0")}:${mm.padStart(2, "0")}:00`;
    }
    if (parts.length === 3) {
      return parts.map((p) => p.padStart(2, "0")).join(":");
    }
    return timeStr;
  };

  useEffect(() => {
    if (!Array.isArray(data?.daily_workouts)) return;

    const groupedByDay = days.map((_, i) => ({
      date: getDateOfWeek(i),
      sessions: [],
    }));

    data.daily_workouts.forEach((w) => {
      const dayIndex = days.findIndex((_, i) => getDateOfWeek(i) === w.date);
      if (dayIndex !== -1) {
        groupedByDay[dayIndex].sessions.push({
          time: w.time?.slice(0, 5) || "",
          type: w.activity || "",
          duration: w.duration || "",
        });
      }
    });

    setWeeklyWorkouts(groupedByDay);
    setPlanId(data?.workout_plan_id || null); // ✅ Always sync plan ID with incoming data
  }, [data]);

  const openModal = (index) => {
    setActiveDayIndex(index);
    setModalSessions(weeklyWorkouts[index]?.sessions || []);
    setModalVisible(true);
  };

  const handleModalSave = () => {
    const updated = [...weeklyWorkouts];
    updated[activeDayIndex] = {
      date: getDateOfWeek(activeDayIndex),
      sessions: modalSessions,
    };
    setWeeklyWorkouts(updated);
    setModalVisible(false);
  };

  const handleSaveWeek = async () => {
    const daily_workouts = weeklyWorkouts.flatMap((day) =>
      (day.sessions || [])
        .filter((session) => session.type && session.time && session.duration)
        .map((session) => ({
          date: day.date,
          time: normalizeTime(session.time),
          activity: session.type,
          duration: session.duration,
        }))
    );

    const payload = {
      user: user_id,
      title: `Weekly Workout Plan (${format(new Date(), "yyyy-MM-dd")})`,
      description: "Created via dashboard",
      daily_workouts,
    };

    try {
      const response = isEditing
        ? await api.put(`/workout_plans/${planId}/`, payload)
        : await api.post("/workout_plans/", payload);

      toast.success("Workout plan saved successfully!");
      setPlanId(response.data?.id); // ✅ Update local plan ID from response
      await refreshDashboardData?.(); // ✅ Refresh parent dashboard
    } catch (err) {
      if (err.response) {
        console.error("Backend error details:", err.response.data);
        toast.error("Failed to save: " + JSON.stringify(err.response.data));
      } else {
        console.error("Network error:", err.message);
        toast.error("Network error saving workout plan.");
      }
    }
  };

  const handleRepeatWeek = async () => {
    if (!planId) {
      toast.error("No existing workout plan to repeat.");
      return;
    }

    try {
      await api.post(`/workout_plans/${planId}/repeat_next_week/`);
      toast.success("Workout plan repeated for next week!");
      setIsRepeating(true);
      await refreshDashboardData?.();
    } catch (err) {
      console.error("Error repeating plan:", err.response?.data || err.message);
      toast.error("Failed to repeat workout plan.");
    }
  };

  // Check if today is Sunday
  const isSunday = new Date().getDay() === 0;

  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">Workout & Nutrition</h4>

      {/* Workout Section */}
      <div>
        <strong>Weekly Workout Plan:</strong>
        <div className="table-responsive">
          <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>Day</th>
                <th>Workouts</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {weeklyWorkouts.map((day, index) => (
                <tr key={index}>
                  <td>{days[index]}</td>
                  <td>
                    {day.sessions.length > 0 ? (
                      <ul className="mb-0">
                        {day.sessions.map((s, i) => (
                          <li key={i}>
                            {s.time} - {s.type} ({s.duration})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <em className="text-muted">No workouts</em>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => openModal(index)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex gap-2 mt-2">
          <button className="btn btn-success" onClick={handleSaveWeek}>
            Save Plan
          </button>
          <div className="tooltip-wrapper">
            <button
              className="btn btn-secondary"
              onClick={handleRepeatWeek}
              disabled={isRepeating || !isSunday}
            >
              {isRepeating ? "Repeating Next Week" : "Repeat Next Week"}
            </button>
            {!isSunday && <span className="tooltip-text">Only available on Sundays</span>}
          </div>
        </div>
      </div>

      {/* Macronutrients Pie Chart */}
      <div className="mt-4">
        <strong>Macronutrients:</strong>
        {hasMacros ? (
          <Pie
            data={{
              labels: ["Protein", "Carbs", "Fats"],
              datasets: [
                {
                  data: [todays_macros.protein, todays_macros.carbs, todays_macros.fats],
                  backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      const label = tooltipItem.label || "";
                      const value = tooltipItem.raw || 0;
                      return `${label}: ${value}g`;
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <div className="text-muted">No nutrition data available yet.</div>
        )}
      </div>

      {/* Workout Modal */}
      <WorkoutPlanner
        show={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleModalSave}
        sessions={modalSessions}
        setSessions={setModalSessions}
        dayIndex={activeDayIndex}
        date={activeDayIndex !== null ? getDateOfWeek(activeDayIndex) : ""}
        dayLabel={activeDayIndex !== null ? days[activeDayIndex] : ""}
      />
    </div>
  );
};

export default WorkoutNutrition;
