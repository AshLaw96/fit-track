import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showBell, setShowBell] = useState(false);
  const { isAuthenticated } = useAuth();

  // Track allowNotifications preference (default true)
  const [allowNotifications, setAllowNotificationsState] = useState(() => {
    const stored = localStorage.getItem("allowNotifications");
    return stored !== null ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem("allowNotifications", JSON.stringify(allowNotifications));
  }, [allowNotifications]);

  // update allowNotifications
  const setAllowNotifications = (enabled) => {
    setAllowNotificationsState(enabled);
  };

  // Add a notification (only if allowed)
  const addNotification = useCallback(
    (notification) => {
      if (!allowNotifications) return; // Ignore if notifications not allowed

      setNotifications((prev) => {
        if (prev.find((n) => n.id === notification.id)) return prev;
        return [...prev, notification];
      });
      setShowBell(true);
    },
    [allowNotifications]
  );

  // Clear notifications & mark them read on server
  const clearNotifications = useCallback(async () => {
    setNotifications([]);
    setShowBell(false);
    try {
      await api.post("/notifications/mark_read/");
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  }, []);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!allowNotifications || !isAuthenticated) return; // Skip fetching if not allowed

    try {
      const response = await api.get("/notifications/");
      const data = response.data;
      (data.results || []).forEach((note) =>
        addNotification({
          id: note.id,
          title: note.title,
          description: note.message,
          link: note.link || "/",
        })
      );
    } catch (err) {
      console.error("[fetchNotifications] Error fetching notifications", err);
    }
  }, [addNotification, allowNotifications, isAuthenticated]);

  // Auto-fetch notifications if allowed on mount & every 60 seconds
  useEffect(() => {
    if (!allowNotifications || !isAuthenticated) return;

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications, allowNotifications, isAuthenticated]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showBell,
        addNotification,
        clearNotifications,
        fetchNotifications,
        allowNotifications,
        setAllowNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
