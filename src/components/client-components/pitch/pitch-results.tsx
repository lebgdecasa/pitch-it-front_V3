"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '../../../ui/badge';
import {
  BarChart3,
  Download,
  ThumbsUp,
  ThumbsDown,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight
} from 'lucide-react';

interface PitchResultsProps {
  projectId: string;
  projectName: string;
}

type PitchResult = {
  projectId: string;
  date: string;
  personaName: string;
  personaType: string;
  difficulty: number;
  duration: string;
  progress: number;
  score: number;
  strengths: string[];
  improvements: string[];
  transcription: Array<{
    id: string;
    role: 'user' | 'investor';
    content: string;
    timestamp: Date;
  }>;
}

export default function PitchResults({ projectId, projectName }: PitchResultsProps) {
  const router = useRouter();
  const [results, setResults] = useState<PitchResult | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    // Load results from localStorage
    const resultsString = localStorage.getItem(`pitch-results-${projectId}`);
    if (resultsString) {
      setResults(JSON.parse(resultsString));
    }
  }, [projectId]);

  if (!results) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading pitch results...</p>
      </div>
    );
  }

  const handleDownloadResults = () => {
    // Create a download object
    const resultsText = `
# Pitch Session Results for ${projectName}

Date: ${new Date(results.date).toLocaleString()}
Investor: ${results.personaName} (${results.personaType})
Difficulty Level: ${results.difficulty}%
Duration: ${results.duration}
Overall Score: ${results.score}/100

## Strengths
${results.strengths.map(s => `- ${s}`).join('\n')}

## Areas for Improvement
${results.improvements.map(s => `- ${s}`).join('\n')}

## Full Transcript
${results.transcription.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n')}
    `;

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}-pitch-results.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-100 text-green-800';
    if (score >= 70) return 'bg-blue-100 text-blue-800';
    if (score >= 50) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Score & Summary */}
        <div className="md:col-span-1">
          <Card className="border border-purple-100">
            <CardHeader className="bg-purple-50 border-b border-purple-100">
              <CardTitle className="text-lg text-purple-800">Pitch Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className={`h-28 w-28 rounded-full flex items-center justify-center text-2xl font-bold ${getScoreColor(results.score)}`}>
                  {results.score}/100
                </div>
                <p className="mt-2 font-medium text-gray-900">{getScoreMessage(results.score)}</p>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-purple-500" />
                    <span className="text-sm">Investor Type</span>
                  </div>
                  <span className="text-sm font-medium">{results.personaType}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-purple-500" />
                    <span className="text-sm">Session Duration</span>
                  </div>
                  <span className="text-sm font-medium">{results.duration}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-1 text-purple-500" />
                    <span className="text-sm">Topics Covered</span>
                  </div>
                  <span className="text-sm font-medium">{Math.round(results.progress)}%</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center"
                  onClick={handleDownloadResults}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Results
                </Button>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => router.push(`/project/${projectId}`)}
                >
                  Return to Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Feedback & Transcript */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            {/* Investor Information */}
            <Card className="border border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full overflow-hidden relative mr-4">
                    <Image
                      src={`/assets/avatars/vc-1.png`}
                      alt={results.personaName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{results.personaName}</h3>
                    <p className="text-gray-500">{results.personaType} Investor</p>
                    <p className="text-sm text-purple-600 mt-1">
                      Difficulty Level: {results.difficulty < 25 ? 'Supportive' :
                        results.difficulty < 50 ? 'Balanced' :
                        results.difficulty < 75 ? 'Challenging' : 'Aggressive'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Analysis */}
            <Card className="border border-purple-100">
              <CardHeader className="bg-purple-50 border-b border-purple-100">
                <CardTitle className="text-lg text-purple-800">Pitch Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3 flex items-center text-gray-900">
                    <ThumbsUp className="h-4 w-4 mr-2 text-green-500" /> Strengths
                  </h3>
                  <ul className="space-y-2">
                    {results.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3 flex items-center text-gray-900">
                    <ThumbsDown className="h-4 w-4 mr-2 text-amber-500" /> Areas for Improvement
                  </h3>
                  <ul className="space-y-2">
                    {results.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex items-start">
                        <XCircle className="h-4 w-4 mr-2 text-amber-500 mt-1 flex-shrink-0" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category Scores */}
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3 text-gray-900">Category Scores</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {name: 'Clarity', score: 85},
                      {name: 'Structure', score: 78},
                      {name: 'Delivery', score: 72},
                      {name: 'Content', score: 87}
                    ].map((category, idx) => (
                      <div key={idx} className="border rounded-md p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{category.name}</span>
                          <Badge className={getScoreColor(category.score)}>
                            {category.score}/100
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              category.score >= 85 ? 'bg-green-500' :
                              category.score >= 70 ? 'bg-blue-500' :
                              category.score >= 50 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${category.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Plan */}
                <div>
                  <h3 className="text-base font-medium mb-3 text-gray-900">Recommended Next Steps</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 text-purple-500 mt-1 flex-shrink-0" />
                      <span>Add specific metrics to demonstrate traction and growth</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 text-purple-500 mt-1 flex-shrink-0" />
                      <span>Refine financial projections with more detailed assumptions</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 text-purple-500 mt-1 flex-shrink-0" />
                      <span>Practice responding to challenging questions about market dynamics</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Transcript */}
            <Card className="border border-purple-100">
              <CardHeader className="bg-purple-50 border-b border-purple-100 flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-purple-800">Conversation Transcript</CardTitle>
                <Button
                  variant="ghost"
                  onClick={() => setShowTranscript(!showTranscript)}
                >
                  {showTranscript ? 'Hide' : 'Show'}
                </Button>
              </CardHeader>
              {showTranscript && (
                <CardContent className="p-6 max-h-96 overflow-y-auto">
                  {results.transcription.map((message, idx) => (
                    <div key={idx} className="mb-4">
                      <div
                        className={`p-3 rounded-lg ${
                          message.role === 'investor' ? 'bg-gray-100' : 'bg-purple-100'
                        }`}
                      >
                        <div className="font-medium mb-1">
                          {message.role === 'investor' ? results.personaName : 'You'}
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
