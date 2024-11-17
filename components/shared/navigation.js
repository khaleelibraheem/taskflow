"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navigation on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-medium">T</span>
            </div>
            <span className="font-semibold text-lg">TaskFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/help"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Help
            </Link>
            <ThemeToggle />
            {!isSignedIn ? (
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background border-b"
        >
          <div className="px-4 py-6 space-y-4">
            <Link
              href="/about"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/help"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Help
            </Link>
            {!isSignedIn ? (
              <div className="space-y-3">
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            ) : (
              <Button className="w-full" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
