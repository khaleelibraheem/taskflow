"use client";

import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

export function Navigation() {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide navigation on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  // Show loading state or nothing while auth is loading
  if (!isLoaded) {
    return null;
  }

  return (
    <header className="border-b h-16 bg-background/80 backdrop-blur-lg fixed w-full z-50">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-medium">T</span>
          </div>
          <span className="font-semibold text-lg">TaskFlow</span>
        </Link>
        <nav className="flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <ThemeToggle />
              <Link
                href="/sign-in"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2"
              >
                {isMobile ? (
                  <LayoutDashboard className="h-5 w-5" />
                ) : (
                  "Dashboard"
                )}
              </Link>
              <UserButton
                afterSignOutUrl="/"
                afterSignOutCallback={() => {
                  router.push("/");
                }}
              />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
