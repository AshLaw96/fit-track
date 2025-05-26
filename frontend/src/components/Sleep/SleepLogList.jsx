import React from "react";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date)
    ? dateStr
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const SleepLogList = ({ logs, onEdit, onDelete }) => {
  if (!Array.isArray(logs)) {
    return <div className="text-muted">No sleep logs available.</div>;
  }

  return (
    <div className="card p-3 mt-4 shadow-sm">
      <h5 className="text-center mb-3">Your Sleep Logs</h5>
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <ul className="list-group">
          {logs.map((log) => (
            <li
              key={log.id}
              className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
            >
              <div>
                <strong>{formatDate(log.date)}</strong> -{" "}
                {log.duration_hours ? `${log.duration_hours} hrs` : "No duration"} - Rating:{" "}
                {log.quality_rating ?? "N/A"}
                <br />
                <small className="text-muted">
                  Bedtime: {log.bedtime || "N/A"} | Wake: {log.wake_time || "N/A"} | Feeling:{" "}
                  {log.wake_feeling || "N/A"}
                </small>
              </div>
              <div className="mt-2 mt-md-0">
                <button
                  className="btn btn-sm btn-secondary me-2"
                  onClick={() => onEdit(log)}
                  aria-label={`Edit sleep log for ${log.date}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(log.id)}
                  aria-label={`Delete sleep log for ${log.date}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SleepLogList;
