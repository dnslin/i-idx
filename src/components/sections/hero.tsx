"use client";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { MorphingText } from "@/components/ui/morphing-text";
import { FlipWords } from "@/components/ui/flip-words";
import { ThreeDCard } from "@/components/ui/three-d-card";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Orbiting Circles Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center -translate-y-10">
        <OrbitingCircles
          radius={370}
          innerRadius={300}
          duration={20}
          speed={1.5}
          iconSize={50}
          centerContent={
            <ThreeDCard className="w-[350px] h-[400px] flex items-center justify-center">
              <div className="p-6 flex flex-col items-center justify-center space-y-6">
                <MorphingText
                  words={["林祁", "dnslin"]}
                  className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
                />
                <FlipWords
                  words={[
                    "Full Stack Developer",
                    "UI/UX Enthusiast",
                    "Open Source Contributor",
                  ]}
                  className="text-lg text-muted-foreground"
                />
              </div>
            </ThreeDCard>
          }
        >
          {/* 内圈图标 - 开发工具 */}
          <Image
            src="/svg/vscode.svg"
            alt="vscode"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/svg/intellijidea.svg"
            alt="intellij"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/svg/git.svg"
            alt="git"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/svg/github-light.svg"
            alt="github"
            width={48}
            height={48}
            className="object-contain dark:invert w-auto h-auto"
          />

          {/* 外圈图标 - 技术栈 */}
          <Image
            src="/svg/typescript.svg"
            alt="typescript"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/svg/javascript.svg"
            alt="javascript"
            width={48}
            height={48}
            className="object-contain"
          />
          <Image
            src="/svg/python.svg"
            alt="python"
            width={48}
            height={48}
            className="object-contain"
          />
          <div className="relative flex items-center justify-center w-200 h-200">
            <Image
              src="/avatar.jpg"
              alt="avatar"
              width={100}
              height={100}
              className="rounded-full object-cover grayscale"
              loading="lazy"
            />
          </div>
          <Image
            src="/svg/react.svg"
            alt="react"
            width={48}
            height={48}
            className="object-contain w-auto h-auto"
          />
          <Image
            src="/svg/nextjs_icon_dark.svg"
            alt="nextjs"
            width={50}
            height={50}
            className="object-contain dark:invert"
          />
        </OrbitingCircles>
      </div>
    </section>
  );
};
