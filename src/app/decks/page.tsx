"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, Eye } from 'lucide-react';
import { useAppContext } from '../../providers/app-provider';
import { Button } from '../../components/ui/button';

export default function PitchDecks() {
  const { state } = useAppContext();
  const { projects, user } = state;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="mb-6 text-center">You need to be logged in to view your pitch decks.</p>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  // Filter projects that have pitch decks
  const projectsWithDecks = projects.filter(project => project.pitchDeck);

  // Sort by updated date (newest first)
  const sortedProjects = [...projectsWithDecks].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            <FileText className="inline-block mr-2 h-8 w-8 text-deep-blue" />
            Pitch Decks
          </h1>
          <p className="text-gray-600 mt-1">View and manage all your pitch decks</p>
        </div>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/wizard" className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Create New Deck
          </Link>
        </Button>
      </div>

      {projectsWithDecks.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="font-semibold text-lg mb-2">No pitch decks available</h3>
          <p className="text-gray-600 mb-6">Create a project and develop its pitch deck to get started</p>
          <Button asChild>
            <Link href="/wizard">Create Project</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => {
            // Count slides in the pitch deck
            const slideCount = project.pitchDeck?.slides?.length || 0;
            // Get the cover slide if it exists
            const coverSlide = project.pitchDeck?.slides?.find(slide => slide.type === 'cover');
            
            return (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                {/* Deck Preview */}
                <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center p-6 border-b border-gray-200">
                  <div className="max-w-full max-h-full overflow-hidden text-center">
                    {coverSlide ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <h3 className="text-xl font-bold text-gray-900">{coverSlide.content.title}</h3>
                        <p className="text-gray-600 mt-2">{coverSlide.content.subtitle}</p>
                      </div>
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <FileText className="h-12 w-12 mb-2" />
                        <span>Deck Preview</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Deck Info */}
                <div className="p-5">
                  <h3 className="font-medium text-lg text-gray-900">{project.name}</h3>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                    <span>{slideCount} slide{slideCount !== 1 ? 's' : ''}</span>
                    <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex mt-4 gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={`/project/${project.id}`}>
                        Project
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/project/${project.id}/deck`} className="flex items-center justify-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View Deck
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}