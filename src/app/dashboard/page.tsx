// src/app/dashboard/page.tsx

"use client";

import React from 'react';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { useAppContext } from '../../providers/app-provider';
import { Button } from '../../components/ui/button';
import { ProjectStage } from '../../types';

// Project card component for dashboard
const ProjectCard = ({
  id,
  name,
  description,
  stage,
  updatedAt,
  locked
}: {
  id: string;
  name: string;
  description: string;
  stage: ProjectStage;
  updatedAt: string | number | Date;
  locked?: boolean;
}) => {
  // Get stage color and label
  const stageInfo: Record<ProjectStage, { color: string; label: string; }> = {
    [ProjectStage.IDEATION]: { color: 'bg-blue-100 text-blue-800', label: 'Ideation' },
    [ProjectStage.VALIDATION]: { color: 'bg-purple-100 text-purple-800', label: 'Validation' },
    [ProjectStage.PITCH_DECK]: { color: 'bg-amber-100 text-amber-800', label: 'Pitch Deck' },
    [ProjectStage.INVESTOR_READY]: { color: 'bg-green-100 text-green-800', label: 'Investor Ready' },
    [ProjectStage.DEVELOPMENT]: {
      color: 'bg-blue-100 text-gray-800',
      label: 'Development'
    },
    [ProjectStage.REFINEMENT]: {
      color: 'bg-gray-100 text-gray-800',
      label: 'Refinement'
    },
    [ProjectStage.DECK_CREATION]: {
      color: 'bg-red-100 text-gray-800',
      label: 'Deck Creation'
    },
    [ProjectStage.TESTING]: {
      color: 'bg-yellow-100 text-yellow-800',
      label: 'Testing'
    }
  };

  const { color, label } = stageInfo[stage];
  const formattedDate = new Date(updatedAt).toLocaleDateString();

  return (
    <div className={`block ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-5 border border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span className={`${color} text-xs px-2 py-1 rounded-full font-medium`}>{label}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Last updated: {formattedDate}</span>
          {locked ? (
            <span className="text-red-500 font-semibold">Locked</span>
          ) : (
            <Link href={`/project/${id}`}>View Project →</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { state } = useAppContext();
  const { projects, user } = state;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="mb-6 text-center">You need to be logged in to view your dashboard.</p>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  // Get projects by stage for grouping
  const projectsByStage = {
    [ProjectStage.INVESTOR_READY]: projects.filter(p => p.stage === ProjectStage.INVESTOR_READY),
    [ProjectStage.PITCH_DECK]: projects.filter(p => p.stage === ProjectStage.PITCH_DECK),
    [ProjectStage.VALIDATION]: projects.filter(p => p.stage === ProjectStage.VALIDATION),
    [ProjectStage.IDEATION]: projects.filter(p => p.stage === ProjectStage.IDEATION),
  };

  // Sort projects by updated date (newest first)
  const sortedProjects = [...projects].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track your business ideas</p>
        </div>
        <Button asChild size="lg" className="rounded-full bg-blue-700 text-white">
          <Link href="/projects/new" className="flex items-center">
            <PlusCircle className="mr-2 h-5 w-5" />
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
        <>
          {/* Recent Projects */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedProjects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  stage={project.stage}
                  updatedAt={project.updatedAt.toString()}
                  locked={project.locked}
                />
              ))}
            </div>
          </div>

          {/* Projects by Stage */}
          {Object.entries(projectsByStage).map(([stage, stageProjects]) => {
            if (stageProjects.length === 0) return null;

            const stageLabels = {
              [ProjectStage.IDEATION]: "Ideation Stage",
              [ProjectStage.VALIDATION]: "Validation Stage",
              [ProjectStage.PITCH_DECK]: "Pitch Deck Stage",
              [ProjectStage.INVESTOR_READY]: "Investor Ready",
              [ProjectStage.DEVELOPMENT]: "Development Stage",
              [ProjectStage.REFINEMENT]: "Refinement Stage",
              [ProjectStage.DECK_CREATION]: "Deck Creation Stage",
              [ProjectStage.TESTING]: "Testing Stage"

            };

            return (
              <div key={stage} className="mb-10">
                <h2 className="text-xl font-semibold mb-4">{stageLabels[stage as keyof typeof stageLabels]}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stageProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      name={project.name}
                      description={project.description}
                      stage={project.stage}
                      updatedAt={project.updatedAt.toString()}
                      locked={project.locked}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
