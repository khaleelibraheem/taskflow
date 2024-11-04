"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export function CreateTaskForm({
  closeDialog,
  defaultProjectId,
  redirectToTasks = true,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState();
  const [projectId, setProjectId] = useState(defaultProjectId || "none");

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.target);
    const data = {
      title: formData.get("title"),
      description: formData.get("description") || "",
      priority: formData.get("priority") || "MEDIUM",
      dueDate: date,
      projectId: projectId === "none" ? null : projectId,
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      // Dispatch the taskUpdated event before closing the dialog
      window.dispatchEvent(new Event("taskUpdated"));

      // Refresh the page data
      router.refresh();
      closeDialog();
      if (redirectToTasks) {
        router.push("/dashboard?section=tasks");
      }
      toast.success("Task created successfully");
    } catch (error) {
      setError(error.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/10 p-3 rounded-md">
          {error}
        </div>
      )}
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
          Create Task
        </Button>
      </div>
    </form>
  );
}
