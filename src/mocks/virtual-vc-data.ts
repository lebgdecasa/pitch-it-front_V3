// Mock data for Virtual VC interactions
export interface InvestorArchetype {
  id: string;
  name: string;
  title: string;
  avatar: string;
  style: string; // Tough, Friendly, Analytical, etc.
  preferredStages: string[];
  preferredIndustries: string[];
  bio: string;
  questions: VCQuestion[];
}

export interface VCQuestion {
  id: string;
  text: string;
  category: 'vision' | 'product' | 'market' | 'business' | 'team' | 'investment';
  expectedTopics: string[]; // Keywords that should be covered
  timeAllocation: number; // In seconds
}

export interface PitchFeedback {
  score: number;
  feedback: string[];
}

export interface PitchAssessment {
  score: number;
  content: PitchFeedback;
  delivery: PitchFeedback;
  behavior: PitchFeedback;
  videoUrl?: string;
  timestamp: string;
}

export const mockInvestors: InvestorArchetype[] = [
  {
    id: 'inv-001',
    name: 'Alex Morgan',
    title: 'Partner at Sequoia Capital',
    avatar: '/assets/investors/investor1.jpg',
    style: 'Analytical',
    preferredStages: ['seed', 'series-a'],
    preferredIndustries: ['tech', 'ai', 'saas', 'fintech'],
    bio: 'Alex is known for her deep technical due diligence and focus on product-market fit. She prefers data-driven founders who can clearly articulate their competitive advantages.',
    questions: [
      {
        id: 'q1',
        text: 'What specifically about your product gives you an unfair advantage over competitors?',
        category: 'product',
        expectedTopics: ['unique technology', 'patents', 'proprietary algorithms', 'network effects'],
        timeAllocation: 90
      },
      {
        id: 'q2',
        text: 'Can you walk me through your unit economics and how they improve at scale?',
        category: 'business',
        expectedTopics: ['cost structure', 'margins', 'economies of scale', 'pricing strategy'],
        timeAllocation: 120
      },
      {
        id: 'q3',
        text: 'What metrics do you track obsessively and why those specific ones?',
        category: 'business',
        expectedTopics: ['key performance indicators', 'growth metrics', 'customer acquisition cost', 'lifetime value'],
        timeAllocation: 90
      },
      {
        id: 'q4',
        text: 'Why is now the right time for this product and this market?',
        category: 'market',
        expectedTopics: ['market timing', 'market readiness', 'technology enablement', 'regulatory changes'],
        timeAllocation: 90
      }
    ]
  },
  {
    id: 'inv-002',
    name: 'Marcus Chen',
    title: 'Managing Director at Andreessen Horowitz',
    avatar: '/assets/investors/investor2.jpg',
    style: 'Tough',
    preferredStages: ['series-a', 'series-b'],
    preferredIndustries: ['fintech', 'blockchain', 'enterprise', 'cybersecurity'],
    bio: 'Marcus is known for his challenging questioning style and deep industry knowledge. He looks for founders who remain composed under pressure and have thought through all aspects of their business.',
    questions: [
      {
        id: 'q1',
        text: 'What\'s the biggest risk to your business that keeps you up at night?',
        category: 'vision',
        expectedTopics: ['competition', 'execution risks', 'market adoption', 'regulatory challenges'],
        timeAllocation: 90
      },
      {
        id: 'q2',
        text: 'If a big tech company decided to build your exact product tomorrow, what would you do?',
        category: 'market',
        expectedTopics: ['differentiation strategy', 'moat', 'agility advantages', 'customer loyalty'],
        timeAllocation: 120
      },
      {
        id: 'q3',
        text: 'Why is your founding team uniquely positioned to solve this problem?',
        category: 'team',
        expectedTopics: ['domain expertise', 'past experiences', 'unique insights', 'complementary skills'],
        timeAllocation: 90
      },
      {
        id: 'q4',
        text: 'What are your assumptions about customer acquisition costs and how have you validated them?',
        category: 'business',
        expectedTopics: ['customer acquisition channels', 'marketing experiments', 'sales strategy', 'conversion metrics'],
        timeAllocation: 120
      }
    ]
  },
  {
    id: 'inv-003',
    name: 'Samira Patel',
    title: 'General Partner at First Round Capital',
    avatar: '/assets/investors/investor3.jpg',
    style: 'Friendly',
    preferredStages: ['pre-seed', 'seed'],
    preferredIndustries: ['consumer', 'health', 'edtech', 'marketplace'],
    bio: 'Samira specializes in early-stage consumer startups. She has a collaborative approach and focuses on founder-market fit and vision alignment.',
    questions: [
      {
        id: 'q1',
        text: 'What inspired you to start this company? What\'s your personal connection to the problem?',
        category: 'vision',
        expectedTopics: ['founder story', 'motivation', 'personal connection', 'mission'],
        timeAllocation: 90
      },
      {
        id: 'q2',
        text: 'How are you thinking about building your company culture as you scale?',
        category: 'team',
        expectedTopics: ['values', 'hiring philosophy', 'remote work', 'team development'],
        timeAllocation: 90
      },
      {
        id: 'q3',
        text: 'How does your product create genuine emotional connections with users?',
        category: 'product',
        expectedTopics: ['user experience', 'brand loyalty', 'engagement metrics', 'customer stories'],
        timeAllocation: 90
      },
      {
        id: 'q4',
        text: 'What early signals have you seen that give you confidence in product-market fit?',
        category: 'market',
        expectedTopics: ['user feedback', 'retention', 'organic growth', 'NPS score'],
        timeAllocation: 90
      }
    ]
  }
];

