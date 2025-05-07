"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send, Users } from 'lucide-react';
import { Button } from '../../ui/button';
import { MessageInput } from './MessageInput';
import { mockChatPersonas, createMockChatMessages } from '../../../mocks';
import { ChatMessage, ChatPersona } from '../../../types';
import { formatDistanceToNow } from 'date-fns';

interface ChatThreadProps {
  projectId: string;
  personaId: string;
  onSelectDifferentPersona: () => void;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  projectId,
  personaId,
  onSelectDifferentPersona
}) => {
  // State to hold chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Get the selected persona from the mock data
  const selectedPersona = mockChatPersonas.find(p => p.id === personaId);
  
  // Get the founder persona (user)
  const founderPersona = mockChatPersonas.find(p => p.role === 'founder');

  // Load messages when component mounts or personaId changes
  useEffect(() => {
    // In a real app, we'd fetch this from an API based on projectId and personaId
    // For now, use the mock data and filter by persona
    const allMessages = createMockChatMessages(projectId);
    
    // Filter messages to only show those from the selected persona and founder (user)
    const filteredMessages = allMessages.filter(message => 
      message.persona === selectedPersona?.role || message.persona === 'founder'
    );
    
    setMessages(filteredMessages);
  }, [projectId, personaId, selectedPersona?.role]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = (text: string) => {
    if (!text.trim() || !founderPersona) return;

    // Create a new user message
    const newUserMessage: ChatMessage = {
      id: `message-${Date.now()}`,
      persona: 'founder',
      content: text,
      timestamp: new Date().toISOString(),
      avatarUrl: founderPersona.avatarUrl
    };

    // Add message to the thread
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // Simulate response after a short delay (in a real app, this would be an API call)
    setTimeout(() => {
      if (!selectedPersona) return;

      // Create a persona response
      const newResponse: ChatMessage = {
        id: `message-${Date.now() + 1}`,
        persona: selectedPersona.role,
        content: generateAIResponse(text, selectedPersona),
        timestamp: new Date().toISOString(),
        avatarUrl: selectedPersona.avatarUrl
      };

      // Add response to the thread
      setMessages(prevMessages => [...prevMessages, newResponse]);
    }, 1000);
  };

  // Helper function to generate AI responses based on persona
  const generateAIResponse = (userMessage: string, persona: ChatPersona): string => {
    // Simple response generation based on persona role
    // In a real app, this would be handled by an API call to a backend service
    const responses: Record<string, string[]> = {
      investor: [
        "That's an interesting point about your business model. Have you considered alternative revenue streams?",
        "Your market size estimates seem optimistic. Can you share more about your research methodology?",
        "I'd like to see more evidence of traction before committing to an investment decision."
      ],
      mentor: [
        "Have you thought about approaching this problem from a different angle?",
        "Your strategy makes sense, but I'd recommend focusing more on customer acquisition first.",
        "Based on my experience, your timeline might need adjustment. Let's discuss the milestones."
      ],
      customer: [
        "As a potential user, my main concern would be the pricing structure.",
        "This feature would definitely solve a pain point for me, but I'd also need integration with my existing tools.",
        "I'm not sure I understand how this would work in my daily workflow. Could you explain further?"
      ]
    };
    
    // Get responses for the persona role, or use a default if not found
    const personaResponses = responses[persona.role] || ["I'm interested in learning more about your project."];
    
    // Return a random response
    return personaResponses[Math.floor(Math.random() * personaResponses.length)];
  };

  if (!selectedPersona) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p>Selected persona not found.</p>
        <Button onClick={onSelectDifferentPersona} className="mt-4">
          Select a persona
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[calc(80vh-100px)]">
      {/* Chat header */}
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-3">
            {selectedPersona.avatarUrl ? (
              <Image 
                src={selectedPersona.avatarUrl}
                alt={selectedPersona.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="font-semibold text-gray-500">
                  {selectedPersona.name[0]}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{selectedPersona.name}</h3>
            <p className="text-xs text-gray-500">{selectedPersona.role.charAt(0).toUpperCase() + selectedPersona.role.slice(1)}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onSelectDifferentPersona}>
          <Users className="h-4 w-4 mr-2" />
          <span>All Personas</span>
        </Button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => {
          const isFounder = message.persona === 'founder';
          const messageTimestamp = new Date(message.timestamp);
          
          return (
            <div 
              key={message.id} 
              className={`mb-4 ${isFounder ? 'flex justify-end' : ''}`}
            >
              <div className={`flex items-start ${isFounder ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 ${isFounder ? 'ml-3' : 'mr-3'}`}>
                  {message.avatarUrl ? (
                    <Image 
                      src={message.avatarUrl}
                      alt={message.persona}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="font-semibold text-gray-500">
                        {message.persona[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Message content */}
                <div className="max-w-[70%]">
                  <div className={`p-3 rounded-lg ${
                    isFounder 
                      ? 'bg-indigo-50 text-gray-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(messageTimestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};