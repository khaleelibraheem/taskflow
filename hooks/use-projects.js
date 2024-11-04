"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function fetchProjects() {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch projects");
      }

      setProjects(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  async function createProject(projectData) {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      // Update local state immediately
      setProjects((prevProjects) => [...prevProjects, data]);

      // Trigger refresh events
      window.dispatchEvent(new Event("projectUpdated"));
      router.refresh();

      console.log("Project created successfully:", data);

      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  // In useProjects.js
  async function updateProject(projectId, projectData) {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update project");
      }

      // Update local state immediately
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId ? { ...project, ...data } : project
        )
      );

      // Trigger refresh events
      window.dispatchEvent(new Event("projectUpdated"));
      router.refresh();

      return data;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  async function deleteProject(projectId) {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete project");
      }

      // Update local state immediately
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );

      // Trigger refresh events
      window.dispatchEvent(new Event("projectUpdated"));
      router.refresh();
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }

  // Add event listener for project updates
  useEffect(() => {
    const handleProjectUpdate = () => {
      fetchProjects();
    };

    window.addEventListener("projectUpdated", handleProjectUpdate);
    return () => {
      window.removeEventListener("projectUpdated", handleProjectUpdate);
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    createProject,
    deleteProject,
    refetch: fetchProjects,
    updateProject,
  };
}
