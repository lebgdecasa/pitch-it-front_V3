// src/components/project/deck/DraggableInsightCard.tsx
'use client';

import React from 'react';
import { useDrag } from 'react-dnd';
import { Insight, categoryIcons, categoryColors } from '@/mocks/insights';
import { format } from 'date-fns';

interface DraggableInsightCardProps {
  insight: Insight;
}

export const DraggableInsightCard: React.FC<DraggableInsightCardProps> = ({ insight }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'INSIGHT',
    item: { insightContent: insight.content, insightId: insight.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const formattedDate = new Date(insight.timestamp);

  return (
    <div
      ref={(node) => { drag(node); }}
      className={`
        border rounded-md p-3 bg-white shadow-sm cursor-move
        transition-opacity hover:border-blue-400 hover:shadow
        ${isDragging ? 'opacity-50' : 'opacity-100'}
      `}
      style={{ touchAction: 'none' }}
    >
      <div className="flex justify-between items-start">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${categoryColors[insight.category]}`}
        >
          <span className="mr-1">{categoryIcons[insight.category]}</span>
          {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
        </span>

        <span className="text-xs text-gray-500">
          {format(formattedDate, 'MMM d')}
        </span>
      </div>

      <p className="text-sm mt-2 text-gray-800">{insight.content}</p>

      <div className="mt-2 flex items-center text-xs text-gray-500">
        {insight.source === 'ai' ? (
          <div className="flex items-center">
            <span className="font-medium">AI</span>
            <span className="mx-1">•</span>
            <span>Confidence: {Math.round(insight.confidence! * 100)}%</span>
          </div>
        ) : (
          <div className="flex items-center">
            <span>Added by {insight.author}</span>
          </div>
        )}
      </div>
    </div>
  );
};
