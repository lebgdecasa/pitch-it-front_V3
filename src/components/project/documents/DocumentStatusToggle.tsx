// src/components/project/documents/DocumentStatusToggle.tsx
"use client";

import React from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Switch } from '../../../components/ui/switch';
import { Document } from '../../../mocks/documents';

interface DocumentStatusToggleProps {
  document: Document;
  onToggleVisibility: (documentId: string) => void;
}

export const DocumentStatusToggle: React.FC<DocumentStatusToggleProps> = ({
  document,
  onToggleVisibility,
}) => {
  const handleToggle = () => {
    if (document.status === 'processing') return;
    onToggleVisibility(document.id);
  };

  return (
    <div className="flex items-center space-x-2">
      {document.status === 'processing' ? (
        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
      ) : document.isPublic ? (
        <Eye className="h-4 w-4 text-green-500" />
      ) : (
        <EyeOff className="h-4 w-4 text-gray-500" />
      )}
      <Switch
        checked={document.isPublic}
        onCheckedChange={handleToggle}
        disabled={document.status === 'processing'}
        aria-label="Toggle document visibility"
      />
      <span className="text-sm text-gray-500">
        {document.status === 'processing'
          ? 'Processing...'
          : document.isPublic
          ? 'Public'
          : 'Private'}
      </span>
    </div>
  );
};

export default DocumentStatusToggle;