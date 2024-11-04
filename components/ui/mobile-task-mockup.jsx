"use client";

import { CheckCircle2, Clock, ChevronRight } from "lucide-react";

export function MobileTaskMockup() {
  return (
    <div className="w-full max-w-[320px] mx-auto rounded-2xl bg-background border shadow-xl overflow-hidden">
      <div className="flex items-center justify-center p-2 border-b bg-muted/40">
        <div className="w-20 h-5 rounded-full bg-muted" />
      </div>
      <div className="h-[600px]">
        <div className="border-b">
          <div className="flex p-2 gap-2">
            {["All", "Today", "Upcoming"].map((tab, index) => (
              <div
                key={index}
                className={`flex-1 py-2 px-4 text-center rounded-lg text-sm ${
                  index === 1
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
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
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
