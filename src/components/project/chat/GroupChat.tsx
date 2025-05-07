// src/components/project/chat/GroupChat.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType, ChatParticipant, chatParticipants, initialChatHistory } from '../../../mocks/chat-data';
import ChatMessage from './ChatMessage';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { checkForExpertTriggers, formatMentions } from '../../../utils/chat-helpers';

export const GroupChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialChatHistory);
  const [newMessage, setNewMessage] = useState('');
  const [mentionSearch, setMentionSearch] = useState('');
  const [showMentionList, setShowMentionList] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMentionSelect = (participant: ChatParticipant) => {
    const lastSpaceIndex = newMessage.lastIndexOf(' ');
    const messageStart = newMessage.substring(0, lastSpaceIndex + 1);
    setNewMessage(`${messageStart}@${participant.name} `);
    setShowMentionList(false);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    // Check for @ symbol to trigger mention list
    const lastAtSymbol = value.lastIndexOf('@');
    if (lastAtSymbol !== -1) {
      const searchText = value.substring(lastAtSymbol + 1).toLowerCase();
      setMentionSearch(searchText);
      setShowMentionList(true);
    } else {
      setShowMentionList(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const mentions = formatMentions(newMessage);
    const newChatMessage: ChatMessageType = {
      id: String(Date.now()),
      senderId: '1', // Using Sarah as default sender
      senderName: 'Sarah Chen',
      senderRole: 'Market Insight Expert',
      content: newMessage,
      timestamp: new Date().toISOString(),
      mentions,
    };

    setMessages(prev => [...prev, newChatMessage]);

    // Check for expert triggers
    if (checkForExpertTriggers(newMessage) || mentions.includes('4')) {
      setTimeout(() => {
        const expertResponse: ChatMessageType = {
          id: String(Date.now() + 1),
          senderId: '4',
          senderName: 'Dr. James Mitchell',
          senderRole: 'Domain Expert',
          content: 'Important point raised. Let me provide some expert insight on this matter...',
          timestamp: new Date().toISOString(),
          mentions: [],
          isExpertIntervention: true,
        };
        setMessages(prev => [...prev, expertResponse]);
      }, 1500);
    }

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} participants={chatParticipants} />
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="border-t p-4 relative">
        {showMentionList && (
          <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {chatParticipants
              .filter(p => p.name.toLowerCase().includes(mentionSearch))
              .map(participant => (
                <button
                  key={participant.id}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
                  onClick={() => handleMentionSelect(participant)}
                >
                  <span className="font-medium">{participant.name}</span>
                  <span className="text-sm text-gray-500">({participant.role})</span>
                </button>
              ))}
          </div>
        )}

        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Type your message... Use @ to mention"
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;