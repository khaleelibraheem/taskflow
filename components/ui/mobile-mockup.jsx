"use client";

import { LayoutDashboard, CheckSquare, FolderKanban, Bell } from "lucide-react";

export function MobileMockup() {
  return (
    <div className="w-full max-w-[320px] mx-auto rounded-2xl bg-background border shadow-xl overflow-hidden">
      {/* Phone Frame */}
      <div className="flex items-center justify-center p-2 border-b bg-muted/40">
        <div className="w-20 h-5 rounded-full bg-muted" />
      </div>

      <div className="h-[600px]">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-medium">T</span>
            </div>
            <span className="font-semibold">TaskFlow</span>
          </div>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Tab Navigation */}
        <div className="border-b">
          <div className="flex p-2 gap-2">
            {["Overview", "Tasks", "Projects"].map((tab, index) => (
              <div
                key={index}
                className={`flex-1 py-2 px-4 text-center rounded-lg text-sm ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Total Tasks", value: "12" },
              { label: "In Progress", value: "5" },
              { label: "Completed", value: "7" },
              { label: "Projects", value: "3" },
            ].map((stat, index) => (
              <div key={index} className="p-3 rounded-lg border bg-card">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Tasks */}
          <div className="rounded-lg border bg-card">
            <div className="p-3 border-b">
              <h3 className="font-medium text-sm">Recent Tasks</h3>
            </div>
            <div className="p-3 space-y-2">
              {[
                { title: "Design System Update", status: "In Progress" },
                { title: "User Research", status: "Completed" },
                { title: "Dashboard Layout", status: "In Progress" },
              ].map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-sm">{task.title}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
