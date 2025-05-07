// src/mocks/publishing-data.ts
export interface FinancialDetails {
  revenueLastYear?: number;
  projectedRevenue?: number;
  burnRate?: number;
  runwayMonths?: number;
  previousFunding?: number;
}

export interface PublishingDraft {
  id: string;
  projectId: string;
  investmentSize: number;
  equityOffered: number;
  financialDetails: FinancialDetails;
  lastSaved: string;
  status: 'draft' | 'published';
}

export const mockPublishingDraft: PublishingDraft = {
  id: 'draft-001',
  projectId: 'proj-001',
  investmentSize: 500000,
  equityOffered: 10,
  financialDetails: {
    revenueLastYear: 100000,
    projectedRevenue: 500000,
    burnRate: 20000,
    runwayMonths: 12,
    previousFunding: 200000
  },
  lastSaved: new Date().toISOString(),
  status: 'draft'
};