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

export function CreateTaskForm({ closeDialog, defaultProjectId }) {
  const { createTask } = useTasks();
  const { scheduleNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description") || "",
      priority: formData.get("priority") || "MEDIUM",
      dueDate: date,
      projectId: defaultProjectId === "none" ? null : defaultProjectId,
    };

    try {
      const task = await createTask(data);
      scheduleNotification(task);
      closeDialog();
      toast.success("Task created successfully");
    } catch (error) {
      toast.error("Failed to create task");
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
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Textarea
          id="description"
          name="description"
          placeholder="Description"
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Select name="priority" defaultValue="MEDIUM">
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
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
