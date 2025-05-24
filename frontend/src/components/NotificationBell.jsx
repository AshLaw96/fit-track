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

  return (
    <>
      {showBell && (
        <div className="notification-bell" onClick={handleClick}>
          <Icons.Bell />
          {showBell && <span className="notification-dot" />}
        </div>
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
