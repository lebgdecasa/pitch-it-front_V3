// src/app/project/[id]/chat/[[...persona]]/page.tsx

"use client";

import React from 'react'; // Removed useState, useEffect as GroupChat handles its own state
import { useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useAppContext } from '@/providers/app-provider';
import { GroupChat } from '@/components/client-components/project/group-chat'; // Adjusted path

export default function ChatPage() {
  const params = useParams();
  const projectId = params.id as string;
  // The `personaParam` from `[[...persona]]` in the URL is captured but may not be directly
  // used by the GroupChat component as it handles multiple personas internally.
  // const personaParam = params.persona as string[] | undefined;

  const { state } = useAppContext();
  const { projects } = state;
  const project = projects.find(p => p.id === projectId);

  const pageTitle = "Group Chat"; // Updated page title

  if (!project) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <p>Project not found. Cannot load Group Chat.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto"> {/* Consider adjusting max-width if needed */}
      {/* Back link and project title */}
      <div className="mb-6">
        <Link href={`/project/${projectId}`} className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to Project</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-gray-500 mt-1">Project: {project.name}</p>
          </div>
        </div>
      </div>

      {/* Main content - Render the GroupChat component */}
      <div className="grid grid-cols-1 gap-6">
        <GroupChat projectId={projectId} projectName={project.name} />
      </div>
    </div>
  );
}
