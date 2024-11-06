"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, Clock, CheckCircle2, FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboard } from "@/context/dashboard-context";
import { CreateTaskButton } from "@/components/tasks/create-task-button";
import { TaskList } from "@/components/tasks/task-list";
import { TaskStats } from "@/components/tasks/task-stats";
import { TodayTasks } from "@/components/tasks/today-tasks";
import { useTasks } from "@/hooks/use-tasks";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { isToday } from "date-fns";
import { TaskDetailModal } from "@/components/tasks/task-detail-modal";
import { UpcomingTasks } from "@/components/tasks/upcoming-tasks";
import { CreateProjectButton } from "@/components/projects/create-project-button";
import { ProjectList } from "@/components/projects/project-list";

export default function DashboardPage() {
  const [isMobile, setIsMobile] = useState(false);
  const { activeSection, setActiveSection } = useDashboard();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="max-w-7xl mx-auto mt-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewContent />
          </TabsContent>

          <TabsContent value="tasks" className="mt-6">
            <TasksContent />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectsContent />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-4 px-4 lg:px-8">
      {activeSection === "tasks" || activeSection === "projects" ? (
        ""
      ) : (
        <h2 className="text-3xl font-semibold mb-8 text-foreground">
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h2>
      )}

      {activeSection === "overview" && <OverviewContent />}
      {activeSection === "tasks" && <TasksContent />}
      {activeSection === "projects" && <ProjectsContent />}
    </div>
  );
}

function OverviewContent() {
  const { tasks, stats, loading } = useTasks();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Tasks",
            value: stats.total,
            icon: ArrowUpRight,
            color: "text-blue-500",
          },
          {
            label: "In Progress",
            value: stats.inProgress,
            icon: Clock,
            color: "text-yellow-500",
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            color: "text-green-500",
          },
          {
            label: "To Do",
            value: stats.todo,
            icon: FolderKanban,
            color: "text-purple-500",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-all border-border"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <p className="text-sm font-medium text-muted-foreground tracking-wide mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-semibold text-foreground tracking-tight">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} bg-background p-2 rounded-lg`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <TaskStats tasks={tasks} />
    </div>
  );
}

function TasksContent() {
  const [filters, setFilters] = useState({
    view: "All",
    search: "",
    status: "ALL",
    priority: "ALL",
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const { tasks, updateTask, deleteTask } = useTasks();

  const handleStatusChange = async (taskId, newStatus) => {
    await updateTask(taskId, { status: newStatus });
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
  };

  return (
    <div>
      {/* View Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 rounded-lg bg-muted p-1">
            {["All", "Today", "Upcoming"].map((view) => (
              <Button
                key={view}
                variant={filters.view === view ? "default" : "ghost"}
                className="px-3"
                onClick={() => setFilters({ ...filters, view })}
              >
                {view}
              </Button>
            ))}
          </div>
          <CreateTaskButton />
        </div>
      </div>

      {/* Today's Tasks Section */}
      {filters.view === "Today" && <TodayTasks />}

      {/* Tasks List */}
      {filters.view === "All" && (
        <div>
          <TaskList
            filters={filters}
            onFilterChange={setFilters}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            className={
              filters.view === "All" &&
              tasks.some((t) => isToday(new Date(t.dueDate)))
                ? "mt-6"
                : ""
            }
          />
        </div>
      )}

      {/* Upcoming Tasks Section */}
      {filters.view === "Upcoming" && <UpcomingTasks />}

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={selectedTask}
        open={!!selectedTask}
        onOpenChange={(open) => {
          if (!open) setSelectedTask(null);
        }}
      />
    </div>
  );
}

function ProjectsContent() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-3xl font-semibold text-foreground">
          All Projects
        </h2>
        <CreateProjectButton />
      </div>
      <ProjectList />
    </div>
  );
}
