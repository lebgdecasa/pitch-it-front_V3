// src/components/project/documents/FileGrid.tsx
'use client';

import React from 'react';
import { Globe, Lock, Download, Trash2, FileText, FileSpreadsheet, Film } from 'lucide-react';
import { Switch } from '../../../components/ui/switch';
import { Button } from '../../../components/ui/button';
import { type Document } from '../../../mocks/documents';
import { formatFileSize } from '../../../mocks/documents';

interface FileGridProps {
  documents: Document[];
  onToggleVisibility: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (document: Document) => void;
}

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'xlsx':
      return <FileSpreadsheet className="h-12 w-12 text-green-600" />;
    case 'pptx':
      return <Film className="h-12 w-12 text-orange-600" />;
    default:
      return <FileText className="h-12 w-12 text-blue-600" />;
  }
};

export const FileGrid: React.FC<FileGridProps> = ({
  documents,
  onToggleVisibility,
  onDelete,
  onDownload,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col items-center">
            {getFileIcon(doc.type)}
            <h3 className="mt-2 font-medium text-sm text-center line-clamp-1">
              {doc.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {formatFileSize(doc.size)}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Public to investors</span>
              <Switch
                checked={doc.isPublic}
                onCheckedChange={() => onToggleVisibility(doc.id)}
              />
            </div>

            <div className="flex items-center gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onDownload(doc)}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onDelete(doc.id)}
              >
                <Trash2 className="h-4 w-4 mr-1 text-red-500" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};