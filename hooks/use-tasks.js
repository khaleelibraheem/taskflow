"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  initialized: false,
  setTasks: (tasks) => set({ tasks, initialized: true }),
  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  batchUpdateTasks: (taskIds, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        taskIds.includes(task.id) ? { ...task, ...updates } : task
      ),
    })),
  batchDeleteTasks: (taskIds) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => !taskIds.includes(task.id)),
    })),
}));

export function useTasks() {
  const {
    tasks,
    initialized,
    setTasks,
    addTask,
    updateTask: updateTaskInStore,
    deleteTask: deleteTaskFromStore,
  } = useTaskStore();
  const [loading, setLoading] = useState(!initialized);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (initialized) return;

      try {
        setLoading(true);
        const response = await fetch("/api/tasks");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tasks");
        }

        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTasks(sortedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message || "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [initialized]);

  const createTask = async (taskData) => {
    const tempId = `temp-${Date.now()}`;
    const tempTask = {
      id: tempId,
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      addTask(tempTask);

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const createdTask = await response.json();
      updateTaskInStore(tempId, createdTask);

      return createdTask;
    } catch (error) {
      deleteTaskFromStore(tempId);
      throw error;
    }
  };

  const updateTask = async (taskId, updatedData) => {
    const originalTask = tasks.find((task) => task.id === taskId);

    try {
      updateTaskInStore(taskId, {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      });

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();
      updateTaskInStore(taskId, updatedTask);

      return updatedTask;
    } catch (error) {
      updateTaskInStore(taskId, originalTask);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);

    try {
      deleteTaskFromStore(taskId);

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      addTask(taskToDelete);
      throw error;
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "COMPLETED").length,
    inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    todo: tasks.filter((t) => t.status === "TODO").length,
    byPriority: {
      HIGH: tasks.filter((t) => t.priority === "HIGH").length,
      MEDIUM: tasks.filter((t) => t.priority === "MEDIUM").length,
      LOW: tasks.filter((t) => t.priority === "LOW").length,
    },
  };

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTasks(sortedData);
      setError(null);
    } catch (error) {
      console.error("Error refetching tasks:", error);
      setError(error.message || "Failed to refresh tasks");
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    stats,
    createTask,
    updateTask,
    deleteTask,
    refetch,
  };
}
