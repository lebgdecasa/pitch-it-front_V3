// src/types/report.ts
export type Paragraph = { type: 'paragraph'; text: string };

export type BulletList = { type: 'list'; items: string[] };

export type Table = {
  type: 'table';
  headers: string[];
  rows: string[][];
};

/** One content block inside a section */
export type Block = Paragraph | BulletList | Table;

/** A section of a report (“Executive Summary”, “Findings”…). */
export interface Section {
  heading: string;
  blocks: Block[];
}

/** Whole analysis item (kt-004, fr-004 …) */
export interface Report {
  id: string;
  title: string;
  type: 'key-trend' | 'netnographic' | 'final-report';
  sections?: Section[];
  date: string; // ISO date string
  summary?: string; // short summary for the dashboard
  details?: string[];
}
