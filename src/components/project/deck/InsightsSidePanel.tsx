// src/components/project/deck/InsightsSidePanel.tsx
'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Lightbulb, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { insights, Insight } from '@/mocks/insights';
import { DraggableInsightCard } from './DraggableInsightCard';

interface InsightsSidePanelProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const InsightsSidePanel: React.FC<InsightsSidePanelProps> = ({ 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('ai');
  
  const aiInsights = insights.filter(insight => insight.source === 'ai');
  const manualInsights = insights.filter(insight => insight.source === 'manual');

  return (
    <div 
      className={`border-l border-gray-200 bg-white transition-all duration-300 flex flex-col h-screen
        ${isCollapsed ? 'w-12' : 'w-96'}`}
    >
      {isCollapsed ? (
        <div className="p-3 flex justify-center">
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-full hover:bg-gray-100"
            title="Expand Insights Panel"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      ) : (
        <div className="p-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Insights</h2>
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-full hover:bg-gray-100"
            title="Collapse Insights Panel"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {!isCollapsed && (
        <>
          <div className="p-3">
            <p className="text-sm text-gray-600">
              Drag insights onto slides to add them to your notes
            </p>
          </div>
          
          <Tabs 
            defaultValue="ai" 
            value={selectedTab} 
            onValueChange={setSelectedTab}
            className="flex-1 flex flex-col"
          >
            <div className="px-3">
              <TabsList className="w-full">
                <TabsTrigger value="ai" className="flex-1 flex items-center justify-center">
                  <Sparkles size={16} className="mr-1.5" />
                  AI Insights
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex-1 flex items-center justify-center">
                  <Lightbulb size={16} className="mr-1.5" />
                  Team Insights
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent 
              value="ai" 
              className="flex-1 p-3 overflow-y-auto mt-0"
            >
              {aiInsights.length > 0 ? (
                <div className="space-y-3">
                  {aiInsights.map(insight => (
                    <DraggableInsightCard 
                      key={insight.id} 
                      insight={insight} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Sparkles size={24} className="mb-2" />
                  <p className="text-center">No AI insights available yet</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent 
              value="manual" 
              className="flex-1 p-3 overflow-y-auto mt-0"
            >
              {manualInsights.length > 0 ? (
                <div className="space-y-3">
                  {manualInsights.map(insight => (
                    <DraggableInsightCard 
                      key={insight.id} 
                      insight={insight} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Lightbulb size={24} className="mb-2" />
                  <p className="text-center">No team insights available yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};