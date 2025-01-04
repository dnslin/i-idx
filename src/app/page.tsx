"use client";

import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Other Sections */}
      <section id="favorites" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Favorites</h2>
          {/* Add your favorites content here */}
        </div>
      </section>

      {/* Add more sections as needed */}
    </div>
  );
}
