"use client";

import { CheckCircle2, Clock, Calendar, Tags } from "lucide-react";

export function TaskMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-background border shadow-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-muted/40">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="p-6 grid grid-cols-5 gap-6 h-[600px]">
        {/* Task List */}
        <div className="col-span-3 border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Today&apos;s Tasks</h3>
          </div>
          <div className="p-4 space-y-3">
            {[
              {
                title: "Update design system",
                priority: "High",
                time: "2h",
                done: true,
              },
              {
                title: "Team meeting",
                priority: "Medium",
                time: "1h",
                done: false,
              },
              {
                title: "Review pull requests",
                priority: "High",
                time: "3h",
                done: false,
              },
            ].map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg bg-card"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    task.done
                      ? "border-green-500 bg-green-500/10"
                      : "border-muted-foreground"
                  }`}
                >
                  {task.done && (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={
                      task.done ? "line-through text-muted-foreground" : ""
                    }
                  >
                    {task.title}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {task.time}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Task Details */}
        <div className="col-span-2 border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Task Details</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium">Review pull requests</h4>
              <p className="text-muted-foreground text-sm mt-1">
                Review and merge pending pull requests for the frontend
                repository.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Due Today
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> 3 hours
              </span>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-2">Tags</h5>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Frontend
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Code Review
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
