// src/components/project/documents/DocumentList.tsx
"use client";

import React from 'react';
import { format } from 'date-fns';
import { Eye, EyeOff, Download, Trash2 } from 'lucide-react';
import { Switch } from '../../../components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Document, formatFileSize, getFileTypeIcon } from '../../../mocks/documents';

interface DocumentListProps {
  documents: Document[];
  onToggleVisibility?: (documentId: string) => void;
  onDelete?: (documentId: string) => void;
  onDownload?: (document: Document) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onToggleVisibility,
  onDelete,
  onDownload,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Uploaded</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <span>{getFileTypeIcon(doc.type)}</span>
                  <span className="truncate">{doc.name}</span>
                </div>
              </TableCell>
              <TableCell>{formatFileSize(doc.size)}</TableCell>
              <TableCell>{format(new Date(doc.uploadDate), 'MMM d, yyyy')}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {doc.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  <Switch
                    checked={doc.isPublic}
                    onCheckedChange={() => onToggleVisibility?.(doc.id)}
                    aria-label="Toggle visibility"
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload?.(doc)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete?.(doc.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentList;
