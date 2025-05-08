'use client';

import React, { useState } from 'react';
import {
  ChartBarIcon,
  UserGroupIcon,
  ChartPieIcon,
  LightBulbIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from '../../../lib/utils';

// Define the types for our analysis data
interface Insight {
  text: string;
  relevance: number;
  source?: string;
}

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

interface DemographicGroup {
  name: string;
  percentage: number;
  sentiment?: SentimentData;
}

interface ThemeItem {
  theme: string;
  count: number;
  sentiment?: SentimentData;
  keywords?: string[];
}

interface NetnographicAnalysis {
  summary: string;
  keyInsights: Insight[];
  demographics: {
    ageGroups: DemographicGroup[];
    genderDistribution: DemographicGroup[];
    occupations: DemographicGroup[];
    interests: DemographicGroup[];
  };
  sentimentAnalysis: {
    overall: SentimentData;
    byPlatform?: Record<string, SentimentData>;
  };
  themes: ThemeItem[];
  recommendations: string[];
}

// Interface for component props
interface AnalysisDialogProps {
  projectId: string;
  projectName: string;
  analysis: NetnographicAnalysis;
}

export default function AnalysisDialog({ projectId, projectName, analysis }: AnalysisDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!analysis) {
    return null;
  }

  // Format percentage for display
  const formatPercentage = (value: number): string => {
    return `${Math.round(value * 100)}%`;
  };

  // Helper to render sentiment indicators
  const renderSentimentBars = (sentiment?: SentimentData) => {
    if (!sentiment) return null;

    return (
      <div className="flex items-center space-x-1 mt-1">
        <div
          className="bg-accent-green h-2 rounded-l"
          style={{ width: `${sentiment.positive * 100}px` }}
          title={`Positive: ${formatPercentage(sentiment.positive)}`}
        />
        <div
          className="bg-gray-300 h-2"
          style={{ width: `${sentiment.neutral * 100}px` }}
          title={`Neutral: ${formatPercentage(sentiment.neutral)}`}
        />
        <div
          className="bg-destructive h-2 rounded-r"
          style={{ width: `${sentiment.negative * 100}px` }}
          title={`Negative: ${formatPercentage(sentiment.negative)}`}
        />
      </div>
    );
  };

  return (
    <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center mb-3"
                onClick={() => setOpen(true)}
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                <span>View Netnographic Analysis</span>
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Analyze data from social media and online communities</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-primary" />
              Netnographic Analysis for {projectName}
            </DialogTitle>
            <DialogDescription>
              Analysis of online conversations and communities related to your project
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <ChartPieIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="demographics" className="flex items-center gap-2">
                <UserGroupIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Demographics</span>
              </TabsTrigger>
              <TabsTrigger value="themes" className="flex items-center gap-2">
                <ChartBarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Themes</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <LightBulbIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Recommendations</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Summary</h3>
                <p className="text-gray-700">{analysis.summary}</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Key Insights</h3>
                <div className="space-y-3">
                  {analysis.keyInsights.map((insight, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 rounded-full p-1">
                          <LightBulbIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-gray-800">{insight.text}</p>
                          {insight.source && (
                            <div className="mt-1">
                              <span className="text-xs text-gray-500">Source: {insight.source}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Overall Sentiment</h3>
                <div className="bg-white p-4 border rounded-lg">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-accent-green/10 p-2 rounded">
                      <p className="text-accent-green font-medium text-lg">
                        {formatPercentage(analysis.sentimentAnalysis.overall.positive)}
                      </p>
                      <p className="text-xs text-gray-600">Positive</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-gray-700 font-medium text-lg">
                        {formatPercentage(analysis.sentimentAnalysis.overall.neutral)}
                      </p>
                      <p className="text-xs text-gray-600">Neutral</p>
                    </div>
                    <div className="bg-destructive/10 p-2 rounded">
                      <p className="text-destructive font-medium text-lg">
                        {formatPercentage(analysis.sentimentAnalysis.overall.negative)}
                      </p>
                      <p className="text-xs text-gray-600">Negative</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Demographics Tab */}
            <TabsContent value="demographics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age Groups */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Age Groups</h3>
                  <div className="space-y-2">
                    {analysis.demographics.ageGroups.map((group, index) => (
                      <div key={index} className="bg-white p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span>{group.name}</span>
                          <span className="font-medium">{formatPercentage(group.percentage)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn("h-2 rounded-full", index % 3 === 0 ? "bg-primary" : index % 3 === 1 ? "bg-accent-orange" : "bg-accent-green")}
                            style={{ width: formatPercentage(group.percentage) }}
                          />
                        </div>
                        {renderSentimentBars(group.sentiment)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gender Distribution */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Gender Distribution</h3>
                  <div className="space-y-2">
                    {analysis.demographics.genderDistribution.map((group, index) => (
                      <div key={index} className="bg-white p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span>{group.name}</span>
                          <span className="font-medium">{formatPercentage(group.percentage)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn("h-2 rounded-full", index === 0 ? "bg-light-blue" : index === 1 ? "bg-accent-orange" : "bg-accent-green")}
                            style={{ width: formatPercentage(group.percentage) }}
                          />
                        </div>
                        {renderSentimentBars(group.sentiment)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Occupations */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Occupations</h3>
                  <div className="space-y-2">
                    {analysis.demographics.occupations.map((group, index) => (
                      <div key={index} className="bg-white p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span>{group.name}</span>
                          <span className="font-medium">{formatPercentage(group.percentage)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn("h-2 rounded-full bg-primary")}
                            style={{ width: formatPercentage(group.percentage) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">Interests</h3>
                  <div className="space-y-2">
                    {analysis.demographics.interests.map((group, index) => (
                      <div key={index} className="bg-white p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span>{group.name}</span>
                          <span className="font-medium">{formatPercentage(group.percentage)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={cn("h-2 rounded-full bg-accent-orange")}
                            style={{ width: formatPercentage(group.percentage) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Themes Tab */}
            <TabsContent value="themes" className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-3">Common Themes & Topics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.themes.map((theme, index) => (
                    <div key={index} className="bg-white p-4 border rounded-lg">
                      <h4 className="font-medium text-lg mb-2">{theme.theme}</h4>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-sm">
                          {theme.count} mentions
                        </span>
                        {renderSentimentBars(theme.sentiment)}
                      </div>

                      {theme.keywords && theme.keywords.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Related Keywords:</p>
                          <div className="flex flex-wrap gap-1">
                            {theme.keywords.map((keyword, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-4">
              <div className="bg-white border p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Actionable Recommendations</h3>
                <ol className="list-decimal list-inside space-y-3">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="pl-2 text-gray-800">{recommendation}</li>
                  ))}
                </ol>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button>
              Download Full Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
