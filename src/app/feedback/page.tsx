"use client";

import React from 'react';
import Link from 'next/link';
import { Award, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../providers/app-provider';
import { Button } from '../../components/ui/button';
import { Project, Feedback } from '../../types';

export default function FeedbackPage() {
  const { state } = useAppContext();
  const { projects, user } = state;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
        <p className="mb-6 text-center">You need to be logged in to view feedback.</p>
        <Button asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  // Get all projects with feedback
  const projectsWithFeedback = projects.filter(p => p.feedback && p.feedback.length > 0);

  // Create a flattened array of all feedback with project info
  const allFeedbackItems = projectsWithFeedback.flatMap(project =>
    (project.feedback || []).map(feedback => ({
      projectId: project.id,
      projectName: project.name,
      feedback
    }))
  );

  // Sort by feedback date (newest first)
  const sortedFeedback = allFeedbackItems.sort((a, b) =>
    new Date(b.feedback.createdAt).getTime() - new Date(a.feedback.createdAt).getTime()
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            <Award className="inline-block mr-2 h-8 w-8 text-deep-blue" />
            Feedback
          </h1>
          <p className="text-gray-600 mt-1">Review investor feedback on your projects</p>
        </div>
      </div>

      {sortedFeedback.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="font-semibold text-lg mb-2">No feedback available yet</h3>
          <p className="text-gray-600 mb-6">Complete your pitch deck to start receiving valuable feedback</p>
          <Button asChild>
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedFeedback.map(({ projectId, projectName, feedback }) => (
            <div key={feedback.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{feedback.vcName}</h3>
                    <Link href={`/project/${projectId}`} className="ml-3 text-sm text-deep-blue hover:underline">
                      {projectName}
                    </Link>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Received on {new Date(feedback.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center">
                  <div className="text-lg font-bold text-amber-600">{feedback.overallScore}/10</div>
                  <div className="ml-2 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                    STRENGTHS
                  </h4>
                  <ul className="space-y-2">
                    {feedback.strengthPoints.map((point, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="inline-block w-5 h-5 mr-2 bg-green-100 rounded-full flex-shrink-0 items-center justify-center text-green-700 text-xs">
                          ✓
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-blue-700 mb-2">IMPROVEMENTS</h4>
                  <ul className="space-y-2">
                    {feedback.improvementPoints.map((point, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="inline-block w-5 h-5 mr-2 bg-blue-100 rounded-full flex-shrink-0 items-center justify-center text-blue-700 text-xs">
                          !
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {feedback.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    ADDITIONAL NOTES
                  </h4>
                  <p className="text-sm text-gray-600">{feedback.notes}</p>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/project/${projectId}`}>
                    View Project
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
