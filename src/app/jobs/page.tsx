"use client";

import { JobsTable } from "@/components/jobs/jobs-table";
import { JobsFilter } from "@/components/jobs/jobs-filter";

export default function JobsPage() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-4 space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-white tracking-tight">
            Job Board
          </h1>
          <p className="text-gray-400 font-mono text-lg max-w-2xl">
            Find your next role in the Malaysian tech ecosystem.
            <br className="hidden md:block" />
            Curated opportunities for developers, by developers.
          </p>
        </div>

        <JobsFilter />

        <JobsTable />
      </div>
    </main>
  );
}
