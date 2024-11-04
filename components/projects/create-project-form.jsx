"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProjects } from "@/hooks/use-projects";
import { toast } from "sonner";

export function CreateProjectForm({ closeDialog }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createProject } = useProjects();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      description: formData.get("description")
    };

    try {
      await createProject(data);
      closeDialog();
      router.refresh();
      toast.success("Project created successfully");
    } catch (error) {
      setError(error.message || "Failed to create project");
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
          id="name"
          name="name"
          placeholder="Project name"
          required
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Textarea
          id="description"
          name="description"
          placeholder="Description (optional)"
          disabled={loading}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={closeDialog}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          Create Project
        </Button>
      </div>
    </form>
  );
}
