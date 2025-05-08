"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Download, Share, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusTracker from '@/components/client-components/pulse/status-tracker';
import InteractiveReport from '@/components/client-components/pulse/interactive-report';
import { useAppContext } from '@/providers/app-provider';
import { usePulseContext } from '@/providers/pulse-provider';
import { getPulseReportData } from '@/mocks/pulse-data';

export default function PulseResultsPage() {
  const { id } = useParams() as { id: string };
  const { state } = useAppContext();
  const { markResultAsReady } = usePulseContext();
  const project = state.projects.find(p => p.id === id);
  const [currentStatus, setCurrentStatus] = useState<'pending' | 'recruiting' | 'in_progress' | 'analyzing' | 'complete' | 'error'>('pending');
  const [participantsCompleted, setParticipantsCompleted] = useState(0);
  const participantsTotal = 15; // Example total

  // Mock pulse data
  const pulseData = getPulseReportData(id);

  // Simulate progress of the research
  useEffect(() => {
    // Start with pending
    const pendingTimer = setTimeout(() => {
      setCurrentStatus('recruiting');

      // Move to recruiting
      const recruitingTimer = setTimeout(() => {
        setCurrentStatus('in_progress');

        // Start completing participants
        const participantInterval = setInterval(() => {
          setParticipantsCompleted(prev => {
            const newValue = prev + 1;
            if (newValue >= participantsTotal) {
              clearInterval(participantInterval);

              // Move to analyzing
              setTimeout(() => {
                setCurrentStatus('analyzing');

                // Finally complete
                setTimeout(() => {
                  setCurrentStatus('complete');
                  // Mark pulse results as ready for notification
                  markResultAsReady(id);
                }, 10000);
              }, 3000);
            }
            return newValue;
          });
        }, 2000);

      }, 8000);

      return () => {
        clearTimeout(recruitingTimer);
      };
    }, 5000);

    return () => {
      clearTimeout(pendingTimer);
    };
  }, [id, markResultAsReady, participantsTotal]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <Link href={`/project/${id}`} className="inline-flex items-center text-sm text-gray-600 hover:text-deep-blue mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Project
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Real-World Pulse Results</h1>
            <p className="text-gray-600 mt-1">
              {project?.name || 'Project'} - User Feedback Analysis
            </p>
          </div>

          {currentStatus === 'complete' && (
            <div className="mt-4 md:mt-0 space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share Results
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {currentStatus === 'complete' ? (
              <InteractiveReport
                projectId={id}
                pulseData={pulseData}
              />
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-blue-100 p-3 mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Research in Progress</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Your Real-World Pulse research is currently being conducted.
                    Results will appear here once the process is complete.
                  </p>

                  <div className="w-full max-w-md h-2 bg-gray-200 rounded-full mb-4">
                    <div
                      className="h-2 bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(participantsCompleted / participantsTotal) * 100}%` }}
                    ></div>
                  </div>

                  <p className="text-sm text-gray-500">
                    {participantsCompleted} of {participantsTotal} participants completed
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <StatusTracker
              status={currentStatus}
              participantsTotal={participantsTotal}
              participantsCompleted={participantsCompleted}
            />

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Research Summary</h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Project</h4>
                  <p className="text-gray-800">{project?.name || 'Not specified'}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Research Goals</h4>
                  <p className="text-gray-800">Problem Validation, Pricing Feedback</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Target Personas</h4>
                  <p className="text-gray-800">Tech-savvy Professionals, Digital Parents</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Order Date</h4>
                  <p className="text-gray-800">{new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4">
                {currentStatus === 'complete' ? (
                  <Link
                    href="#"
                    className="text-sm flex items-center font-medium text-blue-600 hover:text-blue-800"
                  >
                    View raw data
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                ) : (
                  <p className="text-sm text-gray-500">
                    Full data will be available when research completes
                  </p>
                )}
              </div>
            </div>

            {/* Only show "Next Steps" when research is complete */}
            {currentStatus === 'complete' && (
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 text-blue-600 mr-3 flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Address identified pain points in your product roadmap</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 text-blue-600 mr-3 flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Update your pitch deck with user insights</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 text-blue-600 mr-3 flex-shrink-0 mt-0.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Consider a follow-up test on revised solutions</span>
                  </li>
                </ul>

                <div className="mt-4">
                  <Button className="w-full">
                    <Link href={`/project/${id}/pitch/setup`}>
                      Move to Pitch Practice
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
