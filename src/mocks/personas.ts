// src/mocks/personas.ts
import { ChatPersona } from '../types';

export interface EnhancedPersona extends ChatPersona {
  primaryDetail: string;
  description: string;
  accentColor: string;
  needsSnippet: string;
  jobTitle: string;
  groupChatRole?: string;
}

export const personas: EnhancedPersona[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatarUrl: '/assets/personas/sarah.png',
    primaryDetail: 'Seeks sustainable tech solutions',
    description: 'Tech-savvy entrepreneur focused on environmental impact',
    accentColor: 'emerald',
    jobTitle: 'Green Tech Founder',
    needsSnippet: 'Looking for eco-friendly innovations with market potential',
    groupChatRole: 'Market Insight Expert',
    role: 'user'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatarUrl: '/assets/personas/marcus.png',
    primaryDetail: 'Values data-driven decisions',
    description: 'Strategic investor with focus on scalable solutions',
    accentColor: 'blue',
    jobTitle: 'Venture Capitalist',
    needsSnippet: 'Seeking startups with strong metrics and growth potential',
    groupChatRole: 'Investment Advisor',
    role: 'user'
  },
  {
    id: '3',
    name: 'Emma Watson',
    avatarUrl: '/assets/personas/emma.png',
    primaryDetail: 'Champions social impact',
    description: 'Impact investor focused on community-driven solutions',
    accentColor: 'purple',
    jobTitle: 'Social Impact Investor',
    needsSnippet: 'Interested in solutions that create meaningful social change',
    groupChatRole: 'Impact Assessment Specialist',
    role: 'user'
  },
];

export const getAccentColors = (color: string) => {
  const colors = {
    emerald: {
      light: 'bg-emerald-50',
      border: 'border-emerald-200',
      ring: 'ring-emerald-100',
      text: 'text-emerald-700',
      hover: 'hover:bg-emerald-100',
      button: 'bg-emerald-600 hover:bg-emerald-700',
    },
    blue: {
      light: 'bg-blue-50',
      border: 'border-blue-200',
      ring: 'ring-blue-100',
      text: 'text-blue-700',
      hover: 'hover:bg-blue-100',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
    purple: {
      light: 'bg-purple-50',
      border: 'border-purple-200',
      ring: 'ring-purple-100',
      text: 'text-purple-700',
      hover: 'hover:bg-purple-100',
      button: 'bg-purple-600 hover:bg-purple-700',
    },
  };
  return colors[color as keyof typeof colors];
};
