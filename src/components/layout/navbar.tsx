import Link from "next/link";
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
} from "@tabler/icons-react";
import Image from "next/image";

const navigation = [
  { name: "Favorites", href: "/favorites", icon: IconHeart },
  { name: "Influencer", href: "/influencer", icon: IconUsers },
  { name: "Code", href: "/code", icon: IconCode },
  { name: "Game", href: "/game", icon: IconDeviceGamepad2 },
  { name: "Music", href: "/music", icon: IconMusic },
  { name: "Books", href: "/books", icon: IconBook },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: IconBrandGithub },
  { name: "Twitter", href: "https://twitter.com", icon: IconBrandTwitter },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: IconBrandInstagram,
  },
  { name: "Bilibili", href: "https://bilibili.com", icon: IconBrandBilibili },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 头像和昵称 */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src="/avatar.jpg"
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-medium">dnslin</span>
            </Link>
          </div>

          {/* 导航链接 */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
                  )}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* 社交媒体链接 */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
