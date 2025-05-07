// src/mocks/pitch-deck.ts
export interface Slide {
  id: string;
  type: 'title' | 'problem' | 'solution' | 'market' | 'business' | 'team' | 'financials' | 'contact';
  title: string;
  content: {
    heading?: string;
    subheading?: string;
    bullets?: string[];
    image?: string;
    text?: string;
  };
}

export interface EditHistory {
  timestamp: string;
  editor: string;
  changes: string;
}

export interface PitchDeck {
  id: string;
  name: string;
  projectId: string;
  slides: Slide[];
  editHistory: EditHistory[];
  lastModified: string;
  version: number;
}

export const defaultTemplates: Record<Slide['type'], Omit<Slide, 'id'>> = {
  title: {
    type: 'title',
    title: 'Title Slide',
    content: {
      heading: '[Company Name]',
      subheading: 'Transforming [Industry] Through Innovation',
    }
  },
  problem: {
    type: 'problem',
    title: 'The Problem',
    content: {
      heading: 'Market Challenge',
      bullets: [
        'Current industry pain point',
        'Impact on customers',
        'Market gap analysis'
      ]
    }
  },
  solution: {
    type: 'solution',
    title: 'Our Solution',
    content: {
      heading: 'Innovative Approach',
      bullets: [
        'Key features and benefits',
        'Competitive advantage',
        'Technology overview'
      ]
    }
  },
  market: {
    type: 'market',
    title: 'Market Opportunity',
    content: {
      heading: 'Total Addressable Market',
      bullets: [
        'Market size and growth',
        'Target segments',
        'Market trends'
      ]
    }
  },
  business: {
    type: 'business',
    title: 'Business Model',
    content: {
      heading: 'Revenue Strategy',
      bullets: [
        'Revenue streams',
        'Pricing strategy',
        'Growth plan'
      ]
    }
  },
  team: {
    type: 'team',
    title: 'Our Team',
    content: {
      heading: 'Leadership',
      bullets: [
        'Key team members',
        'Advisory board',
        'Strategic partners'
      ]
    }
  },
  financials: {
    type: 'financials',
    title: 'Financial Overview',
    content: {
      heading: 'Key Metrics',
      bullets: [
        'Revenue projections',
        'Cost structure',
        'Funding requirements'
      ]
    }
  },
  contact: {
    type: 'contact',
    title: 'Contact',
    content: {
      heading: 'Get in Touch',
      text: 'Contact information and next steps'
    }
  }
};

export const mockPitchDeck: PitchDeck = {
  id: '1',
  name: 'Company Pitch Deck',
  projectId: 'project-1',
  slides: Object.entries(defaultTemplates).map(([_, template], index) => ({
    id: `slide-${index + 1}`,
    ...template
  })),
  editHistory: [
    {
      timestamp: '2024-01-20T10:00:00Z',
      editor: 'System',
      changes: 'Initial deck generated'
    }
  ],
  lastModified: '2024-01-20T10:00:00Z',
  version: 1
};

export const generateDeck = (projectId: string, projectName: string): PitchDeck => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `${projectName} Pitch Deck`,
    projectId,
    slides: Object.entries(defaultTemplates).map(([_, template], index) => ({
      id: `slide-${index + 1}`,
      ...template
    })),
    editHistory: [
      {
        timestamp: new Date().toISOString(),
        editor: 'System',
        changes: 'Initial deck generated'
      }
    ],
    lastModified: new Date().toISOString(),
    version: 1
  };
};