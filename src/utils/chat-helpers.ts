// src/utils/chat-helpers.ts
export const formatMentions = (message: string): string[] => {
  const mentionRegex = /@([a-zA-Z\s]+)/g;
  const matches = message.match(mentionRegex);
  
  if (!matches) return [];
  
  return matches.map(match => match.slice(1).trim());
};

export const checkForExpertTriggers = (message: string): boolean => {
  const triggerKeywords = [
    'compliance',
    'regulation',
    'standard',
    'certification',
    'technical',
    'specification',
    'requirement',
    'assessment',
    'validation',
    'verification'
  ];

  const messageLower = message.toLowerCase();
  return triggerKeywords.some(keyword => messageLower.includes(keyword));
};

export const getParticipantInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};