"use client";

import { TaskItem } from "./task-list";
import { format, isToday } from "date-fns";
import { useTasks } from "@/hooks/use-tasks";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { EditTaskForm } from "./edit-task-form";
import { Spinner } from "../ui/spinner";
import { Card } from "../ui/card";

export function UpcomingTasks() {
  const [selectedTask, setSelectedTask] = useState(null);
  const { tasks, deleteTask, updateTask, loading } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  // Add these props

  const handleStatusChange = async (taskId, newStatus) => {
    await updateTask(taskId, { status: newStatus });
  };
  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
  };

  const upcomingTasks = tasks.filter(
    (task) => task.dueDate && !isToday(new Date(task.dueDate)) && task.status !== "COMPLETED"
  );

  if (loading) {
    return <Spinner />;
  }
  if (upcomingTasks.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">
          No upcoming tasks found.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
      <div className="space-y-4">
        {upcomingTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
            onEdit={() => setEditingTask(task)}
            onDelete={handleDelete}
            selected={false}
            onToggleSelect={() => {}}
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
    </div>
  );
}
