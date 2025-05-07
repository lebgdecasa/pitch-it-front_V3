// src/components/project/insights/ManualInsights.tsx
"use client";

import React, { useState } from 'react';
import { Card } from '@/ui/card';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { insights, categoryIcons, categoryColors, Insight } from '../../../mocks/insights';
import { format } from 'date-fns';

export interface AddInsightProps {
  content: string;
  category: 'market' | 'customer' | 'product' | 'financial' | 'general';
  source: 'manual';
  author: string;
}

export default function ManualInsights() {
  const [manualInsights, setManualInsights] = useState(
    insights.filter(insight => insight.source === 'manual')
  );

  // Function to add insights from QuickInsightButton
  const addQuickInsight = (insightData: AddInsightProps) => {
    const newInsight: Insight = {
      id: Math.random().toString(36).substr(2, 9),
      content: insightData.content,
      category: insightData.category,
      source: insightData.source,
      timestamp: new Date().toISOString(),
      author: insightData.author,
      lastEdited: new Date().toISOString(),
    };
    setManualInsights(prev => [...prev, newInsight]);
  };

  // Expose method to the window for access from QuickInsightButton
  React.useEffect(() => {
    // @ts-ignore - Adding custom property to window
    window.addQuickInsight = addQuickInsight;

    return () => {
      // @ts-ignore - Cleanup
      delete window.addQuickInsight;
    };
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const [newInsight, setNewInsight] = useState<{
    content: string;
    category: 'market' | 'customer' | 'product' | 'financial' | 'general';
  }>({
    content: '',
    category: 'general',
  });

  const filteredInsights = selectedCategory === 'all'
    ? manualInsights
    : manualInsights.filter(insight => insight.category === selectedCategory);

  const handleSubmit = () => {
    if (editingInsight) {
      setManualInsights(prev =>
        prev.map(insight =>
          insight.id === editingInsight.id
            ? {
                ...insight,
                content: newInsight.content,
                category: newInsight.category,
                lastEdited: new Date().toISOString(),
              }
            : insight
        )
      );
    } else {
      const insight: Insight = {
        id: Math.random().toString(36).substr(2, 9),
        content: newInsight.content,
        category: newInsight.category,
        source: 'manual',
        timestamp: new Date().toISOString(),
        author: 'Current User',
        lastEdited: new Date().toISOString(),
      };
      setManualInsights(prev => [...prev, insight]);
    }
    setIsDialogOpen(false);
    setEditingInsight(null);
    setNewInsight({ content: '', category: 'general' });
  };

  const handleEdit = (insight: Insight) => {
    setEditingInsight(insight);
    setNewInsight({
      content: insight.content,
      category: insight.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this insight?')) {
      setManualInsights(prev => prev.filter(insight => insight.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manual Insights</h2>
        <div className="flex space-x-4">
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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingInsight(null);
                  setNewInsight({ content: '', category: 'general' });
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Insight
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingInsight ? 'Edit Insight' : 'Add New Insight'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter your insight..."
                  value={newInsight.content}
                  onChange={(e) =>
                    setNewInsight(prev => ({ ...prev, content: e.target.value }))
                  }
                  className="min-h-[100px]"
                />
                <Select
                  value={newInsight.category}
                  onValueChange={(value: any) =>
                    setNewInsight(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleSubmit}
                  disabled={!newInsight.content.trim()}
                  className="w-full"
                >
                  {editingInsight ? 'Save Changes' : 'Add Insight'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredInsights.map(insight => (
          <Card key={insight.id} className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>{categoryIcons[insight.category]}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[insight.category]}`}>
                    {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(insight.timestamp), 'MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(insight)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(insight.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <p className="text-sm">{insight.content}</p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>By {insight.author}</span>
                {insight.lastEdited && insight.lastEdited !== insight.timestamp && (
                  <span>• Edited {format(new Date(insight.lastEdited), 'MMM d, yyyy')}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
