"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  words: string[];
  className?: string;
}

export const MorphingText = ({ words, className }: MorphingTextProps) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(index === words.length - 1 ? "down" : "up");
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [index, words.length]);

  return (
    <div className={cn("relative h-[1.2em] overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: direction === "up" ? 20 : -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: direction === "up" ? -20 : 20, opacity: 0 }}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full text-center md:text-left"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
