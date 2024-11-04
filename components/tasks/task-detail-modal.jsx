"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PriorityBadge, StatusBadge } from "./badges";

export function TaskDetailModal({ task, open, onOpenChange }) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold break-words pr-8">
            {task.title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 pt-4">
            {/* Status and Priority */}
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
              {task.dueDate && (
                <Badge
                  variant="outline"
                  className="text-[10px] sm:text-[10px] flex items-center gap-1"
                >
                  <Clock className="w-3 h-3" />
                  {format(new Date(task.dueDate), "PPP")}
                </Badge>
              )}
            </div>

            {/* Description */}
            {task.description && (
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Description
                </h4>
                <p className="text-sm whitespace-pre-wrap break-words">
                  {task.description}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