export const mockAssessment: PitchAssessment = {
  score: 7.5,
  content: {
    score: 8,
    feedback: [
      'Strong clarity in business model explanation',
      'Well-articulated value proposition',
      'Good competitive analysis',
      'Could provide more detail on go-to-market strategy'
    ]
  },
  delivery: {
    score: 7,
    feedback: [
      'Clear and confident speaking style',
      'Good pacing throughout most of the pitch',
      'Maintained good eye contact',
      'Consider using more dynamic vocal modulation'
    ]
  },
  behavior: {
    score: 7.5,
    feedback: [
      'Responded thoughtfully to challenging questions',
      'Demonstrated domain expertise',
      'Good active listening',
      'Could improve on conciseness in some answers'
    ]
  },
  timestamp: new Date().toISOString()
};

// Demo AI VC feedback phrases
export const realtimeFeedbackPhrases = {
  positive: [
    "Good point",
    "Well explained",
    "Strong argument",
    "Clear example",
    "Compelling data",
    "Nice specificity",
    "Great energy"
  ],
  negative: [
    "Unclear explanation",
    "Needs more data",
    "Too general",
    "Consider rephrasing",
    "Vague response",
    "Missing key points",
    "Low energy"
  ]
};

export const commonPitchQuestions = [
  {
    id: 'common-q1',
    text: 'Tell me about your company in one sentence.',
    category: 'vision',
    expectedTopics: ['elevator pitch', 'clarity', 'conciseness', 'value proposition'],
    timeAllocation: 30
  },
  {
    id: 'common-q2',
    text: 'What problem are you solving and for whom?',
    category: 'vision',
    expectedTopics: ['problem statement', 'target audience', 'pain points', 'market need'],
    timeAllocation: 60
  },
  {
    id: 'common-q3',
    text: 'How big is your target market and how fast is it growing?',
    category: 'market',
    expectedTopics: ['market size', 'TAM SAM SOM', 'growth rate', 'market trends'],
    timeAllocation: 60
  },
  {
    id: 'common-q4',
    text: 'Who are your competitors and how are you different?',
    category: 'market',
    expectedTopics: ['competitive landscape', 'differentiation', 'unique selling proposition', 'moat'],
    timeAllocation: 90
  },
  {
    id: 'common-q5',
    text: 'How do you make money? What\'s your business model?',
    category: 'business',
    expectedTopics: ['revenue model', 'pricing strategy', 'customer acquisition', 'unit economics'],
    timeAllocation: 90
  }
];
