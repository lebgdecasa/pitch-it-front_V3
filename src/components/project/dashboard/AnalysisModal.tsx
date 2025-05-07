// src/components/project/dashboard/AnalysisModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePDF } from '@/utils/pdf-generator';

import { analysisContent } from '@/mocks/analysis-content';
import ReportDisplay from './analysis/ReportDisplay';
import type { Report } from '@/types/report'; // <-- small list item on the dashboard

interface AnalysisModalProps {
  analysis: Report;   // { id, title, type, … } coming from analysis-data.ts
  isOpen: boolean;
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({
  analysis,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  // pull the rich report JSON once we have the id
  const report = analysisContent[analysis.id];

  const handleDownload = async () => {
    try {
      await generatePDF(analysis); // (unchanged – still uses the short card)
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      // TODO: toast notification
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{analysis.title}</h2>
          <div className="flex items-center gap-2">
            <Button onClick={handleDownload} variant="outline" size="sm">
              Download PDF
            </Button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* If, for some reason, the id isn’t in analysisContent, fall back gracefully */}
          {report ? (
            <ReportDisplay report={report} />
          ) : (
            <p className="text-gray-600">Detailed report not found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
