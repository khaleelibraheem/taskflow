// components/tasks/edit-task-form.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ResponsiveCalendar } from "@/components/ui/responsive-calendar";
import { toast } from "sonner";
import { useTasks } from "@/hooks/use-tasks";
import { useNotifications } from "@/hooks/use-notifications";

export function EditTaskForm({ task, closeDialog }) {
  const { updateNotification } = useNotifications();
  const { updateTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(
    task.dueDate ? new Date(task.dueDate) : undefined
  );

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description") || "",
      priority: formData.get("priority"),
      dueDate: date,
    };

    try {
      const updatedTask = await updateTask(task.id, data);
      updateNotification(updatedTask);
      closeDialog();
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="title"
          name="title"
          placeholder="Task title"
          required
          defaultValue={task.title}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Textarea
          id="description"
          name="description"
          placeholder="Description"
          defaultValue={task.description}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Select name="priority" defaultValue={task.priority}>
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a due date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <ResponsiveCalendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              className="rounded-md border shadow-md"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Task"}
        </Button>
      </div>
    </form>
  );
}
