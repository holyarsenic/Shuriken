import { createContext, useContext, useState, useCallback } from "react";
import api from "../api/axios";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = useCallback(async () => {

    try {
      const res = await api.get("/notification/");
      setNotifications(res.data.data);
      console.log("Fetched notifications:", res.data.data);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error.message);
      }
      setNotifications([]);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await api.patch(`/notification/${notificationId}/read`);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error.message);
      }
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await api.patch("/notification/read-all");

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error.message);
      }
    }
  }, []);

  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await api.delete(`/notification/${notificationId}`);

      setNotifications((prev) =>
        prev.filter(
          (notification) => notification._id !== notificationId
        )
      );
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error(error.message);
      }
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const Notification = () => useContext(NotificationContext);