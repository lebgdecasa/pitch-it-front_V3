'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, RotateCw, Award, BarChart4, MessageSquare, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../../ui/card';
import { Button } from '../../../../../components/ui/button';
import { Progress } from '../../../../../ui/progress';
import { mockAssessment } from '../../../../../mocks/virtual-vc-data';
import { ScrollArea } from '../../../../../components/ui/scroll-area';

// Utility function to generate a PDF of the results
const generatePDF = async (projectId: string) => {
  // In a real application, this would use an actual PDF generation library
  console.log(`Generating PDF for project ${projectId}`);
  // Mock download - in real app, use proper PDF generation and download
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,');
  element.setAttribute('download', `pitch-feedback-${new Date().toISOString().split('T')[0]}.pdf`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

// Utility function to determine color based on score
const getScoreColor = (score: number) => {
  if (score >= 8) return 'success';
  if (score >= 6) return 'default';
  if (score >= 4) return 'warning';
  return 'destructive';
};

const getFeedbackItems = (feedback: string[], score: number) => {
  const positives = feedback.filter(item => !item.includes('Could') && !item.includes('Consider'));
  const suggestions = feedback.filter(item => item.includes('Could') || item.includes('Consider'));

  return (
    <>
      <div className="space-y-2 mt-2">
        <h4 className="text-sm font-medium flex items-center gap-1">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          Strengths
        </h4>
        <ul className="list-disc pl-5 text-sm space-y-1">
          {positives.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-medium flex items-center gap-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Areas for Improvement
          </h4>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

// Get the explanation based on score
const getScoreExplanation = (score: number) => {
  if (score >= 9) return "Exceptional pitch that would likely secure investor interest";
  if (score >= 8) return "Strong pitch with compelling elements and minor areas for improvement";
  if (score >= 7) return "Good pitch that shows promise but needs refinement in key areas";
  if (score >= 6) return "Solid foundation with several areas requiring development";
  if (score >= 5) return "Average pitch that needs significant improvement to stand out";
  if (score < 5) return "Pitch requires major overhaul to effectively communicate value";
};

export default function PitchResults({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [assessment] = useState(mockAssessment);

  const navigateBack = () => {
    router.push(`/project/${params.id}/virtual-vc/setup`);
  };

  const tryAgain = () => {
    router.push(`/project/${params.id}/virtual-vc/session`);
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-6 flex flex-col space-y-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={navigateBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Setup
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => generatePDF(params.id)}
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button
            size="sm"
            className="gap-1"
            onClick={tryAgain}
          >
            <RotateCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Score Card */}
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-2xl">Pitch Assessment Results</CardTitle>
              <CardDescription>
                Based on your virtual VC pitch session
              </CardDescription>
            </div>
            <div className="rounded-full bg-gray-50 p-3 border">
              <Award className="h-8 w-8 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="relative w-full aspect-square max-w-[200px] mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-bold">{assessment.score}</div>
                  </div>
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-100"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className={`${
                        assessment.score >= 8
                          ? 'text-green-500'
                          : assessment.score >= 6
                          ? 'text-blue-500'
                          : assessment.score >= 4
                          ? 'text-amber-500'
                          : 'text-red-500'
                      }`}
                      strokeWidth="10"
                      strokeDasharray={`${assessment.score * 25} 250`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Overall Assessment</h3>
                <p className="text-gray-700 mb-4">
                  {getScoreExplanation(assessment.score)}
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Content</span>
                      <span className="font-medium">{assessment.content.score}/10</span>
                    </div>
                    <Progress
                      value={assessment.content.score * 10}
                      variant={getScoreColor(assessment.content.score)}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Delivery</span>
                      <span className="font-medium">{assessment.delivery.score}/10</span>
                    </div>
                    <Progress
                      value={assessment.delivery.score * 10}
                      variant={getScoreColor(assessment.delivery.score)}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Behavior</span>
                      <span className="font-medium">{assessment.behavior.score}/10</span>
                    </div>
                    <Progress
                      value={assessment.behavior.score * 10}
                      variant={getScoreColor(assessment.behavior.score)}
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Feedback Cards */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-blue-500" />
              <CardTitle>Pitch Content</CardTitle>
            </div>
            <CardDescription>Analysis of what you said</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[220px] pr-4">
              {getFeedbackItems(assessment.content.feedback, assessment.content.score)}
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="w-full flex justify-between items-center">
              <span className="text-sm text-gray-500">Score</span>
              <div className="flex items-center">
                <span className="font-bold text-lg mr-2">{assessment.content.score}</span>
                <Progress
                  value={assessment.content.score * 10}
                  variant={getScoreColor(assessment.content.score)}
                  className="w-20 h-2"
                />
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              <CardTitle>Pitch Delivery</CardTitle>
            </div>
            <CardDescription>How you presented</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[220px] pr-4">
              {getFeedbackItems(assessment.delivery.feedback, assessment.delivery.score)}
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="w-full flex justify-between items-center">
              <span className="text-sm text-gray-500">Score</span>
              <div className="flex items-center">
                <span className="font-bold text-lg mr-2">{assessment.delivery.score}</span>
                <Progress
                  value={assessment.delivery.score * 10}
                  variant={getScoreColor(assessment.delivery.score)}
                  className="w-20 h-2"
                />
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <CardTitle>Behavior</CardTitle>
            </div>
            <CardDescription>Your responses and demeanor</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[220px] pr-4">
              {getFeedbackItems(assessment.behavior.feedback, assessment.behavior.score)}
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="w-full flex justify-between items-center">
              <span className="text-sm text-gray-500">Score</span>
              <div className="flex items-center">
                <span className="font-bold text-lg mr-2">{assessment.behavior.score}</span>
                <Progress
                  value={assessment.behavior.score * 10}
                  variant={getScoreColor(assessment.behavior.score)}
                  className="w-20 h-2"
                />
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Recommendations Card */}
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Recommendations to improve your pitch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium mb-2 text-blue-800">Practice Makes Perfect</h3>
                <p className="text-sm text-blue-700">
                  Try another Virtual VC session focusing on areas that needed improvement. Experimenting with
                  different investor types can help you adapt to various questioning styles.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="font-medium mb-2 text-green-800">Refine Your Pitch Deck</h3>
                <p className="text-sm text-green-700">
                  Use the feedback to update your pitch deck, emphasizing the strengths
                  identified and addressing the areas for improvement.
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h3 className="font-medium mb-2 text-amber-800">Research Further</h3>
                <p className="text-sm text-amber-700">
                  Consider researching additional data points or market validation to strengthen
                  any weak areas identified during your pitch.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={navigateBack}>
                Change Setup
              </Button>
              <Button onClick={tryAgain}>
                Try Another Pitch
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
