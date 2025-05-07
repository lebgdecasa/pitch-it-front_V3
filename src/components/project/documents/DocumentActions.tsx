// src/components/project/documents/DocumentActions.tsx
"use client";

import React from 'react';
import { Eye, Download, Trash2, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
import { Document } from '../../../mocks/documents';

interface DocumentActionsProps {
  document: Document;
  onPreview?: (document: Document) => void;
  onDownload?: (document: Document) => void;
  onDelete?: (documentId: string) => void;
  onShare?: (document: Document) => void;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({
  document,
  onPreview,
  onDownload,
  onDelete,
  onShare,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {document.canPreview && (
          <DropdownMenuItem onClick={() => onPreview?.(document)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => onDownload?.(document)}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </DropdownMenuItem>
        {document.isPublic && (
          <DropdownMenuItem onClick={() => onShare?.(document)}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Share Link
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => onDelete?.(document.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DocumentActions;
