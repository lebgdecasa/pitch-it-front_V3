// src/mocks/insights.ts
export interface Insight {
  id: string;
  content: string;
  source: 'ai' | 'manual';
  category: 'market' | 'customer' | 'product' | 'financial' | 'general';
  timestamp: string;
  confidence?: number; // For AI insights
  author?: string; // For manual insights
  lastEdited?: string; // For manual insights
}

export const insights: Insight[] = [
  {
    id: '1',
    content: 'Based on customer interaction patterns, users aged 25-34 show 40% higher engagement with the product features compared to other age groups.',
    source: 'ai',
    category: 'customer',
    timestamp: '2024-01-20T14:30:00Z',
    confidence: 0.89
  },
  {
    id: '2',
    content: 'Market analysis indicates a growing trend in sustainable product alternatives, suggesting potential opportunities for eco-friendly feature development.',
    source: 'ai',
    category: 'market',
    timestamp: '2024-01-19T09:15:00Z',
    confidence: 0.92
  },
  {
    id: '3',
    content: 'Financial metrics show customer acquisition costs could be reduced by 15% through optimization of digital marketing channels.',
    source: 'ai',
    category: 'financial',
    timestamp: '2024-01-18T16:45:00Z',
    confidence: 0.85
  },
  {
    id: '4',
    content: 'Customer feedback suggests adding a dark mode feature would significantly improve user experience during evening usage.',
    source: 'manual',
    category: 'product',
    timestamp: '2024-01-17T11:20:00Z',
    author: 'Sarah Chen',
    lastEdited: '2024-01-17T11:20:00Z'
  },
  {
    id: '5',
    content: 'Weekly team review identified potential partnership opportunities with complementary service providers.',
    source: 'manual',
    category: 'market',
    timestamp: '2024-01-16T13:40:00Z',
    author: 'Marcus Rodriguez',
    lastEdited: '2024-01-16T15:20:00Z'
  }
];

export const categoryIcons = {
  market: '📊',
  customer: '👥',
  product: '⚙️',
  financial: '💰',
  general: '📝'
};

export const categoryColors = {
  market: 'bg-blue-100 text-blue-800',
  customer: 'bg-green-100 text-green-800',
  product: 'bg-purple-100 text-purple-800',
  financial: 'bg-amber-100 text-amber-800',
  general: 'bg-gray-100 text-gray-800'
};