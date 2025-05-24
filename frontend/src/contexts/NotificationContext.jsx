import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../utils/api";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showBell, setShowBell] = useState(false);

  // Memoized addNotification
  const addNotification = useCallback((notification) => {
    setNotifications((prev) => {
      if (prev.find((n) => n.id === notification.id)) return prev;
      return [...prev, notification];
    });
    setShowBell(true);
  }, []);

  const markNotificationsRead = async () => {
    try {
      await api.post("/notifications/mark_read/");
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  const clearNotifications = async () => {
    setNotifications([]);
    setShowBell(false);
    await markNotificationsRead();
  };

  // Memoized fetchNotifications that uses addNotification
  const fetchNotifications = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await api.get("/notifications/");
      const data = response.data;
      (data.results || []).forEach((note) =>
        addNotification({
          id: note.id,
          title: note.title,
          description: note.message,
          link: "/notifications",
        })
      );
    } catch (err) {
      console.error("[fetchNotifications] Error fetching notifications", err);
    }
  }, [addNotification]);


 useEffect(() => {
  const checkTokenAndFetch = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  };

  // Initial check
  checkTokenAndFetch();

  // Listen for storage changes (when another tab logs in)
  window.addEventListener("storage", checkTokenAndFetch);

  // Polling every 60 seconds
  const interval = setInterval(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchNotifications();
    }
  }, 60000);

  return () => {
    window.removeEventListener("storage", checkTokenAndFetch);
    clearInterval(interval);
  };
}, [fetchNotifications]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showBell,
        addNotification,
        clearNotifications,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
