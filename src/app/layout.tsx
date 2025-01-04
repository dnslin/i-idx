import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/navbar";
import Meteors from "@/components/ui/meteors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DnsLin OneIndex",
  description:
    "The best time to plant a tree is 20 years ago. The second-best time is now",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="relative min-h-screen w-full overflow-hidden">
          <Meteors number={30} />
          <Navbar />
          <main className="pt-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
