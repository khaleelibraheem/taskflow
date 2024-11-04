"use client";

import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   async function fetchTasks() {
     try {
       const response = await fetch("/api/tasks");
       const data = await response.json();

       if (!response.ok) {
         throw new Error(data.message || "Failed to fetch tasks");
       }

       setTasks(data);
       setError(null);
     } catch (error) {
       console.error("Error fetching tasks:", error);
       setError(error.message || "Failed to load tasks");
     } finally {
       setLoading(false);
     }
   }


  async function createTask(taskData) {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      await fetchTasks();
      window.dispatchEvent(new Event("taskUpdated"));
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

   async function updateTask(taskId, updatedData) {
     try {
       const response = await fetch(`/api/tasks/${taskId}`, {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedData),
       });

       if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Failed to update task");
       }

       await fetchTasks(); // Refresh the task list after successful update
       window.dispatchEvent(new Event("taskUpdated")); // Trigger update event
       return true; // Return success
     } catch (error) {
       console.error("Error updating task:", error);
       throw error; // Re-throw to handle in the component
     }
   }

  async function deleteTask(taskId) {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete task");
      }

      await fetchTasks(); // Refresh the task list after successful deletion
      window.dispatchEvent(new Event("taskUpdated")); // Trigger update event
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }


  async function batchUpdateTasks(taskIds, updateData) {
    try {
      await Promise.all(
        taskIds.map((taskId) =>
          fetch(`/api/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          })
        )
      );

      await fetchTasks();
    } catch (error) {
      console.error("Error updating tasks:", error);
      throw error;
    }
  }

  async function batchDeleteTasks(taskIds) {
    try {
      await Promise.all(
        taskIds.map((taskId) =>
          fetch(`/api/tasks/${taskId}`, {
            method: "DELETE",
          })
        )
      );

      await fetchTasks();
    } catch (error) {
      console.error("Error deleting tasks:", error);
      throw error;
    }
  }

  // Get tasks statistics
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

  // Listen for task updates
  useEffect(() => {
    fetchTasks();

    window.addEventListener("taskCreated", fetchTasks);
    window.addEventListener("taskUpdated", fetchTasks);

    return () => {
      window.removeEventListener("taskCreated", fetchTasks);
      window.removeEventListener("taskUpdated", fetchTasks);
    };
  }, []);

  return {
    tasks,
    loading,
    error,
    stats,
    createTask,
    updateTask,
    deleteTask,
    batchUpdateTasks,
    batchDeleteTasks,
    refetch: fetchTasks,
  };
}
