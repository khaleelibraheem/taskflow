"use client";

import { Card } from "@/components/ui/card";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function TaskStats({ tasks }) {
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "COMPLETED").length,
    inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
    todo: tasks.filter((t) => t.status === "TODO").length,
    byPriority: {
      HIGH: tasks.filter((t) => t.priority === "HIGH").length,
      MEDIUM: tasks.filter((t) => t.priority === "MEDIUM").length,
      LOW: tasks.filter((t) => t.priority === "LOW").length,
    },
  };

  const completionRate =
    stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0;

  const statusChartData = {
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [
      {
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: ["#94a3b8", "#f59e0b", "#22c55e"],
        borderRadius: 6,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const priorityChartData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [
          stats.byPriority.HIGH,
          stats.byPriority.MEDIUM,
          stats.byPriority.LOW,
        ],
        backgroundColor: ["#ef4444", "#3b82f6", "#6b7280"],
        borderRadius: 6,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const completionChartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [stats.completed, stats.total - stats.completed],
        backgroundColor: ["#22c55e", "#e2e8f0"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        bodySpacing: 4,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    cutout: "75%",
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-2 rounded-lg border bg-card">
          <div className="p-4 border-b">
            <h3 className="font-medium">Recent Tasks</h3>
          </div>
          <div className="p-4 space-y-3">
            {tasks
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 4)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span className="text-sm truncate pr-4">{task.title}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                      task.status === "COMPLETED"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : task.status === "IN_PROGRESS"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {task.status === "TODO"
                      ? "To Do"
                      : task.status === "IN_PROGRESS"
                      ? "In Progress"
                      : "Completed"}
                  </span>
                </div>
              ))}
            {tasks.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No tasks found.
              </div>
            )}
          </div>
        </div>
        <Card className="p-4 sm:p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Completion Rate
          </h3>
          <div className="mt-2 flex items-baseline flex-wrap gap-1">
            <p className="text-2xl sm:text-3xl font-semibold">
              {completionRate}%
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              of tasks completed
            </p>
          </div>
          <div className="mt-4 h-[120px] sm:h-[150px]">
            <Doughnut data={completionChartData} options={doughnutOptions} />
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6">Tasks by Status</h3>
          <div style={{ height: "300px" }}>
            <Bar data={statusChartData} options={barOptions} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-semibold">{stats.todo}</div>
              <div className="text-sm text-muted-foreground">To Do</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-6">Tasks by Priority</h3>
          <div style={{ height: "300px" }}>
            <Bar data={priorityChartData} options={barOptions} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-semibold">
                {stats.byPriority.HIGH}
              </div>
              <div className="text-sm text-muted-foreground">High</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {stats.byPriority.MEDIUM}
              </div>
              <div className="text-sm text-muted-foreground">Medium</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {stats.byPriority.LOW}
              </div>
              <div className="text-sm text-muted-foreground">Low</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
