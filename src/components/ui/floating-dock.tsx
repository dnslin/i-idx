"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

// 为不同的社交媒体定义颜色
const socialColors: { [key: string]: string } = {
  GitHub: "group-hover:text-[#24292e]",
  Twitter: "group-hover:text-[#1DA1F2]",
  Instagram: "group-hover:text-[#E4405F]",
  Bilibili: "group-hover:text-[#00A1D6]",
  Telegram: "group-hover:text-[#0088cc]",
};

export const FloatingDock = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href: string;
  }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex items-center gap-1 rounded-full bg-background/50 backdrop-blur-sm border border-border p-2",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue<number>;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // 调整动画范围和过渡效果
  const widthTransform = useTransform(distance, [-100, 0, 100], [35, 45, 35]);
  const heightTransform = useTransform(distance, [-100, 0, 100], [35, 45, 35]);

  // 优化动画参数
  const width = useSpring(widthTransform, {
    mass: 0.2,
    stiffness: 200,
    damping: 15,
    restDelta: 0.001,
  });
  const height = useSpring(heightTransform, {
    mass: 0.2,
    stiffness: 200,
    damping: 15,
    restDelta: 0.001,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center relative transition-colors duration-200 group-hover:bg-gray-200 dark:group-hover:bg-neutral-700"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-background/80 backdrop-blur-sm border border-border text-foreground absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className={cn(
            "flex items-center justify-center text-muted-foreground transition-colors duration-200",
            socialColors[title]
          )}
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
