"use client";

import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Bell,
  Search,
  Settings,
} from "lucide-react";

export function DashboardMockup() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-background border shadow-xl overflow-hidden">
      {/* Window Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/40">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Sidebar */}
        <div className="w-64 border-r bg-card p-4">
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-medium">T</span>
            </div>
            <span className="font-semibold text-lg">TaskFlow</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            {[
              { icon: LayoutDashboard, label: "Overview", active: true },
              { icon: CheckSquare, label: "Tasks" },
              { icon: FolderKanban, label: "Projects" },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Top Bar */}
          <div className="h-14 border-b flex items-center justify-between px-6">
            <h2 className="text-lg font-semibold">Overview</h2>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Settings className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Tasks", value: "12" },
                { label: "In Progress", value: "5" },
                { label: "Completed", value: "7" },
                { label: "Projects", value: "3" },
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-lg border bg-card">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Tasks */}
            <div className="rounded-lg border bg-card">
              <div className="p-4 border-b">
                <h3 className="font-medium">Recent Tasks</h3>
              </div>
              <div className="p-4 space-y-3">
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
    </div>
  );
}
