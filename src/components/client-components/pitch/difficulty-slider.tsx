"use client";

import React, { useState } from 'react';
import { Slider } from '../../../ui/slider';

interface DifficultySliderProps {
  difficulty: number;
  onChange: (value: number) => void;
}

export default function DifficultySlider({ difficulty, onChange }: DifficultySliderProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const getDifficultyLabel = (value: number) => {
    if (value < 25) return 'Supportive';
    if (value < 50) return 'Balanced';
    if (value < 75) return 'Challenging';
    return 'Aggressive';
  };

  const getDifficultyDescription = (value: number) => {
    if (value < 25) return 'Friendly conversation focused on helping you improve';
    if (value < 50) return 'Mix of supportive feedback with occasional tough questions';
    if (value < 75) return 'Pointed questions that challenge your assumptions';
    return 'Hard-hitting questions similar to what you\'d face with critical VCs';
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Supportive</span>
          <span className="text-sm font-medium">
            {getDifficultyLabel(hoveredValue ?? difficulty)}
          </span>
          <span className="text-sm text-gray-500">Aggressive</span>
        </div>
        <Slider
          value={[difficulty]}
          min={0}
          max={100}
          step={1}
          onValueChange={(vals: number[]) => onChange(vals[0])}
          onValueCommit={(vals: number[]) => onChange(vals[0])}
          onMouseMove={(e: { currentTarget: any; clientX: number; }) => {
            const slider = e.currentTarget;
            const rect = slider.getBoundingClientRect();
            const percentage = (e.clientX - rect.left) / rect.width;
            setHoveredValue(Math.max(0, Math.min(100, Math.round(percentage * 100))));
          }}
          onMouseLeave={() => setHoveredValue(null)}
          className="h-2"
        />
      </div>
      <div className="bg-purple-50 p-3 rounded border border-purple-100">
        <p className="text-sm text-purple-700">
          {getDifficultyDescription(hoveredValue ?? difficulty)}
        </p>
      </div>
    </div>
  );
}
