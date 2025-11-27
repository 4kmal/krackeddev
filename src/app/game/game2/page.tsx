"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Code2 } from "lucide-react";

export default function Game2Page() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setAttempts(0);
    setMessage("Guess a number between 1 and 100!");
    setGameWon(false);
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum)) {
      setMessage("Please enter a valid number!");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNum === targetNumber) {
      setMessage(`🎉 You won! Found it in ${newAttempts} attempts!`);
      setGameWon(true);
    } else if (guessNum < targetNumber) {
      setMessage("📈 Too low! Try a higher number.");
    } else {
      setMessage("📉 Too high! Try a lower number.");
    }
  };

  return (
    <main className="min-h-screen pb-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,143,17,0.15)_0%,transparent_70%)] pointer-events-none" />

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
          <div className="flex items-center gap-2 text-neon-secondary">
            <Code2 className="w-5 h-5" />
            <span className="text-sm">Game 2</span>
          </div>
        </div>

        {/* Game Title */}
        <Card className="mb-8 border-white/10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl md:text-5xl mb-4">
              🎯 Game 2: Number Guesser
            </CardTitle>
            <p className="text-lg text-white/60">
              Can you guess the secret number? Use your logic to find it!
            </p>
          </CardHeader>
        </Card>

        {/* Game Area */}
        <Card className="border-white/10 bg-black/60 backdrop-blur-md max-w-2xl mx-auto">
          <CardContent className="pt-12 pb-12">
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Stats */}
              <div className="flex gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-neon-secondary">
                    {attempts}
                  </div>
                  <div className="text-sm text-white/60">Attempts</div>
                </div>
              </div>

              {/* Message */}
              <div
                className={`text-xl text-center p-4 rounded-lg ${
                  gameWon ? "text-neon-primary" : "text-white/80"
                }`}
              >
                {message}
              </div>

              {/* Input Area */}
              {!gameWon && (
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                    placeholder="Enter your guess..."
                    className="flex-1 px-6 py-3 text-lg bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-neon-secondary transition-colors text-white"
                  />
                  <button
                    onClick={handleGuess}
                    className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-neon-secondary to-neon-accent text-black rounded-lg hover:scale-105 transition-transform active:scale-95"
                  >
                    Guess
                  </button>
                </div>
              )}

              {/* New Game Button */}
              <button
                onClick={startNewGame}
                className="px-6 py-3 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                {gameWon ? "Play Again" : "New Game"}
              </button>

              {/* Instructions */}
              <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10 w-full max-w-md">
                <h4 className="text-lg font-semibold mb-3 text-neon-accent">
                  💡 How to Play
                </h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• A random number between 1 and 100 is selected</li>
                  <li>• Enter your guess and press Guess</li>
                  <li>• Get hints if you're too high or too low</li>
                  <li>• Win by finding the number in the fewest attempts!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
