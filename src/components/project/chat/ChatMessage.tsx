// src/components/project/chat/ChatMessage.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ChatMessage as ChatMessageType, ChatParticipant } from '../../../mocks/chat-data';

interface ChatMessageProps {
  message: ChatMessageType;
  participants: ChatParticipant[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, participants }) => {
  const formatMessageContent = (content: string) => {
    return content.split(' ').map((word, index) => {
      if (word.startsWith('@')) {
        const mentionedName = word.slice(1);
        const participant = participants.find(
          p => p.name.toLowerCase() === mentionedName.toLowerCase()
        );
        
        if (participant) {
          return (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-700 rounded px-1 mx-0.5"
            >
              {word}
            </span>
          );
        }
      }
      return word + ' ';
    });
  };

  const sender = participants.find(p => p.id === message.senderId);

  return (
    <div className={`flex space-x-3 ${message.isExpertIntervention ? 'bg-amber-50 p-3 rounded-lg' : ''}`}>
      <div className="flex-shrink-0">
        {sender?.avatarUrl ? (
          <Image
            src={sender.avatarUrl}
            alt={sender.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-sm">{message.senderName[0]}</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-baseline space-x-2">
          <span className="font-medium text-gray-900">{message.senderName}</span>
          <span className="text-sm text-gray-500">{message.senderRole}</span>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-gray-700">
          {formatMessageContent(message.content)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;