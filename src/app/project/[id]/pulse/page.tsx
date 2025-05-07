"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, BarChart3, LineChart, ArrowRight, PlusCircle, History } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { useAppContext } from '../../../../providers/app-provider';

export default function PulsePage() {
  const { id } = useParams() as { id: string };
  const { state } = useAppContext();
  const project = state.projects.find(p => p.id === id);
  const [hasPreviousResults, setHasPreviousResults] = useState(false);

  useEffect(() => {
    // In a real app, we'd check if this project has any pulse results
    // For now, let's assume projects with IDs ending in 1 or 3 have results
    setHasPreviousResults(id.endsWith('1') || id.endsWith('3'));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Link href={`/project/${id}`} className="inline-flex items-center text-sm text-gray-600 hover:text-deep-blue mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Project
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Real-World Pulse</h1>
          <p className="text-gray-600 mt-1">
            Collect valuable user feedback and validate your ideas with real people
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Start New Analysis Card */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="h-5 w-5 text-deep-blue mr-2" />
                Start New Analysis
              </CardTitle>
              <CardDescription>
                Create a new pulse research to gather feedback from target users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-deep-blue mb-2">Why run a Real-World Pulse?</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-deep-blue mr-2 mt-0.5">✓</div>
                    <span>Validate your business idea with real target users</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-deep-blue mr-2 mt-0.5">✓</div>
                    <span>Identify pain points and improve your solution</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-deep-blue mr-2 mt-0.5">✓</div>
                    <span>Test pricing models and willingness to pay</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-deep-blue mr-2 mt-0.5">✓</div>
                    <span>Get actionable insights backed by data</span>
                  </li>
                </ul>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">What you&apos;ll need to get started:</p>
                <ul className="list-disc list-inside space-y-1 ml-1 text-gray-500">
                  <li>Research objectives</li>
                  <li>Target user personas</li>
                  <li>Testing parameters</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/project/${id}/pulse/wizard`}>
                  Create New Analysis
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* View Results Card */}
          <Card className={`border shadow-sm ${!hasPreviousResults ? 'bg-gray-50 opacity-75' : 'hover:shadow-md transition-shadow'}`}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 text-deep-blue mr-2" />
                View Pulse Results
              </CardTitle>
              <CardDescription>
                See insights from your previous research sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasPreviousResults ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Problem-Solution Fit</p>
                      <p className="text-2xl font-semibold text-green-600">87%</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Price Sensitivity</p>
                      <p className="text-2xl font-semibold text-amber-600">Medium</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Insights</h4>
                    <div className="text-sm text-gray-600">
                      <p>Last analysis completed on {new Date().toLocaleDateString()}</p>
                      <p>15 participants from your target audience</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="p-3 bg-gray-100 rounded-full mb-3">
                    <History className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-500">No Results Yet</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Run your first pulse analysis to see results here
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={hasPreviousResults ? "default" : "outline"}
                disabled={!hasPreviousResults}
                asChild
              >
                <Link href={hasPreviousResults ? `/project/${id}/pulse/results` : '#'}>
                  View Analysis Results
                  {hasPreviousResults && <ArrowRight className="h-4 w-4 ml-2" />}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* How it Works Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">How Real-World Pulse Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border border-gray-100 rounded-lg p-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-deep-blue flex items-center justify-center mb-3">1</div>
              <h3 className="font-medium mb-1">Define Objectives</h3>
              <p className="text-sm text-gray-600">Select what you want to learn from your target users</p>
            </div>

            <div className="border border-gray-100 rounded-lg p-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-deep-blue flex items-center justify-center mb-3">2</div>
              <h3 className="font-medium mb-1">Choose Audience</h3>
              <p className="text-sm text-gray-600">Select your target personas and screener questions</p>
            </div>

            <div className="border border-gray-100 rounded-lg p-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-deep-blue flex items-center justify-center mb-3">3</div>
              <h3 className="font-medium mb-1">Set Parameters</h3>
              <p className="text-sm text-gray-600">Choose testing methods and number of participants</p>
            </div>

            <div className="border border-gray-100 rounded-lg p-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-deep-blue flex items-center justify-center mb-3">4</div>
              <h3 className="font-medium mb-1">Get Results</h3>
              <p className="text-sm text-gray-600">Receive actionable insights from your target audience</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">How long does a pulse analysis take?</h3>
              <p className="text-sm text-gray-600">Most analyses complete within 3-5 business days, depending on the number of participants and testing methods chosen.</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">How are participants recruited?</h3>
              <p className="text-sm text-gray-600">We recruit participants from a global panel of verified users who match your target demographic and behavioral criteria.</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">What kind of insights will I get?</h3>
              <p className="text-sm text-gray-600">You&apos;ll receive quantitative metrics on problem-solution fit, willingness to pay, and feature prioritization, plus qualitative feedback on your concept.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
