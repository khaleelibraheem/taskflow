"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";

const useProjectStore = create((set) => ({
  projects: [],
  initialized: false,
  setProjects: (projects) => set({ projects, initialized: true }),
  addProject: (project) =>
    set((state) => ({
      projects: [project, ...state.projects],
    })),
  updateProject: (projectId, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === projectId ? { ...project, ...updatedProject } : project
      ),
    })),
  deleteProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== projectId),
    })),
}));

export function useProjects() {
  const {
    projects,
    initialized,
    setProjects,
    addProject,
    updateProject: updateProjectInStore,
    deleteProject: deleteProjectFromStore,
  } = useProjectStore();
  const [loading, setLoading] = useState(!initialized);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (initialized) return;

      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch projects");
        }

        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setProjects(sortedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [initialized]);

  const createProject = async (projectData) => {
    const tempId = `temp-${Date.now()}`;
    const tempProject = {
      id: tempId,
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: [],
    };

    try {
      addProject(tempProject);

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const createdProject = await response.json();
      updateProjectInStore(tempId, createdProject);

      return createdProject;
    } catch (error) {
      deleteProjectFromStore(tempId);
      throw error;
    }
  };

  const updateProject = async (projectId, projectData) => {
    const originalProject = projects.find(
      (project) => project.id === projectId
    );

    try {
      updateProjectInStore(projectId, {
        ...projectData,
        updatedAt: new Date().toISOString(),
      });

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedProject = await response.json();
      updateProjectInStore(projectId, updatedProject);

      return updatedProject;
    } catch (error) {
      updateProjectInStore(projectId, originalProject);
      throw error;
    }
  };

  const deleteProject = async (projectId) => {
    const projectToDelete = projects.find(
      (project) => project.id === projectId
    );

    try {
      deleteProjectFromStore(projectId);

      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
    } catch (error) {
      addProject(projectToDelete);
      throw error;
    }
  };

  const refetch = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch projects");
      }

      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setProjects(sortedData);
      setError(null);
    } catch (error) {
      console.error("Error refetching projects:", error);
      setError(error.message || "Failed to refresh projects");
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch,
  };
}
