"use client";

import { useState } from "react";
import { Bell, BellOff, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/use-notifications";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function NotificationToggle() {
  const { isEnabled, toggleNotifications } = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleToggleNotifications = async () => {
    if (!("Notification" in window)) {
      toast.error("Your browser doesn't support notifications", {
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);

      const success = await toggleNotifications();

      if (success) {
        toast.success(
          isEnabled ? "Notifications disabled" : "Notifications enabled",
          {
            duration: 2000,
          }
        );
      } else if (Notification.permission === "denied") {
        toast.error(
          "Notifications are blocked. Please enable them in your browser settings.",
          { duration: 4000 }
        );
      } else {
        toast.error("Failed to toggle notifications", { duration: 3000 });
      }
    } catch (error) {
      console.error("Notification error:", error);
      toast.error("Failed to toggle notifications", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={handleToggleNotifications}
            disabled={loading}
          >
            {loading ? (
              <BellRing className="h-4 w-4 animate-pulse" />
            ) : isEnabled ? (
              <Bell className="h-4 w-4" />
            ) : (
              <BellOff className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isEnabled ? "Disable notifications" : "Enable notifications"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
