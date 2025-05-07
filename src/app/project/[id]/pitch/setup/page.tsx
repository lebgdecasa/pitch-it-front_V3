"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useAppContext } from '../../../../../providers/app-provider';
import PitchSetup from '../../../../../components/client-components/pitch/pitch-setup';

export default function PitchSetupPage({ params }: { params: { id: string } }) {
  const { state } = useAppContext();
  const { projects } = state;
  const project = projects.find(p => p.id === params.id);
  
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Virtual VC Pitch Setup</h1>
            <p className="text-gray-500 mt-1">Configure your pitching session for {project.name}</p>
          </div>
        </div>
      </div>
      
      <PitchSetup projectId={project.id} projectName={project.name} />
    </div>
  );
}