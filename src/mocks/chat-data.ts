// src/mocks/chat-data.ts
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  mentions: string[];
  isExpertIntervention?: boolean;
}

export interface ChatParticipant {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  isExpert?: boolean;
}

export const chatParticipants: ChatParticipant[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Market Insight Expert',
    avatarUrl: '/assets/personas/sarah.png',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Investment Advisor',
    avatarUrl: '/assets/personas/marcus.png',
  },
  {
    id: '3',
    name: 'Emma Watson',
    role: 'Impact Assessment Specialist',
    avatarUrl: '/assets/personas/emma.png',
  },
  {
    id: '4',
    name: 'Dr. James Mitchell',
    role: 'Domain Expert',
    avatarUrl: '/assets/personas/expert.png',
    isExpert: true,
  },
];

export const initialChatHistory: ChatMessage[] = [
  {
    id: '1',
    senderId: '1',
    senderName: 'Sarah Chen',
    senderRole: 'Market Insight Expert',
    content: "Let's analyze the market potential for this sustainable tech solution. @Marcus, what's your take on the scalability?",
    timestamp: '2024-01-20T10:00:00Z',
    mentions: ['2'],
  },
  {
    id: '2',
    senderId: '2',
    senderName: 'Marcus Rodriguez',
    senderRole: 'Investment Advisor',
    content: "From an investment perspective, the scalability looks promising. However, I'm concerned about the initial capital requirements.",
    timestamp: '2024-01-20T10:02:00Z',
    mentions: [],
  },
  {
    id: '3',
    senderId: '3',
    senderName: 'Emma Watson',
    senderRole: 'Impact Assessment Specialist',
    content: '@Expert, could you weigh in on the technologys environmental impact compliance?',
    timestamp: '2024-01-20T10:04:00Z',
    mentions: ['4'],
  },
  {
    id: '4',
    senderId: '4',
    senderName: 'Dr. James Mitchell',
    senderRole: 'Domain Expert',
    content: 'Based on the provided specifications, the solution meets current environmental standards. However, I recommend conducting a detailed lifecycle assessment.',
    timestamp: '2024-01-20T10:05:00Z',
    mentions: [],
    isExpertIntervention: true,
  },
];
