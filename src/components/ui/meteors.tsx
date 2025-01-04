"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );
  const [windowWidth, setWindowWidth] = useState(0);

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 初始化窗口宽度
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 更新流星样式
  useEffect(() => {
    if (windowWidth === 0) return;

    const styles = [...new Array(number)].map(() => ({
      top: Math.floor(Math.random() * 100) + "%", // 随机垂直位置
      left: Math.floor(Math.random() * windowWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number, windowWidth]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:-z-10 before:h-[1px] before:w-[50px] before:-translate-y-1/2",
            "before:bg-gradient-to-r before:from-slate-500 before:to-transparent"
          )}
          style={style}
        />
      ))}
    </>
  );
};

export default Meteors;
