"use client";

import Category from "@/components/Category";
import HomeHero from "@/components/HomeHero";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#EAEDED]">
      <HomeHero />
      <Category />
    </main>
  );
}
