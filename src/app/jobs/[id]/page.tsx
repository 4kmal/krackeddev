import JobDetailClient from './JobDetailClient';
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import '../jobs.css';

export default function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <JobDetailClient id={params.id} />;
}

