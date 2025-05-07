// src/components/project/publishing/DraftManager.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { PublishingDraft } from '../../../mocks/publishing-data';

interface DraftManagerProps {
  draft: PublishingDraft;
  onSave: (draft: PublishingDraft) => void;
  projectId: string;
}

export default function DraftManager({ draft, onSave, projectId }: DraftManagerProps) {
  const router = useRouter();
  const [lastSaved, setLastSaved] = useState(draft.lastSaved);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  useEffect(() => {
    if (draft.lastSaved !== lastSaved) {
      setLastSaved(draft.lastSaved);
      setSaveStatus('saved');
    }
  }, [draft.lastSaved, lastSaved]);

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      await onSave(draft);
      setSaveStatus('saved');
    } catch (error) {
      setSaveStatus('error');
      console.error('Failed to save draft:', error);
    }
  };

  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'error':
        return 'Error saving';
      default:
        return `Last saved: ${new Date(lastSaved).toLocaleString()}`;
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b p-4 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project
          </Button>

          <div className="flex items-center space-x-2">
            <span className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </span>

            <Button
              variant="outline"
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>

            <Button
              variant="default"
              onClick={() => router.push(`/project/${projectId}/preview`)}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}