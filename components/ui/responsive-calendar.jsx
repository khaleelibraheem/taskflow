"use client";

import { Calendar } from "@/components/ui/calendar";
import { MobileCalendar } from "@/components/ui/mobile-calendar";
import { useEffect, useState } from "react";

export function ResponsiveCalendar(props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <MobileCalendar {...props} /> : <Calendar {...props} />;
}
