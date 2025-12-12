"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  Clock,
  Search,
  CheckCircle,
  ExternalLink,
  LogOut,
} from "lucide-react";
import {
  getAllBounties,
  getActiveBounties,
  getCompletedBounties,
} from "@/lib/bounty";
import { Bounty, BountyDifficulty, BountyStatus } from "@/lib/bounty/types";
import { useSupabase } from "@/context/SupabaseContext";
import "@/styles/jobs.css";

const difficultyColors: Record<BountyDifficulty, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/50",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  advanced: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  expert: "bg-red-500/20 text-red-400 border-red-500/50",
};

const statusColors: Record<BountyStatus, string> = {
  active: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
  claimed: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  completed: "bg-green-500/20 text-green-400 border-green-500/50",
  expired: "bg-gray-500/20 text-gray-400 border-gray-500/50",
};

// X/Twitter icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function BountyCard({ bounty }: { bounty: Bounty }) {
  const isActive = bounty.status === "active";
  const isCompleted = bounty.status === "completed";

  return (
    <Link href={`/code/bounty/${bounty.slug}`}>
      <div
        className={`
          relative p-4 border-2 transition-all duration-200 cursor-pointer h-full
          ${
            isActive
              ? "border-cyan-500/50 bg-gray-800/50 hover:bg-gray-800 hover:border-cyan-400"
              : isCompleted
              ? "border-green-500/30 bg-gray-800/30 hover:bg-gray-800/50 hover:border-green-500/50"
              : "border-gray-600/50 bg-gray-800/30 hover:bg-gray-800/50"
          }
        `}
      >
        {/* Bounty Number */}
        <div className="absolute -top-3 -left-1 bg-gray-700 text-gray-300 px-2 py-0.5 font-mono text-xs">
          #{bounty.id}
        </div>

        {/* Reward Badge */}
        <div
          className={`absolute -top-3 -right-3 px-3 py-1 font-mono text-sm font-bold ${
            isCompleted ? "bg-green-500 text-black" : "bg-yellow-500 text-black"
          }`}
        >
          RM{bounty.reward}
        </div>

        <div className="space-y-3 mt-2">
          {/* Title */}
          <h3 className="font-mono text-lg text-white pr-12 leading-tight">
            {bounty.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-2">
            {bounty.description}
          </p>

          {/* Winner Badge for completed bounties */}
          {isCompleted && bounty.winner && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-green-400 font-mono text-sm">Winner:</span>
              <span className="text-white font-mono text-sm">
                @{bounty.winner.xHandle}
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {bounty.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs font-mono"
              >
                {tag}
              </span>
            ))}
            {bounty.tags.length > 3 && (
              <span className="px-2 py-1 text-gray-500 text-xs font-mono">
                +{bounty.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 text-xs font-mono border ${
                  difficultyColors[bounty.difficulty]
                }`}
              >
                {bounty.difficulty.toUpperCase()}
              </span>
              <span
                className={`px-2 py-1 text-xs font-mono border ${
                  statusColors[bounty.status]
                }`}
              >
                {bounty.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock className="w-3 h-3" />
              <span>
                {new Date(bounty.deadline).toLocaleDateString("en-MY", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BountyListPage() {
  const router = useRouter();
  const { signOut } = useSupabase();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    BountyDifficulty | "all"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<BountyStatus | "all">(
    "all"
  );
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const allBounties = getAllBounties();
  const activeBounties = getActiveBounties();
  const completedBounties = getCompletedBounties();

  const filteredBounties = useMemo(() => {
    let bounties = allBounties;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      bounties = bounties.filter(
        (b) =>
          b.title.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedDifficulty !== "all") {
      bounties = bounties.filter((b) => b.difficulty === selectedDifficulty);
    }

    if (selectedStatus !== "all") {
      bounties = bounties.filter((b) => b.status === selectedStatus);
    }

    return bounties;
  }, [allBounties, searchQuery, selectedDifficulty, selectedStatus]);

  // Separate active and completed bounties for display
  const displayActiveBounties = filteredBounties.filter(
    (b) => b.status === "active"
  );
  const displayCompletedBounties = filteredBounties.filter(
    (b) => b.status === "completed"
  );
  const displayOtherBounties = filteredBounties.filter(
    (b) => b.status !== "active" && b.status !== "completed"
  );

  const totalRewardPaid = completedBounties.reduce(
    (sum, b) => sum + b.reward,
    0
  );
  const totalActiveReward = activeBounties.reduce(
    (sum, b) => sum + b.reward,
    0
  );

  return (
    <main className="min-h-screen bg-gray-900 relative">
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>

      {/* Header with Sign Out Button */}
      <div className="bg-gray-800/50 border-b border-gray-700 sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/code")}
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Back to Code Hub</span>
              <span className="md:hidden">Back</span>
            </button>

            <button
              onClick={() => setShowSignOutConfirm(true)}
              className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm px-3 py-1.5 border border-gray-700 hover:border-gray-600"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-900 border-2 border-cyan-500 p-6 max-w-md w-full">
            <h2 className="text-xl font-mono text-cyan-400 mb-4">
              CONFIRM SIGN OUT
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to sign out?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-mono py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSignOutConfirm(false);
                  signOut();
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-mono py-2 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Mobile Sign Out Button - Inline with content */}
        <div className="md:hidden mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl font-bold font-mono text-white tracking-tight">
              BOUNTY BOARD
            </h1>
          </div>
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm px-3 py-1.5 border border-gray-700 hover:border-gray-600"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Header - Desktop only */}
        <div className="mb-8 hidden md:block">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-10 h-10 text-yellow-500" />
            <h1 className="text-3xl md:text-4xl font-bold font-mono text-white tracking-tight">
              BOUNTY BOARD
            </h1>
          </div>
          <p className="text-gray-400 font-mono max-w-2xl">
            Complete coding challenges and earn rewards. Build something epic
            for the Kracked Devs community!
          </p>
        </div>

        {/* Description - Mobile only */}
        <p className="text-gray-400 font-mono text-sm mb-8 md:hidden">
          Complete coding challenges and earn rewards. Build something epic for
          the Kracked Devs community!
        </p>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-cyan-500/30 p-4">
            <div className="text-cyan-400 font-mono text-sm">
              Active Bounties
            </div>
            <div className="text-2xl font-bold text-white">
              {activeBounties.length}
            </div>
          </div>
          <div className="bg-gray-800/50 border border-yellow-500/30 p-4">
            <div className="text-yellow-400 font-mono text-sm">
              Available Rewards
            </div>
            <div className="text-2xl font-bold text-white">
              RM{totalActiveReward}
            </div>
          </div>
          <div className="bg-gray-800/50 border border-green-500/30 p-4">
            <div className="text-green-400 font-mono text-sm">Completed</div>
            <div className="text-2xl font-bold text-white">
              {completedBounties.length}
            </div>
          </div>
          <div className="bg-gray-800/50 border border-purple-500/30 p-4">
            <div className="text-purple-400 font-mono text-sm">Total Paid</div>
            <div className="text-2xl font-bold text-white">
              RM{totalRewardPaid}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/30 border border-gray-700 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search bounties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 pl-10 pr-4 py-2 font-mono text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as BountyStatus | "all")
              }
              className="bg-gray-900 border border-gray-600 px-4 py-2 font-mono text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="claimed">Claimed</option>
              <option value="expired">Expired</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) =>
                setSelectedDifficulty(
                  e.target.value as BountyDifficulty | "all"
                )
              }
              className="bg-gray-900 border border-gray-600 px-4 py-2 font-mono text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
        </div>

        {/* Active Bounties Section */}
        {displayActiveBounties.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold font-mono text-cyan-400 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 animate-pulse"></div>
              ACTIVE BOUNTIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayActiveBounties.map((bounty) => (
                <BountyCard key={bounty.id} bounty={bounty} />
              ))}
            </div>
          </div>
        )}

        {/* No Active Bounties Notice */}
        {displayActiveBounties.length === 0 && selectedStatus === "all" && (
          <div className="mb-12 bg-gray-800/30 border border-gray-700 p-8 text-center">
            <div className="text-gray-400 font-mono mb-2">
              No active bounties at the moment
            </div>
            <p className="text-gray-500 text-sm">
              Follow{" "}
              <a
                href="https://x.com/KrackedDevs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300"
              >
                @KrackedDevs
              </a>{" "}
              on X for new bounty announcements!
            </p>
          </div>
        )}

        {/* Completed Bounties Section */}
        {displayCompletedBounties.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold font-mono text-green-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              COMPLETED BOUNTIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCompletedBounties.map((bounty) => (
                <BountyCard key={bounty.id} bounty={bounty} />
              ))}
            </div>
          </div>
        )}

        {/* Other Bounties Section */}
        {displayOtherBounties.length > 0 && (
          <div>
            <h2 className="text-xl font-bold font-mono text-gray-400 mb-4">
              OTHER BOUNTIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayOtherBounties.map((bounty) => (
                <BountyCard key={bounty.id} bounty={bounty} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredBounties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-500 font-mono text-lg mb-4">
              No bounties found
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("all");
                setSelectedStatus("all");
              }}
              className="text-cyan-400 hover:text-cyan-300 font-mono text-sm"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA for X */}
        <div className="mt-12 bg-gray-800/30 border border-gray-700 p-6 text-center">
          <h3 className="text-lg font-mono text-white mb-2">
            Want to participate in future bounties?
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Follow us on X to get notified when new bounties are posted!
          </p>
          <a
            href="https://x.com/KrackedDevs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-2 font-mono font-bold hover:bg-gray-200 transition-colors"
          >
            <XIcon className="w-4 h-4" />
            Follow @KrackedDevs
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </main>
  );
}
