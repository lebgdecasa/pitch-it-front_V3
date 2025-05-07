// Mock data for Real-World Pulse feature
import { uniqueId } from 'lodash';

// Types for pulse data
type PulseStatus = 'pending' | 'recruiting' | 'in_progress' | 'analyzing' | 'complete' | 'error';

type Sentiment = 'positive' | 'neutral' | 'negative';

interface PulseReportData {
  userScore: number;
  sentimentCloud: { text: string; value: number; sentiment: Sentiment }[];
  userQuotes: { text: string; userName: string; persona: string; sentiment: Sentiment }[];
  painPoints: { category: string; count: number; importance: number }[];
  recommendations: string[];
  participantDemographics: { label: string; value: number }[];
}

// Mock data based on project ID
export const getPulseReportData = (projectId: string): PulseReportData => {
  // Different data variations based on projectId's last character to create variety
  const idVariant = parseInt(projectId.slice(-1), 16) % 4;
  
  // Base score varies by project
  const baseScore = 6 + (idVariant * 0.8);
  
  // Common word cloud terms with different sentiments
  const commonTerms = [
    { text: 'Innovative', value: 45, sentiment: 'positive' as Sentiment },
    { text: 'Intuitive', value: 40, sentiment: 'positive' as Sentiment },
    { text: 'Expensive', value: 30, sentiment: 'negative' as Sentiment },
    { text: 'Useful', value: 38, sentiment: 'positive' as Sentiment },
    { text: 'Confusing', value: 28, sentiment: 'negative' as Sentiment },
    { text: 'Reliable', value: 35, sentiment: 'positive' as Sentiment },
    { text: 'Slow', value: 25, sentiment: 'negative' as Sentiment },
    { text: 'User-friendly', value: 42, sentiment: 'positive' as Sentiment },
    { text: 'Complex', value: 22, sentiment: 'neutral' as Sentiment },
    { text: 'Helpful', value: 36, sentiment: 'positive' as Sentiment },
    { text: 'Basic', value: 20, sentiment: 'neutral' as Sentiment },
    { text: 'Buggy', value: 18, sentiment: 'negative' as Sentiment },
    { text: 'Clean', value: 32, sentiment: 'positive' as Sentiment },
    { text: 'Practical', value: 30, sentiment: 'positive' as Sentiment },
    { text: 'Overpriced', value: 26, sentiment: 'negative' as Sentiment }
  ];
  
  // Project-specific terms based on variant
  const projectTerms: Record<number, { text: string; value: number; sentiment: Sentiment }[]> = {
    0: [
      { text: 'Time-saving', value: 48, sentiment: 'positive' },
      { text: 'Enterprise', value: 30, sentiment: 'neutral' },
      { text: 'Integration', value: 35, sentiment: 'positive' },
      { text: 'Learning curve', value: 28, sentiment: 'negative' },
      { text: 'Professional', value: 38, sentiment: 'positive' }
    ],
    1: [
      { text: 'Sustainable', value: 50, sentiment: 'positive' },
      { text: 'Eco-friendly', value: 45, sentiment: 'positive' },
      { text: 'Limited', value: 25, sentiment: 'negative' },
      { text: 'Niche', value: 30, sentiment: 'neutral' },
      { text: 'Progressive', value: 40, sentiment: 'positive' }
    ],
    2: [
      { text: 'Convenient', value: 42, sentiment: 'positive' },
      { text: 'Mobile-friendly', value: 38, sentiment: 'positive' },
      { text: 'Expensive', value: 32, sentiment: 'negative' },
      { text: 'Trendy', value: 30, sentiment: 'positive' },
      { text: 'Distracting', value: 25, sentiment: 'negative' }
    ],
    3: [
      { text: 'Revolutionary', value: 45, sentiment: 'positive' },
      { text: 'Technical', value: 35, sentiment: 'neutral' },
      { text: 'Disruptive', value: 40, sentiment: 'positive' },
      { text: 'Complicated', value: 30, sentiment: 'negative' },
      { text: 'Forward-thinking', value: 38, sentiment: 'positive' }
    ]
  };
  
  // Combine common and project-specific terms
  const sentimentCloud = [...commonTerms, ...projectTerms[idVariant]];
  
  // User quotes with varied sentiments
  const userQuotes = [
    {
      text: "This solution addresses a real pain point I've been struggling with. The interface is clean and makes sense.",
      userName: "Alex Rivera",
      persona: "Tech-savvy Professional",
      sentiment: "positive" as Sentiment
    },
    {
      text: "I'm not sure if the pricing is justified for the features offered. I'd need to see more value to commit.",
      userName: "Jamie Chen",
      persona: "Small Business Owner",
      sentiment: "neutral" as Sentiment
    },
    {
      text: "This is exactly what I've been looking for! The time-saving features alone make it worth the investment.",
      userName: "Morgan Williams",
      persona: "Digital Parent",
      sentiment: "positive" as Sentiment
    },
    {
      text: "The onboarding process was confusing, and I struggled to understand how to set things up initially.",
      userName: "Samantha Taylor",
      persona: "Budget Shopper",
      sentiment: "negative" as Sentiment
    },
    {
      text: "While the concept is good, the execution feels unpolished. There are several UX issues that should be addressed.",
      userName: "Dev Patel",
      persona: "Tech-savvy Professional",
      sentiment: "neutral" as Sentiment
    },
    {
      text: "Too expensive for what it offers. I can find similar solutions at a lower price point.",
      userName: "Chris Johnson",
      persona: "Budget Shopper",
      sentiment: "negative" as Sentiment
    },
    {
      text: "The customer service experience was exceptional, and they helped me solve my problems quickly.",
      userName: "Leslie Martinez",
      persona: "Small Business Owner",
      sentiment: "positive" as Sentiment
    },
    {
      text: "I appreciate how thoughtfully designed this solution is. It's clear the team understands user needs.",
      userName: "Jordan Lee",
      persona: idVariant === 1 ? "Eco-conscious Consumer" : "Health Conscious Consumer",
      sentiment: "positive" as Sentiment
    }
  ];
  
  // Pain points vary by variant
  const painPointSets: Record<number, { category: string; count: number; importance: number }[]> = {
    0: [
      { category: "Pricing", count: 14, importance: 9 },
      { category: "Onboarding", count: 8, importance: 7 },
      { category: "Feature Gaps", count: 6, importance: 6 },
      { category: "Performance", count: 4, importance: 5 },
      { category: "Support", count: 3, importance: 4 }
    ],
    1: [
      { category: "Environmental Impact", count: 12, importance: 9 },
      { category: "Availability", count: 9, importance: 8 },
      { category: "Pricing", count: 8, importance: 7 },
      { category: "Customer Support", count: 5, importance: 6 },
      { category: "User Interface", count: 3, importance: 4 }
    ],
    2: [
      { category: "Mobile Experience", count: 10, importance: 8 },
      { category: "Subscription Model", count: 9, importance: 9 },
      { category: "Performance", count: 7, importance: 7 },
      { category: "Feature Set", count: 6, importance: 6 },
      { category: "Integration Options", count: 4, importance: 5 }
    ],
    3: [
      { category: "Learning Curve", count: 12, importance: 9 },
      { category: "Technical Issues", count: 9, importance: 8 },
      { category: "Documentation", count: 7, importance: 7 },
      { category: "Pricing Structure", count: 5, importance: 6 },
      { category: "Customer Service", count: 3, importance: 5 }
    ]
  };
  
  // Recommendations based on variant
  const recommendationSets: Record<number, string[]> = {
    0: [
      "Consider a tiered pricing model to accommodate different user segments",
      "Streamline the onboarding process with interactive tutorials",
      "Address performance issues on the dashboard to improve user experience",
      "Develop more enterprise integration options",
      "Create comprehensive documentation for advanced features"
    ],
    1: [
      "Enhance transparency around environmental impact metrics",
      "Expand distribution channels to improve availability",
      "Consider a lower-priced entry-level option",
      "Invest in customer support training for specialized knowledge",
      "Simplify the user interface for less tech-savvy users"
    ],
    2: [
      "Optimize mobile experience, especially on Android devices",
      "Offer monthly payment options alongside annual subscriptions",
      "Improve app performance during peak usage times",
      "Add requested features: dark mode, data export, and custom alerts",
      "Build an API for third-party integrations"
    ],
    3: [
      "Develop an interactive tutorial to flatten the learning curve",
      "Address technical issues with the backend infrastructure",
      "Create more comprehensive and searchable documentation",
      "Consider more flexible pricing options for different user types",
      "Implement a more robust customer service ticketing system"
    ]
  };
  
  // Demographics data - relatively consistent across variants with small adjustments
  const demographicSets: Record<number, { label: string; value: number }[]> = {
    0: [
      { label: "Tech-savvy Professionals", value: 8 },
      { label: "Small Business Owners", value: 3 },
      { label: "Enterprise Users", value: 4 }
    ],
    1: [
      { label: "Eco-conscious Consumers", value: 7 },
      { label: "Digital Parents", value: 5 },
      { label: "Tech-savvy Professionals", value: 3 }
    ],
    2: [
      { label: "Digital Parents", value: 6 },
      { label: "Budget Shoppers", value: 5 },
      { label: "Tech-savvy Professionals", value: 4 }
    ],
    3: [
      { label: "Tech-savvy Professionals", value: 8 },
      { label: "Health Conscious Consumers", value: 4 },
      { label: "Small Business Owners", value: 3 }
    ]
  };
  
  return {
    userScore: baseScore,
    sentimentCloud: sentimentCloud,
    userQuotes: userQuotes,
    painPoints: painPointSets[idVariant],
    recommendations: recommendationSets[idVariant],
    participantDemographics: demographicSets[idVariant]
  };
};

// Get the current status of a pulse research
export const getPulseStatus = (projectId: string): {
  status: PulseStatus;
  participantsTotal: number;
  participantsCompleted: number;
  startDate: Date;
  estimatedCompletionDate: Date;
} => {
  // Simulate different statuses based on project ID
  const statusVariant = parseInt(projectId.slice(-1), 16) % 5;
  
  const statuses: PulseStatus[] = [
    'pending',
    'recruiting', 
    'in_progress', 
    'analyzing', 
    'complete'
  ];
  
  const participantsTotal = 5 + (parseInt(projectId.slice(-2, -1), 16) % 3) * 5; // 5, 10, or 15
  let participantsCompleted = 0;
  
  if (statusVariant >= 2) {
    participantsCompleted = Math.floor(participantsTotal * (statusVariant / 4));
  }
  
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - 2);
  
  const estimatedCompletionDate = new Date(startDate);
  estimatedCompletionDate.setDate(estimatedCompletionDate.getDate() + 7);
  
  return {
    status: statuses[statusVariant],
    participantsTotal,
    participantsCompleted,
    startDate,
    estimatedCompletionDate
  };
};