// src/mocks/documents.ts
import { format } from 'date-fns';
import React from 'react';

export type Document = {
  status: string;
  id: string;
  name: string;
  type: string;
  size: number; // in bytes
  uploadDate: string;
  url: string;
  isPublic: boolean;
  canPreview?: boolean;
};

export const documents: Document[] = [
  {
    id: '1',
    name: 'Financial Projections 2024',
    type: 'xlsx',
    size: 2456789,
    uploadDate: format(new Date('2024-01-15'), 'yyyy-MM-dd'),
    url: '/documents/financial-projections-2024.xlsx',
    isPublic: false,
    canPreview: true,
    status: ''
  },
  {
    id: '2',
    name: 'Marketing Strategy',
    type: 'pdf',
    size: 3567890,
    uploadDate: format(new Date('2024-01-10'), 'yyyy-MM-dd'),
    url: '/documents/marketing-strategy.pdf',
    isPublic: true,
    canPreview: true,
    status: ''
  },
  {
    id: '3',
    name: 'Product Roadmap',
    type: 'pptx',
    size: 4567890,
    uploadDate: format(new Date('2024-01-05'), 'yyyy-MM-dd'),
    url: '/documents/product-roadmap.pptx',
    isPublic: false,
    canPreview: false,
    status: ''
  },
  {
    id: '4',
    name: 'Market Research',
    type: 'pdf',
    size: 5678901,
    uploadDate: format(new Date('2024-01-01'), 'yyyy-MM-dd'),
    url: '/documents/market-research.pdf',
    isPublic: true,
    canPreview: true,
    status: ''
  },
  {
    id: '5',
    name: 'Team Structure',
    type: 'docx',
    size: 1234567,
    uploadDate: format(new Date('2023-12-28'), 'yyyy-MM-dd'),
    url: '/documents/team-structure.docx',
    isPublic: false,
    canPreview: true,
    status: ''
  },
  {
    id: '6',
    name: 'Project Details V1',
    type: 'docx',
    size: 1234567,
    uploadDate: format(new Date('2023-12-28'), 'yyyy-MM-dd'),
    url: '/documents/archived-project-details-v1.docx',
    isPublic: false,
    canPreview: true,
    status: ''
  }
];

export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

export const getFileTypeIcon = (fileType: string): React.ReactNode => {
  // Return appropriate icon based on file type
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return '📄'; // Document icon for PDF
    case 'docx':
    case 'doc':
      return '📝'; // Text document icon
    case 'xlsx':
    case 'xls':
      return '📊'; // Spreadsheet icon
    case 'pptx':
    case 'ppt':
      return '📊'; // Presentation icon
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return '🖼️'; // Image icon
    case 'mp4':
    case 'mov':
    case 'avi':
      return '🎬'; // Video icon
    case 'mp3':
    case 'wav':
      return '🎵'; // Audio icon
    case 'zip':
    case 'rar':
      return '📦'; // Archive icon
    default:
      return '📄'; // Default document icon
  }
};
