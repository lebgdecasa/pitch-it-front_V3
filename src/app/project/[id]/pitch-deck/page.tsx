// src/app/project/[id]/pitch-deck/page.tsx
"use client";

import React from 'react';
import DeckEditor from '../../../../components/project/pitch-deck/DeckEditor';
import InsightsPanel from '../../../../components/project/pitch-deck/InsightsPanel';
import { Card } from '@/ui/card';
import { mockPitchDeck } from '../../../../mocks/pitch-deck';

export default function PitchDeckPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <Card className="p-6">
            <DeckEditor deck={mockPitchDeck} />
          </Card>
        </div>
        <div className="w-80">
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
}
