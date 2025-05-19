// src/app/project/[id]/edit/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectEditor from '../../../../components/project/edit/ProjectEditor';
import { mockProjectData } from '../../../../mocks/project-data';
import { useAppContext } from '../../../../providers/app-provider';
import { ProjectStage } from '../../../../types';


export default function ProjectEditPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { state } = useAppContext();
  const [projectStage, setProjectStage] = useState<ProjectStage>(ProjectStage.PRE_SEED);

  // Find the current project and its stage from context
  useEffect(() => {
    if (state.projects) {
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        setProjectStage(project.stage);
      }
    }
  }, [projectId, state.projects]);

  const handleProjectUpdate = (projectId: string, updates: any) => {
    // In a real app, this would make an API call to update the project
    console.log('Updating project:', projectId, updates);
  };

  const handleSaveVersion = (versionName: string, projectData: any) => {
    // In a real app, this would make an API call to save the project version
    console.log('Saving version:', versionName, projectData);
    // You might want to update the context or re-fetch data here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectEditor
        project={mockProjectData}
        onUpdate={handleProjectUpdate}
        onSaveVersion={handleSaveVersion} // Pass the new handler
        projectStage={projectStage}
        projectId={projectId}
      />

    </div>
  );
}
