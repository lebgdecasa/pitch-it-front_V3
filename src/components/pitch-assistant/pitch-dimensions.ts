import { PitchDimension } from '../../types/pitch-assistant';

// All 11 dimensions with their keywords and descriptions
export const pitchDimensions: PitchDimension[] = [
  {
    id: 'targetAudience',
    name: 'Target Audience',
    keywords: ['audience', 'customer', 'user', 'client', 'demographic', 'buyer', 'market', 'segment'],
    description: 'Who will use your product or service? Be specific about demographics, needs, and behaviors.',
    example: 'Our target audience is small business owners (5-50 employees) who struggle with digital marketing but don\'t have the budget for agencies or dedicated staff.'
  },
  {
    id: 'coreProblem',
    name: 'Core Problem',
    keywords: ['problem', 'pain point', 'challenge', 'issue', 'struggle', 'difficulty', 'frustration', 'gap'],
    description: 'What specific problem are you solving? Why is this a significant issue worth addressing?',
    example: 'Small businesses waste an average of 20 hours per week on ineffective marketing efforts, resulting in poor ROI and missed growth opportunities.'
  },
  {
    id: 'uniqueDifferentiator',
    name: 'Unique Differentiator',
    keywords: ['unique', 'different', 'stand out', 'competitive advantage', 'differentiation', 'proprietary', 'patent'],
    description: 'How is your solution different from alternatives? What makes you stand out?',
    example: 'Unlike generic marketing tools, our platform uses proprietary AI algorithms specifically trained on small business success patterns across 50+ industries.'
  },
  {
    id: 'underlyingTechnology',
    name: 'Underlying Technology',
    keywords: ['technology', 'platform', 'algorithm', 'system', 'infrastructure', 'architecture', 'framework', 'tech'],
    description: 'What technology powers your solution? How does it work behind the scenes?',
    example: 'Our platform combines natural language processing and predictive analytics to automatically generate marketing content and optimize campaign performance in real-time.'
  },
  {
    id: 'keyBenefits',
    name: 'Key Benefits',
    keywords: ['benefit', 'advantage', 'value', 'gain', 'improve', 'enhance', 'boost', 'increase'],
    description: 'What specific benefits does your solution provide? Focus on outcomes, not features.',
    example: 'Our customers experience an average 3.5x ROI within 90 days, 65% reduction in time spent on marketing tasks, and consistent lead growth without increasing budget.'
  },
  {
    id: 'workflow',
    name: 'Workflow/Usage',
    keywords: ['workflow', 'process', 'steps', 'use', 'interact', 'experience', 'journey', 'onboarding'],
    description: 'How do users interact with your product? What does the user experience look like?',
    example: 'Users connect their social and advertising accounts, answer 5 questions about their business goals, and receive a customized marketing plan within minutes. Weekly 15-minute checkpoints are all that\'s needed to keep campaigns optimized.'
  },
  {
    id: 'emotionalValue',
    name: 'Emotional Value',
    keywords: ['feel', 'emotion', 'relief', 'confidence', 'peace of mind', 'trust', 'satisfaction', 'pride'],
    description: 'How does your solution make users feel? What emotional need does it address?',
    example: 'Our platform gives small business owners the confidence that their marketing is working effectively, relieving the anxiety of wasting money and the frustration of not knowing what to do next.'
  },
  {
    id: 'costTimeSavings',
    name: 'Cost/Time Savings',
    keywords: ['save', 'reduce', 'decrease', 'lower', 'efficient', 'affordable', 'cost-effective', 'economical', 'quick', 'fast'],
    description: 'How much time or money does your solution save? Quantify when possible.',
    example: 'Businesses save an average of $3,500 per month in agency fees and 15-20 hours per week previously spent on manual marketing tasks.'
  },
  {
    id: 'useCases',
    name: 'Use Cases/Platforms',
    keywords: ['use case', 'scenario', 'application', 'platform', 'device', 'integrate', 'compatible', 'environment'],
    description: 'What are specific scenarios where your solution shines? What platforms does it work on?',
    example: 'The platform works across all major marketing channels including social media, email, Google Ads, and content marketing. It\'s particularly effective for service businesses, local retailers, and professional practices.'
  },
  {
    id: 'competitorGap',
    name: 'Competitor Gap',
    keywords: ['competitor', 'alternative', 'current solution', 'market', 'existing', 'other', 'instead of', 'comparison'],
    description: 'What gap in existing solutions are you filling? How do competitors fall short?',
    example: 'Existing marketing tools either require significant expertise (like HubSpot) or offer limited functionality (like Mailchimp). None provide the combination of automation, customization, and simplicity that small businesses need.'
  },
  {
    id: 'summarySentence',
    name: 'Summary Sentence',
    keywords: ['in summary', 'in short', 'simply put', 'in essence', 'at its core', 'fundamentally', 'in a nutshell'],
    description: 'Can you summarize your entire value proposition in one concise sentence?',
    example: 'SmartMarketer helps small businesses achieve enterprise-level marketing results with minimal time, expertise, and budget through our AI-powered platform.'
  }
];

// Check which dimensions are covered in the text
export function checkDimensions(text: string) {
  const covered: PitchDimension[] = [];
  let nextDimension: PitchDimension | null = null;
  let feedback = '';
  
  // Check which dimensions are covered
  for (const dimension of pitchDimensions) {
    const keywordMatch = dimension.keywords.some(
      keyword => text.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (keywordMatch) {
      covered.push(dimension);
    }
  }
  
  // Determine the next dimension to focus on
  const uncoveredDimensions = pitchDimensions.filter(
    dimension => !covered.find(d => d.id === dimension.id)
  );
  
  if (uncoveredDimensions.length > 0) {
    nextDimension = uncoveredDimensions[0];
    feedback = generateFeedback(covered, nextDimension);
  } else {
    feedback = "Great job! You've covered all the important dimensions of your pitch. Review your description for clarity and conciseness.";
  }
  
  return {
    covered,
    next: nextDimension,
    feedback
  };
}

// Generate feedback based on covered dimensions and next focus
function generateFeedback(covered: PitchDimension[], next: PitchDimension | null): string {
  if (covered.length === 0) {
    return "Start by describing the problem your business solves and who you're solving it for.";
  }
  
  if (covered.length < 3) {
    return `Good start! Now tell me more about your ${next?.name.toLowerCase()}.`;
  }
  
  if (covered.length < 6) {
    return `You're making progress! Add details about ${next?.name.toLowerCase()} to strengthen your pitch.`;
  }
  
  if (covered.length < 9) {
    return `You're doing well! Enhance your pitch by explaining ${next?.name.toLowerCase()}.`;
  }
  
  return `Almost there! Round out your pitch by addressing ${next?.name.toLowerCase()}.`;
}