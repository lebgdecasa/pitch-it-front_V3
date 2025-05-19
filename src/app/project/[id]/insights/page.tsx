// src/app/project/[id]/insights/page.tsx
"use client";

import React from 'react';
import AIInsights from '../../../../components/project/insights/AIInsights';
import ManualInsights from '../../../../components/project/insights/ManualInsights';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { Sparkles, PencilLine } from 'lucide-react';

export default function InsightsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Project Memories</h1>

      <Tabs defaultValue="ai" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI Memories
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <PencilLine className="h-4 w-4" />
            Manual Memories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-4">
          <AIInsights />
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <ManualInsights />
        </TabsContent>
      </Tabs>
    </div>
  );
}
