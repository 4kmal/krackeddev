"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import SplitTextAnimation from "./components/SplitTextAnimation";

export default function Home() {
  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <main className="min-h-screen">
      {showAnimation && (
        <SplitTextAnimation
          text="Welcome to Kracked Devs"
          onComplete={() => setShowAnimation(false)}
        />
      )}
      <PageHero
        title="[placeholder]"
        subtitle=""
      />
    </main>
  );
}
