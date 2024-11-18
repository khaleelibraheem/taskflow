import { useEffect, useState } from "react";
import notificationService from "@/lib/notifications";

export function useNotifications() {
  const [isEnabled, setIsEnabled] = useState(notificationService.enabled);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "notificationsEnabled") {
        setIsEnabled(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleNotifications = async () => {
    if (!("Notification" in window)) {
      return false;
    }

    try {
      if (Notification.permission === "denied") {
        return false;
      }

      if (Notification.permission !== "granted") {
        const granted = await notificationService.init();
        if (!granted) {
          return false;
        }
      }

      const newEnabled = !isEnabled;
      notificationService.setEnabled(newEnabled);
      setIsEnabled(newEnabled);
      return true;
    } catch (error) {
      console.error("Toggle error:", error);
      return false;
    }
  };

  return {
    isEnabled,
    toggleNotifications,
    scheduleNotification: (task) =>
      notificationService.scheduleNotification(task),
    updateNotification: (task) => notificationService.updateNotification(task),
    clearNotifications: (taskId) =>
      notificationService.clearNotifications(taskId),
  };
}
