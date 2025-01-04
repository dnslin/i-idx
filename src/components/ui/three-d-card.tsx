"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
}

export const ThreeDCard = ({ children, className }: ThreeDCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * -10;
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={cn(
        "relative bg-background/80 backdrop-blur-sm border border-border rounded-xl shadow-xl transition-all duration-200",
        className
      )}
    >
      {children}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5"
        style={{
          transform: "translateZ(-1px)",
        }}
      />
    </motion.div>
  );
};
