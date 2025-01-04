import { cn } from "@/lib/utils";
import React from "react";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  innerRadius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
  centerContent?: React.ReactNode;
}

interface IconWrapperProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const IconWrapper = ({ className, style, children }: IconWrapperProps) => {
  const childElement = React.Children.only(children) as React.ReactElement<{
    className?: string;
  }>;

  // 检查是否是头像容器（带有 w-200 h-200 类名的 div）
  const isAvatar =
    React.isValidElement(childElement) &&
    childElement.type === "div" &&
    childElement.props.className?.includes("w-200");

  // 从类名中提取尺寸
  const getSize = (className?: string, prefix: string = "w-") => {
    if (!className) return null;
    const match = className.match(new RegExp(`${prefix}\\d+`));
    return match ? parseInt(match[0].replace(prefix, "")) : null;
  };

  const width = isAvatar ? getSize(childElement.props.className, "w-") : null;
  const height = isAvatar ? getSize(childElement.props.className, "h-") : null;

  return (
    <div
      style={{
        ...style,
        width: width ? `${width}px` : "var(--icon-size)",
        height: height ? `${height}px` : "var(--icon-size)",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 360,
  innerRadius = 320,
  path = true,
  iconSize = 30,
  speed = 1,
  centerContent,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const childrenArray = React.Children.toArray(children);
  const halfLength = Math.ceil(childrenArray.length / 2);
  const innerCircleIcons = childrenArray.slice(0, halfLength);
  const outerCircleIcons = childrenArray.slice(halfLength);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 中心内容 */}
      {centerContent && (
        <div className="absolute z-10 transform-gpu">{centerContent}</div>
      )}

      {/* 内圈轨道 */}
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={innerRadius}
            fill="none"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
        </svg>
      )}

      {/* 外圈轨道 */}
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
        </svg>
      )}

      {/* 内圈图标 */}
      {innerCircleIcons.map((child, index) => {
        const angle = (360 / innerCircleIcons.length) * index;
        return (
          <IconWrapper
            key={index}
            style={
              {
                "--duration": calculatedDuration,
                "--radius": innerRadius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `absolute flex transform-gpu animate-orbit items-center justify-center rounded-full hover:scale-125 transition-transform`,
              { "[animation-direction:reverse]": reverse },
              className
            )}
          >
            {child}
          </IconWrapper>
        );
      })}

      {/* 外圈图标 */}
      {outerCircleIcons.map((child, index) => {
        const angle = (360 / outerCircleIcons.length) * index;
        return (
          <IconWrapper
            key={`outer-${index}`}
            style={
              {
                "--duration": calculatedDuration * 1.2,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              } as React.CSSProperties
            }
            className={cn(
              `absolute flex transform-gpu animate-orbit items-center justify-center rounded-full hover:scale-125 transition-transform`,
              { "[animation-direction:reverse]": !reverse },
              className
            )}
          >
            {child}
          </IconWrapper>
        );
      })}
    </div>
  );
}
