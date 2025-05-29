import React, { useEffect, useState, useCallback } from "react";
import {
  getSleepLogs,
  createSleepLog,
  updateSleepLog,
  deleteSleepLog,
} from "../../utils/api";
import SleepFormModal from "./SleepFormModal";
import SleepLogList from "./SleepLogList";
import SleepLogChart from "./SleepLogChart";
import SleepEncouragement from "./SleepEncouragement";
import AlarmSetting from "./AlarmSetting";
import Swal from "sweetalert2";

const defaultFormData = {
  date: "",
  bedtime: "",
  wake_time: "",
  duration_hours: "",
  quality_rating: "3",
  wake_feeling: "",
  notes: "",
};

const SleepLogPage = ({ onDataChanged }) => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [editingId, setEditingId] = useState(null);
  const [alarm, setAlarm] = useState({ sleep: "", wake: "" });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Fetch logs function - correctly handling pagination response
  const fetchLogs = useCallback(async () => {
    try {
      const res = await getSleepLogs();
      const data = Array.isArray(res.data.results) ? res.data.results : [];
      setLogs(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
      setError("Failed to fetch sleep logs");
    }
  }, []);

  // On mount, fetch logs
  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Toast auto-hide
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Notify parent about average sleep
  useEffect(() => {
    if (logs.length && onDataChanged) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const recentLogs = logs.filter((log) => new Date(log.date) >= oneWeekAgo);

      const avgDuration =
        recentLogs.reduce((acc, log) => acc + parseFloat(log.duration_hours || 0), 0) /
        (recentLogs.length || 1);

      onDataChanged({ avg_sleep_hours: parseFloat(avgDuration.toFixed(1)) });
    }
  }, [logs, onDataChanged]);

  // Handle form submit (create or update)
  const handleSubmit = async () => {
    const bedtime = new Date(`1970-01-01T${formData.bedtime}`);
    const wakeTime = new Date(`1970-01-01T${formData.wake_time}`);
    const calculatedDuration = (wakeTime - bedtime + 86400000) % 86400000 / 3600000;

    if (
      formData.bedtime &&
      formData.wake_time &&
      (isNaN(calculatedDuration) || calculatedDuration > 24)
    ) {
      setToastMessage("Bedtime and wake time must form a valid sleep duration.");
      setShowToast(true);
      return;
    }

    const payload = {
      ...formData,
      duration_hours: parseFloat(formData.duration_hours),
      quality_rating: parseInt(formData.quality_rating),
      bedtime: formData.bedtime || "",
      wake_time: formData.wake_time || "",
      wake_feeling: formData.wake_feeling || "",
      notes: formData.notes || "",
    };

    if (
      isNaN(payload.duration_hours) ||
      payload.duration_hours <= 0 ||
      payload.duration_hours > 24
    ) {
      setToastMessage("Duration must be between 0 and 24 hours.");
      setShowToast(true);
      return;
    }

    try {
      if (editingId) {
        await updateSleepLog(editingId, payload);
        setToastMessage("Sleep log updated successfully!");
      } else {
        await createSleepLog(payload);
        setToastMessage("Sleep log added successfully!");
      }

      setShowToast(true);
      setFormData(defaultFormData);
      setEditingId(null);
      setShowModal(false);

      // Refresh logs after adding/updating
      await fetchLogs();
    } catch (err) {
      console.error("Error saving sleep log:", err.response?.data || err);

      setToastMessage(
        err.response?.status === 401
          ? "You must be logged in to save sleep logs."
          : "Something went wrong while saving."
      );

      setShowToast(true);
    }
  };

  const handleEdit = (log) => {
    setFormData({
      ...log,
      duration_hours: log.duration_hours.toString(),
      quality_rating: log.quality_rating.toString(),
    });
    setEditingId(log.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Sleep Log?",
    text: "This will permanently remove the sleep entry from your log.",
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
    await deleteSleepLog(id);
    await fetchLogs(); // Refresh logs
    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Sleep log deleted successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
    onDataChanged?.();
  } catch (err) {
    console.error("Failed to delete sleep log:", err);
    Swal.fire("Error", "Failed to delete the sleep log.", "error");
  }
};

  const handleCloseModal = () => {
    setFormData(defaultFormData);
    setEditingId(null);
    setShowModal(false);
  };

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentLogs = logs.filter((log) => new Date(log.date) >= oneWeekAgo);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center page-title">Sleep Log</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          + Add Entry
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {logs.length === 0 && !error && (
        <div className="alert alert-info text-center">
          No sleep logs yet. Start by adding one!
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingId ? "Edit Log" : "New Sleep Log"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <SleepFormModal data={formData} setData={setFormData} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {editingId ? "Update Log" : "Save Log"}
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast show align-items-center text-white bg-success border-0">
            <div className="d-flex">
              <div className="toast-body">{toastMessage}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <SleepLogChart logs={logs} />

      {/* Log List */}
      <SleepLogList logs={logs} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Alarm and Encouragement */}
      <AlarmSetting alarm={alarm} setAlarm={setAlarm} />

      {/* Encouragement */}
      <SleepEncouragement logs={recentLogs} />
    </div>
  );
};

export default SleepLogPage;
