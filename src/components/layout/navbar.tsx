"use client";

import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandBilibili,
  IconHeart,
  IconUsers,
  IconCode,
  IconDeviceGamepad2,
  IconMusic,
  IconBook,
  IconBrandTelegram,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingDock } from "@/components/ui/floating-dock";

const navigation = [
  { name: "Favorites", href: "#favorites", icon: IconHeart },
  { name: "Influencer", href: "#influencer", icon: IconUsers },
  { name: "Code", href: "#code", icon: IconCode },
  { name: "Game", href: "#game", icon: IconDeviceGamepad2 },
  { name: "Music", href: "#music", icon: IconMusic },
  { name: "Books", href: "#books", icon: IconBook },
  { name: "Telegram", href: "#telegram", icon: IconBrandTelegram },
];

const socialLinks = [
  {
    title: "GitHub",
    href: "https://github.com",
    icon: <IconBrandGithub className="h-4 w-4" />,
  },
  {
    title: "Twitter",
    href: "https://twitter.com",
    icon: <IconBrandTwitter className="h-4 w-4" />,
  },
  {
    title: "Instagram",
    href: "https://instagram.com",
    icon: <IconBrandInstagram className="h-4 w-4" />,
  },
  {
    title: "Bilibili",
    href: "https://bilibili.com",
    icon: <IconBrandBilibili className="h-4 w-4" />,
  },
  {
    title: "Telegram",
    href: "https://t.me/dnslin",
    icon: <IconBrandTelegram className="h-4 w-4" />,
  },
];

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* 头像和昵称 */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#top"
              className="flex items-center space-x-3"
              onClick={(e) => scrollToSection(e, "#top")}
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-primary/20">
                <Image
                  src="/avatar.jpg"
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-medium text-foreground">
                dnslin
              </span>
            </a>
          </motion.div>

          {/* 导航链接 - 使用flex-1确保它占据剩余空间 */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setActive(item.name)}
                  onMouseLeave={() => setActive(null)}
                  className="relative"
                >
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={cn(
                      "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary",
                      active === item.name
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </a>
                  {active === item.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={transition}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2"
                    >
                      <div className="bg-background/80 backdrop-blur-md rounded-lg overflow-hidden border border-border shadow-lg p-2">
                        <span className="text-sm whitespace-nowrap text-foreground">
                          {item.name} Content
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 社交媒体链接 - 使用固定宽度容器 */}
          <div className="w-[180px] flex justify-end">
            <FloatingDock items={socialLinks} />
          </div>
        </div>
      </div>
    </nav>
  );
}
