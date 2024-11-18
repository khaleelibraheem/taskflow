export class NotificationService {
  constructor() {
    this.notificationPermission = Notification?.permission || "default";
    this.notificationTimers = new Map();
    this.enabled = localStorage.getItem("notificationsEnabled") === "true";
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    localStorage.setItem("notificationsEnabled", enabled);

    if (!enabled) {
      this.clearAllNotifications();
    }
  }

  async init() {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications");
      return false;
    }

    try {
      if (this.notificationPermission !== "granted") {
        const permission = await Notification.requestPermission();
        this.notificationPermission = permission;
      }

      return this.notificationPermission === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }

  scheduleNotification(task) {
    if (
      !this.enabled ||
      !task.dueDate ||
      this.notificationPermission !== "granted"
    ) {
      return;
    }

    if (this.notificationPermission !== "granted") {
      this.init().then((granted) => {
        if (granted) {
          this._scheduleNotifications(task);
        }
      });
      return;
    }

    this._scheduleNotifications(task);
  }

  _scheduleNotifications(task) {
    if (!this.enabled || this.notificationPermission !== "granted") {
      return;
    }

    this.clearNotifications(task.id);

    const dueDate = new Date(task.dueDate);
   const notifications = [
     { time: 24 * 60 * 60 * 1000, message: "1 day" }, // 24 hours before
     { time: 2 * 60 * 60 * 1000, message: "2 hours" }, // 2 hours before
     { time: 30 * 60 * 1000, message: "30 minutes" }, // 30 minutes before
   ];

    const newTimers = notifications
      .map(({ time, message }) => {
        const notificationTime = new Date(dueDate.getTime() - time);
        const now = new Date();

        if (notificationTime > now) {
          const timerId = setTimeout(() => {
            if (this.enabled) {
              this.showNotification(task, message);
            }
          }, notificationTime.getTime() - now.getTime());

          return timerId;
        }
        return null;
      })
      .filter(Boolean);

    this.notificationTimers.set(task.id, newTimers);
  }

  showNotification(task, timeRemaining) {
    if (!this.enabled || this.notificationPermission !== "granted") {
      return;
    }

    const notification = new Notification(`Task Due Soon: ${task.title}`, {
      body: `This task is due in ${timeRemaining}`,
      icon: "/favicon.ico",
      tag: `task-${task.id}-${timeRemaining}`,
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }

  clearNotifications(taskId) {
    const timers = this.notificationTimers.get(taskId);
    if (timers) {
      timers.forEach((timerId) => clearTimeout(timerId));
      this.notificationTimers.delete(taskId);
    }
  }

  clearAllNotifications() {
    for (const taskId of this.notificationTimers.keys()) {
      this.clearNotifications(taskId);
    }
    this.notificationTimers.clear();
  }

  updateNotification(task) {
    this.clearNotifications(task.id);
    if (this.enabled) {
      this.scheduleNotification(task);
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
