// src/components/project/pitch-deck/InsightsPanel.tsx
"use client";

import React, { useState } from 'react';
import { Card } from '@/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '../../../components/ui/button';
import { ChevronDown, ChevronUp, Sparkles, PencilLine } from 'lucide-react';
import { insights } from '../../../mocks/insights';

export default function InsightsPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const aiInsights = insights.filter(insight => insight.source === 'ai');
  const manualInsights = insights.filter(insight => insight.source === 'manual');

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white border rounded-lg"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-4"
        >
          <span className="font-semibold">Insights Panel</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="px-4 pb-4">
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium">AI Insights</h3>
            </div>
            <div className="space-y-2">
              {aiInsights.map(insight => (
                <Card key={insight.id} className="p-3">
                  <p className="text-sm">{insight.content}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      bg-blue-100 text-blue-800`}>
                      {insight.category}
                    </span>
                    {insight.confidence && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${insight.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                          insight.confidence >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {Math.round(insight.confidence * 100)}% confidence
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <PencilLine className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium">Manual Insights</h3>
            </div>
            <div className="space-y-2">
              {manualInsights.map(insight => (
                <Card key={insight.id} className="p-3">
                  <p className="text-sm">{insight.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      bg-purple-100 text-purple-800`}>
                      {insight.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      by {insight.author}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
