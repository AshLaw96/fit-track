import React from "react";
import "../styles/NotificationModal.css";

const NotificationModal = ({ notifications, onClose }) => {
  return (
    <div className="notification-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-header">
        <h3 id="modal-title">Notifications</h3>
        <button onClick={onClose} aria-label="Close notifications modal">X</button>
      </div>
      <div className="modal-body">
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          notifications.map((note, i) => (
            <div key={i} className="notification-item">
              <h4>{note.title}</h4>
              <p>{note.description}</p>
              {note.link && (
                <a href={note.link} target="_blank" rel="noopener noreferrer">
                  View Details →
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
