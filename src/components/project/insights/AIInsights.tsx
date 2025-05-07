// src/components/project/insights/AIInsights.tsx
"use client";

import React from 'react';
import { Card } from '@/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { insights, categoryIcons, categoryColors } from '../../../mocks/insights';
import { format } from 'date-fns';

export default function AIInsights() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const aiInsights = insights.filter(insight => insight.source === 'ai');

  const filteredInsights = selectedCategory === 'all'
    ? aiInsights
    : aiInsights.filter(insight => insight.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">AI-Generated Insights</h2>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="market">Market</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="product">Product</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredInsights.map(insight => (
          <Card key={insight.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>{categoryIcons[insight.category]}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[insight.category]}`}>
                    {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(insight.timestamp), 'MMM d, yyyy')}
                  </span>
                </div>
                <p className="text-sm">{insight.content}</p>
              </div>
              {insight.confidence && (
                <div className="flex items-center space-x-1">
                  <div className="text-xs font-medium text-muted-foreground">
                    Confidence
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium
                    ${insight.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                      insight.confidence >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {Math.round(insight.confidence * 100)}%
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
