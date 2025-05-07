// src/app/project/[id]/publish/page.tsx
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import PublishingForm from '../../../../components/project/publishing/PublishingForm';
import DraftManager from '../../../../components/project/publishing/DraftManager';
import { mockPublishingDraft, PublishingDraft } from '../../../../mocks/publishing-data';

export default function PublishPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [draft, setDraft] = useState<PublishingDraft>(mockPublishingDraft);

  const handleSave = async (updatedDraft: PublishingDraft) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDraft({
      ...updatedDraft,
      lastSaved: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DraftManager
        draft={draft}
        onSave={handleSave}
        projectId={projectId}
      />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Publish to Investors</h1>
          <p className="text-gray-500">
            Complete the investment details below. Your draft will be automatically saved as you make changes.
          </p>
        </div>

        <PublishingForm
          draft={draft}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}