// src/components/project/insights/QuickInsightButton.tsx
"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import QuickInsightModal from './QuickInsightModal';
import { Insight } from '@/mocks/insights';
import { AddInsightProps } from './ManualInsights';

interface QuickInsightButtonProps {
  onInsightAdd?: (insight: Omit<AddInsightProps, 'id' | 'timestamp' | 'lastEdited'>) => void;
}

export default function QuickInsightButton({ onInsightAdd }: QuickInsightButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInsightAdd = (content: string, category: Insight['category']) => {
    if (onInsightAdd) {
      onInsightAdd({
        content,
        category,
        source: 'manual',
        author: 'Current User',
      });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-105"
        aria-label="Add quick insight"
      >
        <Plus className="h-5 w-5 mr-1" />
        <span>Quick Insight</span>
      </button>

      <QuickInsightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleInsightAdd}
      />
    </>
  );
}
