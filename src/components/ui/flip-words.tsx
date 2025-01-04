"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  className?: string;
}

export const FlipWords = ({ words, className }: FlipWordsProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className={cn("relative h-[1.2em] overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{
            rotateX: { duration: 0.5 },
            opacity: { duration: 0.25 },
          }}
          className="absolute w-full text-center md:text-left"
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
