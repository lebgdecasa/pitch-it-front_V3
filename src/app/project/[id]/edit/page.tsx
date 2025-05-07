// src/app/project/[id]/edit/page.tsx
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import ProjectEditor from '../../../../components/project/edit/ProjectEditor';
import { mockProjectData } from '../../../../mocks/project-data';

export default function ProjectEditPage() {
  const params = useParams();
  const projectId = params.id as string;

  const handleProjectUpdate = (projectId: string, updates: any) => {
    // In a real app, this would make an API call to update the project
    console.log('Updating project:', projectId, updates);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectEditor
        project={mockProjectData}
        onUpdate={handleProjectUpdate}
      />
    </div>
  );
}