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

const formatDuration = (duration) => {
  return typeof duration === "number"
    ? `${duration.toFixed(1)} hrs`
    : duration
    ? `${parseFloat(duration).toFixed(1)} hrs`
    : "N/A";
};

const SleepLogList = ({ logs, onEdit, onDelete }) => {
  if (!Array.isArray(logs)) {
    return <div className="text-muted">No sleep logs available.</div>;
  }

  return (
    <div className="custom-wrap mt-4">
      <h5 className="custom-heading text-center mb-3">Your Sleep Logs</h5>
      {logs.length === 0 ? (
        <p className="text-center text-muted">No logs found.</p>
      ) : (
        <ul className="list-group shadow-sm">
          {logs.map((log) => (
            <li
              key={log.id}
              className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
            >
              <div className="pe-md-3 mb-2 mb-md-0 w-100">
                <strong>
                  <time dateTime={log.date}>{formatDate(log.date)}</time>
                </strong>{" "}
                — {formatDuration(log.duration_hours)} — Rating:{" "}
                {log.quality_rating ?? "N/A"}
                <br />
                <small className="text-muted">
                  Bedtime:{" "}
                  {log.bedtime ? <time>{log.bedtime}</time> : "N/A"} | Wake:{" "}
                  {log.wake_time ? <time>{log.wake_time}</time> : "N/A"} | Feeling:{" "}
                  {log.wake_feeling || "N/A"}
                </small>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onEdit(log)}
                  aria-label={`Edit sleep log for ${log.date}`}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
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
