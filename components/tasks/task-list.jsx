"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { Button } from "@/components/ui/button";
import { EditTaskForm } from "./edit-task-form";
import { TaskSearch } from "./task-search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskDetailModal } from "./task-detail-modal";
import { PriorityBadge, StatusBadge } from "./badges";

export function TaskList({
  filters,
  onFilterChange,
  onStatusChange,
  onEdit,
  onDelete,
}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showBatchDeleteDialog, setShowBatchDeleteDialog] = useState(false);

  async function fetchTasks(showLoading = true) {
    try {
      if (showLoading) setLoading(true);
      const response = await fetch("/api/tasks");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch tasks");
      }

      setTasks(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(
        error.message || "Failed to load tasks. Please try again later."
      );
    } finally {
      if (showLoading) setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();

    // Listen for task updates
    window.addEventListener("taskUpdated", fetchTasks);
    window.addEventListener("taskCreated", fetchTasks);

    return () => {
      window.removeEventListener("taskUpdated", fetchTasks);
      window.removeEventListener("taskCreated", fetchTasks);
    };
  }, []);

  async function updateTaskStatus(taskId, status) {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      fetchTasks(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  async function deleteTask(taskId) {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      fetchTasks();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        <AlertCircle className="w-4 h-4 mr-2" />
        {error}
      </div>
    );
  }

  // Filter tasks based on search and filters
 const filteredTasks = tasks.filter((task) => {
   const matchesSearch =
     task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
     task.description?.toLowerCase().includes(filters.search.toLowerCase());

   const matchesStatus =
     filters.status === "ALL" || task.status === filters.status;

   const matchesPriority =
     filters.priority === "ALL" || task.priority === filters.priority;

   const matchesProject =
     !filters.projectId || filters.projectId === "none"
       ? !task.projectId
       : task.projectId === filters.projectId;

   return matchesSearch && matchesStatus && matchesPriority && matchesProject;
 });

  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">
          No tasks found. Create your first task!
        </p>
      </Card>
    );
  }
  // Add batch action functions
async function handleBatchAction(action) {
  try {
    switch (action) {
      case "delete":
        setShowBatchDeleteDialog(true);
        break;
      case "complete":
        await Promise.all(
          selectedTasks.map((taskId) =>
            fetch(`/api/tasks/${taskId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: "COMPLETED" }),
            })
          )
        );
        setSelectedTasks([]);
        fetchTasks();
        toast.success("Tasks marked as completed");
        break;
    }
  } catch (error) {
    console.error("Error performing batch action:", error);
    toast.error("Failed to perform action");
  }
}

  // Add selection handlers
  const toggleTaskSelection = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleAllTasks = () => {
    setSelectedTasks((prev) =>
      prev.length === filteredTasks.length
        ? []
        : filteredTasks.map((task) => task.id)
    );
  };

  return (
    <>
      <TaskSearch filters={filters} onFilterChange={onFilterChange} />

      {/* Batch Actions */}
      {selectedTasks.length > 0 && (
        <div className="flex items-center gap-4 mb-4 p-2 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">
            {selectedTasks.length} tasks selected
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBatchAction("complete")}
              className="text-xs sm:text-md"
            >
              Mark Complete
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleBatchAction("delete")}
              className="text-xs sm:text-md"
            >
              Delete Selected
            </Button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 && (
          <div className="flex items-center gap-2 px-4">
            <Checkbox
              checked={selectedTasks.length === filteredTasks.length}
              onCheckedChange={toggleAllTasks}
            />
            <span className="text-sm text-muted-foreground">Select All</span>
          </div>
        )}

        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={updateTaskStatus}
            onDelete={deleteTask}
            onEdit={() => setEditingTask(task)}
            selected={selectedTasks.includes(task.id)}
            onToggleSelect={() => toggleTaskSelection(task.id)}
            setTaskToDelete={setTaskToDelete}
          />
        ))}
      </div>

      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <EditTaskForm
              task={editingTask}
              closeDialog={() => setEditingTask(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Single Delete Confirmation */}
      <AlertDialog
        open={!!taskToDelete}
        onOpenChange={() => setTaskToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteTask(taskToDelete);
                setTaskToDelete(null);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Batch Delete Confirmation */}
      <AlertDialog
        open={showBatchDeleteDialog}
        onOpenChange={setShowBatchDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {selectedTasks.length} selected task
              {selectedTasks.length === 1 ? "" : "s"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await Promise.all(
                  selectedTasks.map((taskId) =>
                    fetch(`/api/tasks/${taskId}`, { method: "DELETE" })
                  )
                );
                setSelectedTasks([]);
                fetchTasks();
                setShowBatchDeleteDialog(false);
                toast.success(
                  `Successfully deleted ${selectedTasks.length} tasks`
                );
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Tasks
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function TaskItem({
  task,
  onStatusChange,
  onDelete,
  onEdit,
  selected,
  onToggleSelect,
  setTaskToDelete,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const statusOptions = [
    { value: "TODO", label: "To Do" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
  ];
  const handleDelete = () => {
    setTaskToDelete(task.id); // Instead of calling onDelete directly
  };
  const handleCardClick = (e) => {
    // Don't open modal if clicking on these elements
    const isInteractive =
      e.target.closest("button") ||
      e.target.closest('[role="checkbox"]') ||
      e.target.closest('[role="menuitem"]') ||
      e.target.closest("[data-radix-collection-item]");

    if (!isInteractive) {
      setShowDetails(true);
    }
  };

  return (
    <>
      <Card className="p-4 w-full max-w-[800px] hover:shadow-md transition-shadow">
        <div
          className="flex items-start gap-4 w-full cursor-pointer"
          onClick={handleCardClick}
        >
          <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={selected}
              onCheckedChange={onToggleSelect}
              className="mt-1"
            />
          </div>

          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1 overflow-hidden">
                {/* Title & Status */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="tfont-medium truncate">{task.title}</h3>
                  <StatusBadge status={task.status} />
                </div>

                {/* Description */}
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1 break-words overflow-hidden line-clamp-2">
                    {task.description}
                  </p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <PriorityBadge priority={task.priority} />
                  {task.dueDate && (
                    <Badge
                      variant="outline"
                      className="text-[10px] sm:text-[10px] flex items-center gap-1"
                    >
                      <Clock className="w-3 h-3" />
                      {format(new Date(task.dueDate), "MMM d, yyyy")}
                    </Badge>
                  )}
                </div>
              </div>

              <div
                className="shrink-0 ml-2"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {statusOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => onStatusChange(task.id, option.value)}
                      >
                        <StatusIcon
                          status={option.value}
                          className="w-4 h-4 mr-2"
                        />
                        Mark as {option.label}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={handleDelete}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <TaskDetailModal
        task={task}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}

function StatusIcon({ status, className = "w-5 h-5" }) {
  const icons = {
    COMPLETED: () => <CheckCircle2 className={`text-green-500 ${className}`} />,
    IN_PROGRESS: () => <Clock className={`text-yellow-500 ${className}`} />,
    TODO: () => <Circle className={`text-muted-foreground ${className}`} />,
  };

  return icons[status]?.() || icons.TODO();
}

function getNextStatus(currentStatus) {
  const statusFlow = {
    TODO: "IN_PROGRESS",
    IN_PROGRESS: "COMPLETED",
    COMPLETED: "TODO",
  };
  return statusFlow[currentStatus] || "TODO";
}
