import React, { useState } from "react";
import { useNotifications } from "../contexts/NotificationContext";
import Modal from "./NotificationModal";
import { Icons } from "../utils/iconHelper";

const NotificationBell = () => {
  const { notifications, showBell, clearNotifications } = useNotifications();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
    // mark as viewed
    clearNotifications();
  };

  return (
    <>
      {showBell && (
        <div className="notification-bell" onClick={handleClick}>
          <Icons.Bell />
          <span className="notification-dot" />
        </div>
      )}

      {modalOpen && (
        <Modal
          notifications={notifications}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default NotificationBell;
