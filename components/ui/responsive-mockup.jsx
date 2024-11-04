"use client";

import { useState, useEffect } from "react";
import { DashboardMockup } from "./mockup";
import { MobileMockup } from "./mobile-mockup";
import { TaskMockup } from "./task-mockup";
import { MobileTaskMockup } from "./mobile-task-mockup";
import { MockupSwitcher } from "./mockup-switcher";

export function ResponsiveMockup() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const desktopMockups = [
    <DashboardMockup key="dashboard" />,
    <TaskMockup key="tasks" />,
  ];

  const mobileMockups = [
    <MobileMockup key="dashboard" />,
    <MobileTaskMockup key="tasks" />,
  ];

  return (
    <div className="w-full">
      <MockupSwitcher mockups={isMobile ? mobileMockups : desktopMockups} />
    </div>
  );
}
