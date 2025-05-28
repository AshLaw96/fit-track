import React, { useState } from "react";
import { useNotifications } from "../contexts/NotificationContext";
import Modal from "./NotificationModal";
import { Icons } from "../utils/iconHelper";

const NotificationBell = () => {
  const { notifications, showBell, clearNotifications } = useNotifications();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    clearNotifications();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setModalOpen(true);
    }
  };

  return (
    <>
      {showBell && (
        <button
          className="notification-bell"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-label={`You have ${notifications.length} new notifications`}
        >
          <Icons.Bell />
          <span className="notification-dot" />
        </button>
      )}

      {modalOpen && (
        <Modal
          notifications={notifications}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default NotificationBell;
