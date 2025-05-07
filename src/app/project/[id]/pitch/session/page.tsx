"use client";

import React, { useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useAppContext } from '../../../../../providers/app-provider';
import PitchSimulation from '@/components/client-components/pitch/pitch-simulation';

export default function PitchSessionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { state } = useAppContext();
  const { projects } = state;
  const project = projects.find(p => p.id === params.id);

  useEffect(() => {
    // Check if session configuration exists in local storage
    const sessionConfig = localStorage.getItem(`pitch-session-${params.id}`);
    if (!sessionConfig) {
      // Redirect to setup if no configuration found
      router.push(`/project/${params.id}/pitch/setup`);
    }
  }, [params.id, router]);

  if (!project) {
    notFound();
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href={`/project/${project.id}`} className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to Project</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Virtual VC Pitching Session</h1>
            <p className="text-gray-500 mt-1">Pitch your startup to {project.name} to virtual investors</p>
          </div>
        </div>
      </div>

      <PitchSimulation projectId={project.id} />
    </div>
  );
}
