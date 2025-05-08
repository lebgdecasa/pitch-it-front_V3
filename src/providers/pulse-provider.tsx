"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { usePathname } from 'next/navigation';

type PulseContextType = {
  projectsWithReadyResults: string[]; // Array of project IDs with ready results
  isResultReady: (projectId: string) => boolean;
  markResultAsReady: (projectId: string) => void;
  markResultAsViewed: (projectId: string) => void;
};

const PulseContext = createContext<PulseContextType | undefined>(undefined);

interface PulseProviderProps {
  children: ReactNode;
}

export const PulseProvider = ({ children }: PulseProviderProps) => {
  // State to track project IDs with ready results
  const [projectsWithReadyResults, setProjectsWithReadyResults] = useState<string[]>([]);
  const pathname = usePathname();

  // Load saved state from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('pulseReadyResults');
    if (savedProjects) {
      try {
        setProjectsWithReadyResults(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Error parsing pulse results from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage when the state changes
  useEffect(() => {
    if (projectsWithReadyResults.length > 0) {
      localStorage.setItem('pulseReadyResults', JSON.stringify(projectsWithReadyResults));
    }
  }, [projectsWithReadyResults]);

  // Check if a specific project has ready results
  const isResultReady = useCallback((projectId: string): boolean => {
    return projectsWithReadyResults.includes(projectId);
  }, [projectsWithReadyResults]);

  // Mark a project's results as ready (adds notification dot)
  const markResultAsReady = useCallback((projectId: string): void => {
    if (!projectsWithReadyResults.includes(projectId)) {
      setProjectsWithReadyResults([...projectsWithReadyResults, projectId]);
    }
  }, [projectsWithReadyResults]);

  // Mark a project's results as viewed (removes notification dot)
  const markResultAsViewed = useCallback((projectId: string): void => {
    if (projectsWithReadyResults.includes(projectId)) {
      setProjectsWithReadyResults(
        projectsWithReadyResults.filter(id => id !== projectId)
      );
    }
  }, [projectsWithReadyResults]);

  // This effect was removed as notification should persist until clicked
  // No longer auto-marking as viewed when navigating to the pulse results page

  return (
    <PulseContext.Provider value={{
        projectsWithReadyResults,
        isResultReady,
        markResultAsReady,
        markResultAsViewed
      }}>
      {children}
    </PulseContext.Provider>
  );
};

export const usePulseContext = () => {
  const context = useContext(PulseContext);
  if (!context) {
    throw new Error('usePulseContext must be used within a PulseProvider');
  }
  return context;
};
