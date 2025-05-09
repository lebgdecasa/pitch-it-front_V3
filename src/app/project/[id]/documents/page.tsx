// src/app/project/[id]/documents/page.tsx
'use client';

import React, { useState } from 'react';
import { PlusCircle, Download, Eye, Trash2, Globe, Lock, LayoutGrid, Table as TableIcon } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { DataTable } from '../../../../components/ui/table';
import { documents, formatFileSize, type Document } from '../../../../mocks/documents';
import { FileUpload } from '../../../../components/project/documents/FileUpload';
import { FileGrid } from '../../../../components/project/documents/FileGrid';
import { cn } from '../../../../lib/utils';

const DocumentsPage = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [documentsList, setDocumentsList] = useState<Document[]>(documents);

  const handleUpload = (files: File[]) => {
    const newDocuments: Document[] = files.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      type: file.name.split('.').pop() || '',
      size: file.size,
      uploadDate: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(file),
      isPublic: false,
      status: 'uploaded', // Add a default status
    }));

    setDocumentsList(prev => [...newDocuments, ...prev]);
  };

  const handleToggleVisibility = (id: string) => {
    setDocumentsList(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, isPublic: !doc.isPublic } : doc
      )
    );
  };

  const handleDelete = (id: string) => {
    setDocumentsList(prev => prev.filter(doc => doc.id !== id));
  };

  const handleDownload = (document: Document) => {
    window.open(document.url, '_blank');
  };

  const columns = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      id: 'type',
      header: 'Type',
      accessorKey: 'type',
      sortable: true,
      cell: ({ row }: { row: any }) => (
        <span className="uppercase">{row.original.type}</span>
      ),
    },
    {
      id: 'size',
      header: 'Size',
      accessorKey: 'size',
      sortable: true,
      cell: ({ row }: { row: any }) => (
        <span>{formatFileSize(row.original.size)}</span>
      ),
    },
    {
      id: 'uploadDate',
      header: 'Upload Date',
      accessorKey: 'uploadDate',
      sortable: true,
    },
    {
      id: 'visibility',
      header: 'Visibility',
      accessorKey: 'isPublic',
      cell: ({ row }: { row: any }) => (
        <div className={cn(
          "flex items-center gap-1",
          row.original.isPublic ? "text-green-600" : "text-gray-600"
        )}>
          {row.original.isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          <span>{row.original.isPublic ? 'Public' : 'Private'}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(row.original.url, '_blank')}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDownload(row.original)}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="px-3"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              className="px-3"
              onClick={() => setViewMode('table')}
            >
              <TableIcon className="w-4 h-4 mr-2" />
              Table
            </Button>
          </div>
          <Button onClick={() => setShowUpload(true)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        {viewMode === 'grid' ? (
          <FileGrid
            documents={documentsList}
            onToggleVisibility={handleToggleVisibility}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        ) : (
          <DataTable
            data={documentsList}
            columns={columns}
            getRowId={(row: Document) => row.id}
            selectable
            onSelectionChange={setSelectedDocuments}
          />
        )}
      </div>

      {selectedDocuments.length > 0 && viewMode === 'table' && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">
            {selectedDocuments.length} document{selectedDocuments.length > 1 ? 's' : ''} selected
          </span>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Selected
          </Button>
          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}

      {showUpload && (
        <FileUpload
          onUpload={handleUpload}
          onClose={() => setShowUpload(false)}
        />
      )}
    </div>
  );
};

export default DocumentsPage;
