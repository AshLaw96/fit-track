import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotificationModal.css";

const NotificationModal = ({ notifications, onClose }) => {
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    // Close the modal first
    onClose();
    setTimeout(() => {
      // Navigate to the base path (e.g. "/")
      navigate(link.split("#")[0]);
      const anchor = link.split("#")[1];
      if (anchor) {
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
          // Delay to allow route/page to update
        }, 300);
      }
      // Delay after closing modal
    }, 100);
  };

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
                <button
                  onClick={() => handleLinkClick(note.link)}
                  className="notification-link btn btn-link p-0"
                  style={{ cursor: "pointer" }}
                >
                  View Details →
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
