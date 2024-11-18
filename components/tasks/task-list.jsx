// components/tasks/task-list.jsx
"use client";

import { useState } from "react";
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
import { useTasks } from "@/hooks/use-tasks";
import { useNotifications } from "@/hooks/use-notifications";

export function TaskList({ filters, onFilterChange }) {
  const { clearNotifications } = useNotifications();
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showBatchDeleteDialog, setShowBatchDeleteDialog] = useState(false);

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

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      toast.success("Task status updated");
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      clearNotifications(taskId);
      setTaskToDelete(null);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleBatchDelete = async () => {
    try {
      await Promise.all(selectedTasks.map((taskId) => deleteTask(taskId)));
      setSelectedTasks([]);
      setShowBatchDeleteDialog(false);
      toast.success(`Successfully deleted ${selectedTasks.length} tasks`);
    } catch (error) {
      toast.error("Failed to delete some tasks");
    }
  };

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
  if (filteredTasks.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">No tasks found.</p>
      </Card>
    );
  }
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
              onClick={async () => {
                try {
                  await Promise.all(
                    selectedTasks.map((taskId) =>
                      updateTask(taskId, { status: "COMPLETED" })
                    )
                  );
                  setSelectedTasks([]);
                  toast.success("Tasks marked as completed");
                } catch (error) {
                  toast.error("Failed to update tasks");
                }
              }}
              className="text-xs sm:text-md"
            >
              Mark Complete
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setShowBatchDeleteDialog(true)}
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
            onStatusChange={handleStatusChange}
            setTaskToDelete={setTaskToDelete}
            onEdit={() => setEditingTask(task)}
            selected={selectedTasks.includes(task.id)}
            onToggleSelect={() => toggleTaskSelection(task.id)}
          />
        ))}
      </div>

      {/* Edit Dialog */}
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

      {/* Delete Confirmation */}
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
              onClick={() => handleDelete(taskToDelete)}
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
              onClick={handleBatchDelete}
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
