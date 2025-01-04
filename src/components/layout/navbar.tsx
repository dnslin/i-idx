"use client";

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
import { motion } from "framer-motion";
import { FloatingDock } from "@/components/ui/floating-dock";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import ReactDOMServer from "react-dom/server";
import * as React from "react";

const navigation = [
  {
    id: 1,
    name: "Favorites",
    href: "#favorites",
    icon: IconHeart,
    designation: "收藏夹",
  },
  {
    id: 2,
    name: "Influencer",
    href: "#influencer",
    icon: IconUsers,
    designation: "影响力",
  },
  { id: 3, name: "Code", href: "#code", icon: IconCode, designation: "代码" },
  {
    id: 4,
    name: "Game",
    href: "#game",
    icon: IconDeviceGamepad2,
    designation: "游戏",
  },
  {
    id: 5,
    name: "Music",
    href: "#music",
    icon: IconMusic,
    designation: "音乐",
  },
  { id: 6, name: "Books", href: "#books", icon: IconBook, designation: "书籍" },
  {
    id: 7,
    name: "Telegram",
    href: "#telegram",
    icon: IconBrandTelegram,
    designation: "电报",
  },
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

export function Navbar() {
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

  const handleNavigationClick = (href: string) => {
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
        <div className="flex h-16 items-center justify-between">
          {/* 头像和昵称 */}
          <motion.div
            className="flex items-center space-x-3 w-[180px]"
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

          {/* 导航链接 - 在移动端隐藏 */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="relative">
              <AnimatedTooltip
                items={navigation.map((item) => ({
                  id: item.id,
                  name: item.name,
                  designation: item.designation,
                  href: item.href,
                  image: `data:image/svg+xml,${encodeURIComponent(
                    ReactDOMServer.renderToString(
                      React.createElement(item.icon, { size: 24 })
                    )
                  )}`,
                }))}
                onClick={handleNavigationClick}
              />
            </div>
          </div>

          {/* 社交媒体链接 - 移动端保持显示 */}
          <div className="flex items-center w-[180px] justify-end">
            <FloatingDock
              items={socialLinks}
              className="scale-90 md:scale-100"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
