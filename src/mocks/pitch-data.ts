// Mock data for Virtual VC pitching feature
import { v4 as uuidv4 } from 'uuid';

// VC personas for pitch sessions
export const vcPersonas = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'investor',
    specialty: 'SaaS & Enterprise Software',
    avatarUrl: '/assets/avatars/vc-1.png',
    description: 'Former CTO turned VC. Focuses on technical scalability and product-market fit. Asks direct questions about technology stack and security.',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'investor',
    specialty: 'Consumer Tech & D2C',
    avatarUrl: '/assets/avatars/vc-2.png',
    description: 'Early-stage investor with background in marketing. Values strong branding and customer acquisition strategies.',
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'investor',
    specialty: 'Fintech & Blockchain',
    avatarUrl: '/assets/avatars/vc-3.png',
    description: 'Specialized in fintech and blockchain investments. Emphasizes regulatory compliance and monetization strategies.',
  },
  {
    id: '4',
    name: 'Jessica Lee',
    role: 'investor',
    specialty: 'Healthcare & Biotech',
    avatarUrl: '/assets/avatars/vc-4.png',
    description: 'MD/PhD with deep healthcare industry knowledge. Focuses on clinical validation and regulatory pathways.',
  },
  {
    id: '5',
    name: 'David Wilson',
    role: 'investor',
    specialty: 'Climate Tech & Sustainability',
    avatarUrl: '/assets/avatars/vc-5.png',
    description: 'Impact investor focused on sustainability. Looks for scalable solutions with positive environmental impact.',
  }
];

// Mock pitch conversation topics
export const mockPitchTopics = [
  'Introduction',
  'Problem',
  'Solution',
  'Market Size',
  'Business Model',
  'Competition',
  'Traction',
  'Team',
  'Financials',
  'Ask'
];

// Mock investor messages for the pitch conversation
export const mockPitchMessages = [
  {
    id: uuidv4(),
    role: 'investor',
    content: "Thanks for joining today. I'm looking forward to hearing about your startup. Why don't you start by telling me what problem you're solving?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "That's an interesting problem. How large is this market opportunity? Do you have any data on the total addressable market?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "Let's talk about your solution. What makes your approach unique compared to existing alternatives?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "I'd like to understand your business model better. How do you monetize, and what are your pricing tiers?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "Who are your main competitors, and how are you positioned against them?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "Can you share some traction metrics? What kind of growth have you seen in users or revenue?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "Tell me about your team. What makes your founding team uniquely qualified to solve this problem?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "What are your key financial projections for the next 3 years? What assumptions are these based on?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "How much are you raising in this round, and how will you allocate the funds?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "What's your customer acquisition strategy? And what's your current CAC to LTV ratio?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "That's helpful. Now, I'm curious about your go-to-market strategy. How do you plan to scale beyond your current users?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "Interesting. One concern I have is about your pricing strategy. Have you tested different price points with customers?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "What keeps you up at night? What's the biggest risk to your business that you're currently facing?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "Let's talk about your tech stack. What are you using, and how scalable is your infrastructure?",
  },
  {
    id: uuidv4(),
    role: 'investor',
    content: "Thanks for sharing all this information. I have a clearer picture of your business now. Let me think about this and I'll provide some feedback.",
  }
];

// Mock pitch session results
export const mockPitchResults = {
  overallScore: 83,
  categoricalScores: {
    clarity: 85,
    structure: 78,
    delivery: 72,
    content: 87
  },
  strengths: [
    'Clear problem statement and target market',
    'Strong understanding of business model',
    'Good presentation of competitive advantages',
  ],
  improvements: [
    'Could provide more specific metrics on traction',
    'Financial projections need more detail',
    'Consider addressing customer acquisition costs more explicitly'
  ],
  recommendations: [
    'Add specific metrics to demonstrate traction and growth',
    'Refine financial projections with more detailed assumptions',
    'Practice responding to challenging questions about market dynamics'
  ]
};