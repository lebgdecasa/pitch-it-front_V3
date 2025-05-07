"use client";

import React from 'react';
import Link from 'next/link';
import { FolderKanban, Edit } from 'lucide-react';
import { useAppContext } from '../../providers/app-provider';
import { Button } from '../../components/ui/button';
import { ProjectStage } from '../../types';

export default function Projects() {
  const { state } = useAppContext();
  const { projects, user } = state;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="mb-6 text-center">You need to be logged in to view your projects.</p>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  // Sort projects by updated date (newest first)
  const sortedProjects = [...projects].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            <FolderKanban className="inline-block mr-2 h-8 w-8 text-deep-blue" />
            Projects
          </h1>
          <p className="text-gray-600 mt-1">Manage all your projects in one place</p>
        </div>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/wizard" className="flex items-center">
            <Edit className="mr-2 h-5 w-5" />
            New Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="font-semibold text-lg mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-6">Get started by creating your first project</p>
          <Button asChild>
            <Link href="/wizard">Create Project</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Projects by Stage Section */}
          {Object.values(ProjectStage).map((stage) => {
            const stageProjects = sortedProjects.filter(p => p.stage === stage);

            if (stageProjects.length === 0) return null;

            const stageInfo: Record<ProjectStage, { color: string; label: string }> = {
              [ProjectStage.IDEATION]: { color: 'bg-blue-100 text-blue-800', label: 'Ideation Stage' },
              [ProjectStage.VALIDATION]: { color: 'bg-purple-100 text-purple-800', label: 'Validation Stage' },
              [ProjectStage.DECK_CREATION]: { color: 'bg-orange-100 text-orange-800', label: 'Deck Creation Stage' },
              [ProjectStage.PITCH_DECK]: { color: 'bg-amber-100 text-amber-800', label: 'Pitch Deck Stage' },
              [ProjectStage.INVESTOR_READY]: { color: 'bg-green-100 text-green-800', label: 'Investor Ready' },
              [ProjectStage.DEVELOPMENT]: { color: 'bg-gray-100 text-gray-800', label: 'Development Stage' },
              [ProjectStage.REFINEMENT]: { color: 'bg-teal-100 text-teal-800', label: 'Refinement Stage' },
              [ProjectStage.TESTING]: {
                color: '',
                label: ''
              }
            };

            return (
              <div key={stage} className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className={`${stageInfo[stage].color} inline-block px-3 py-1 rounded-full text-sm mr-3`}>
                    {stageProjects.length}
                  </span>
                  {stageInfo[stage].label}
                </h2>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {stageProjects.map((project, index) => (
                    <React.Fragment key={project.id}>
                      <div className="p-5 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-lg text-gray-900">{project.name}</h3>
                          <p className="text-gray-600 line-clamp-1 mt-1">{project.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <span className="mr-4">Industry: {project.industry}</span>
                            <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/project/${project.id}`}>
                              View Project
                            </Link>
                          </Button>
                          {project.pitchDeck && (
                            <Button asChild size="sm">
                              <Link href={`/project/${project.id}/deck`}>
                                View Deck
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                      {index < stageProjects.length - 1 && <hr className="border-gray-200" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
