"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Code2 } from "lucide-react";

export default function Game1Page() {
  const [score, setScore] = useState(0);

  return (
    <main className="min-h-screen pb-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/game"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Games
          </Link>
          <div className="flex items-center gap-2 text-neon-primary">
            <Code2 className="w-5 h-5" />
            <span className="text-sm">Game 1</span>
          </div>
        </div>

        {/* Game Title */}
        <Card className="mb-8 border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl mb-4">
              🎮 Game 1: Click Counter
            </CardTitle>
            <p className="text-lg text-white/60">
              A simple clicker game to get started. Click the button to increase
              your score!
            </p>
          </CardHeader>
        </Card>

        {/* Game Area */}
        <Card className="border-white/10 bg-black/60 backdrop-blur-md">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center justify-center space-y-8">
              {/* Score Display */}
              <div className="text-center">
                <h3 className="text-lg text-white/60 mb-2">Current Score</h3>
                <div className="text-7xl font-bold text-neon-primary">
                  {score}
                </div>
              </div>

              {/* Click Button */}
              <button
                onClick={() => setScore(score + 1)}
                className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-neon-primary to-neon-secondary text-black rounded-lg hover:scale-105 transition-transform active:scale-95 shadow-[0_0_30px_rgba(0,243,255,0.3)]"
              >
                Click Me! 🎯
              </button>

              {/* Reset Button */}
              <button
                onClick={() => setScore(0)}
                className="px-6 py-3 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                Reset Score
              </button>

              {/* Instructions */}
              <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10 max-w-md">
                <h4 className="text-lg font-semibold mb-3 text-neon-secondary">
                  💡 For Developers
                </h4>
                <p className="text-sm text-white/70 leading-relaxed">
                  This is a starter template. You can replace this entire game
                  with your own implementation. Try building something more
                  complex like:
                </p>
                <ul className="mt-3 space-y-1 text-sm text-white/60">
                  <li>• A platformer using Canvas</li>
                  <li>• A puzzle game</li>
                  <li>• A memory card game</li>
                  <li>• An arcade-style shooter</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
