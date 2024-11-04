"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MockupSwitcher({ mockups }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % mockups.length);
  };

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + mockups.length) % mockups.length);
  };

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={previous}
          className="rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={next}
          className="rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {mockups[currentIndex]}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-4">
        {mockups.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
