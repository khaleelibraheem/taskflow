"use client";

import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2, FolderOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { ProjectDetailModal } from "./project-detail-modal";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export function ProjectList() {
  const { projects, loading, error, deleteProject, updateProject } =
    useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState(new Set());
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSelectProject = (projectId) => {
    const newSelected = new Set(selectedProjects);
    if (newSelected.has(projectId)) {
      newSelected.delete(projectId);
    } else {
      newSelected.add(projectId);
    }
    setSelectedProjects(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedProjects.size === projects.length) {
      setSelectedProjects(new Set());
    } else {
      setSelectedProjects(new Set(projects.map((project) => project.id)));
    }
  };

  const handleBatchDelete = async () => {
    try {
      // Convert Set to Array for iteration
      const projectsToDelete = Array.from(selectedProjects);

      // Delete each selected project
      await Promise.all(
        projectsToDelete.map((projectId) => deleteProject(projectId))
      );

      // Clear selection
      setSelectedProjects(new Set());
      setShowDeleteDialog(false);

      toast.success(`Successfully deleted ${projectsToDelete.length} projects`);
    } catch (error) {
      toast.error("Failed to delete some projects");
      console.error("Batch delete error:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (projects.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          No projects found. Create your first project to get started.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedProjects.size === projects.length}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-sm text-muted-foreground">
            {selectedProjects.size} selected
          </span>
        </div>
        {selectedProjects.size > 0 && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected ({selectedProjects.size})
          </Button>
        )}
      </div>

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={deleteProject}
          onSelect={() => setSelectedProject(project)}
          onEdit={() => setEditingProject(project)}
          selected={selectedProjects.has(project.id)}
          onSelectedChange={() => handleSelectProject(project.id)}
        />
      ))}

      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />

      <EditProjectDialog
        project={editingProject}
        open={!!editingProject}
        onOpenChange={(open) => !open && setEditingProject(null)}
        onUpdate={updateProject}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {selectedProjects.size} selected project
              {selectedProjects.size === 1 ? "" : "s"} and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBatchDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Projects
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ProjectCard({
  project,
  onDelete,
  onSelect,
  onEdit,
  selected,
  onSelectedChange,
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(project.id);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
    }
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Checkbox checked={selected} onCheckedChange={onSelectedChange} />
            <div className="space-y-1">
              <h3
                className="font-medium text-lg cursor-pointer hover:text-primary"
                onClick={() => onSelect(project)}
              >
                {project.name}
              </h3>
              {project.description && (
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onSelect(project)}>
                <FolderOpen className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete &quot;
              {project.name}&quot; and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function EditProjectDialog({ project, open, onOpenChange, onUpdate }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const data = {
        name: formData.get("name"),
        description: formData.get("description"),
      };

      await onUpdate(project.id, data);
      onOpenChange(false);
      toast.success("Project updated successfully");
    } catch (error) {
      toast.error(error.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  }

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              name="name"
              placeholder="Project name"
              defaultValue={project.name}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              id="description"
              name="description"
              placeholder="Description"
              defaultValue={project.description}
              disabled={loading}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
