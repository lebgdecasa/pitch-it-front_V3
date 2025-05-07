// src/mocks/next-steps.ts
export interface NextStep {
  tooltip: string;
  id: string;
  title: string;
  description: string;
  action: string;
  icon: 'chat' | 'chart' | 'presentation' | 'video';
  href: string;
  isLocked: boolean;
  unlockCondition: {
    type: 'interaction' | 'completion';
    requiredSteps: string[];
    message: string;
  };
}

export const nextSteps: NextStep[] = [
  {
    id: 'define-plan',
    title: 'Define Business Plan',
    description: 'Develop your core business strategy and plan',
    action: 'Start Planning',
    icon: 'chart',
    href: '/plan',
    isLocked: false,
    unlockCondition: {
      type: 'interaction',
      requiredSteps: [],
      message: ''
    },
    tooltip: ""
  },
  {
    id: 'market-research',
    title: 'Market Research',
    description: 'Analyze market data and target audience',
    action: 'View Research',
    icon: 'chart',
    href: '/research',
    isLocked: false,
    unlockCondition: {
      type: 'interaction',
      requiredSteps: [],
      message: ''
    },
    tooltip: ""
  },
  {
    id: 'create-deck',
    title: 'Create Pitch Deck',
    description: 'Build your pitch presentation',
    action: 'Create Deck',
    icon: 'presentation',
    href: '/deck',
    isLocked: true,
    unlockCondition: {
      type: 'completion',
      requiredSteps: ['define-plan', 'market-research'],
      message: 'Complete business plan and market research first'
    },
    tooltip: ""
  },
  {
    id: 'practice-pitch',
    title: 'Practice Your Pitch',
    description: 'Practice with AI-powered feedback',
    action: 'Start Practice',
    icon: 'video',
    href: '/practice',
    isLocked: true,
    unlockCondition: {
      type: 'completion',
      requiredSteps: ['create-deck'],
      message: 'Complete your pitch deck to start practicing'
    },
    tooltip: ""
  },
  {
    id: 'chat-feedback',
    title: 'Get Expert Feedback',
    description: 'Chat with AI personas for feedback',
    action: 'Get Feedback',
    icon: 'chat',
    href: '/chat',
    isLocked: true,
    unlockCondition: {
      type: 'completion',
      requiredSteps: ['practice-pitch'],
      message: 'Practice your pitch first to get expert feedback'
    },
    tooltip: ""
  }
];
