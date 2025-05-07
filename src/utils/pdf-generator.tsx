// src/utils/pdf-generator.ts
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import type { Report } from '@/types/report';

// Define styles for PDF document
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

// Convert markdown content to a simpler format for PDF
const markdownToText = (md: string) =>
  md.replace(/#{1,6}\s/g, '')  // titres
    .replace(/\*\*/g, '')      // gras
    .replace(/- /g, '• ')      // listes
    .trim();

// Define props type explicitly
interface PDFDocumentProps {
  analysis: Report;
}

const flattenContent = (report: Report): string =>
  (report.sections ?? [])
    .map(({ heading, blocks }) => [
      `\n${heading}\n`,
      blocks
        .map(b => {
          if (b.type === 'paragraph') return markdownToText(b.text);
          if (b.type === 'list')      return b.items.map(markdownToText).join('\n');
          if (b.type === 'table')
            return b.rows.map(r => r.join(' | ')).join('\n');
          return '';
        })
        .join('\n')
    ].join(''))
    .join('\n\n');

// Create PDF document component
const PDFDocument: React.FC<PDFDocumentProps> = ({ analysis }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View>
        <Text style={pdfStyles.header}>{analysis.title}</Text>
      </View>

      <View style={pdfStyles.section}>
        <Text style={pdfStyles.text}>{flattenContent(analysis)}</Text>
      </View>
    </Page>
  </Document>
);

export const generatePDF = async (analysis: Report): Promise<void> => {
  try {
    const blob = await pdf(<PDFDocument analysis={analysis} />).toBlob();
    const url = URL.createObjectURL(blob);

    // Create link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${analysis.type}-${analysis.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
