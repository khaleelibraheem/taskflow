"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  House,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { DashboardProvider, useDashboard } from "@/context/dashboard-context";

function DashboardContent({ children }) {
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

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", id: "overview" },
    { icon: CheckSquare, label: "Tasks", id: "tasks" },
    { icon: FolderKanban, label: "Projects", id: "projects" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background lg:flex-row">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-4 border-b border-border backdrop-blur-lg bg-background/80 fixed w-full top-0 z-30">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-medium">T</span>
          </div>
          <span className="font-semibold text-lg text-foreground">
            TaskFlow
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={`${
              isMobile ? "" : "text-muted-foreground"
            } hover:text-foreground transition-colors font-medium flex items-center gap-2`}
          >
            {isMobile ? <House size={16} /> : "Home"}
          </Link>

          <ThemeToggle />
          <UserButton />
        </div>
      </header>

      {/* Sidebar - Only visible on desktop */}
      {!isMobile && (
        <div className="hidden lg:block w-64 border-r border-border bg-card fixed top-16 bottom-0">
          <div className="p-6 flex-1 flex flex-col">
            <nav className="space-y-1 flex-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left
                    ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }
                  `}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        <div className="pt-16 min-h-screen">
          <div className="h-full p-4 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <DashboardContent>{children}</DashboardContent>
    </DashboardProvider>
  );
}
