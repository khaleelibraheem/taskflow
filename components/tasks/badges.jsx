import { Badge } from "@/components/ui/badge";

export function PriorityBadge({ priority }) {
  const variants = {
    HIGH: "text-[10px] bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    MEDIUM:
      "text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    LOW: "text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <Badge variant="secondary" className={variants[priority]}>
      {priority.charAt(0) + priority.slice(1).toLowerCase()}
    </Badge>
  );
}

export function StatusBadge({ status }) {
  const variants = {
    TODO: "text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
    IN_PROGRESS:
      "text-[10px] bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    COMPLETED:
      "text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  const labels = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
  };

  return (
    <Badge
      variant="secondary"
      className={`${variants[status]} whitespace-nowrap`}
    >
      {labels[status]}
    </Badge>
  );
}
