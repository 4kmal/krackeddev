"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import '../jobs.css';

// Required for static export with dynamic routes
export function generateStaticParams() {
  // Generate static params for all quest IDs
  const questIds = [
    'quest-1', 'quest-2', 'quest-3', 'quest-4', 'quest-5',
    'quest-6', 'quest-7', 'quest-8', 'quest-9', 'quest-10',
    'quest-11', 'quest-12', 'quest-13', 'quest-14', 'quest-15',
    'quest-16', 'quest-17', 'quest-18', 'quest-19', 'quest-20',
  ];
  
  return questIds.map((id) => ({
    id: id,
  }));
}

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id as string;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 border-4 border-blue-500 max-w-2xl w-full p-8 text-center">
        <h1 className="text-3xl text-blue-400 font-bold mb-4">Job Details</h1>
        <p className="text-xl text-white mb-2">The job will display here</p>
        <p className="text-gray-400 text-sm">Job ID: {jobId}</p>
        <div className="mt-8">
          <button
            onClick={() => {
              window.close();
            }}
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition-colors"
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

