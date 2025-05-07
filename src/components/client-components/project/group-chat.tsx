import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send } from 'lucide-react';
import { Button } from '../../ui/button';

// Define the persona types
interface Persona {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

// Define message structure
interface ChatMessage {
  id: string;
  personaId: string;
  personaName: string;
  text: string;
  timestamp: Date;
}

// Props for the GroupChat component
interface GroupChatProps {
  projectId: string;
}

// Mock data for personas
const personas: Persona[] = [
  {
    id: 'alex',
    name: 'Alex',
    role: 'Pitch/Project Advisor',
    avatar: '/assets/avatars/alex.png'
  },
  {
    id: 'eleanor',
    name: 'Eleanor',
    role: 'Field Expert',
    avatar: '/assets/avatars/eleanor.png'
  },
  {
    id: 'natalie',
    name: 'Natalie',
    role: 'UX Specialist',
    avatar: '/assets/avatars/natalie.png'
  },
  {
    id: 'user',
    name: 'User',
    role: 'You',
    avatar: '/assets/avatars/user.png'
  }
];

// Sample initial messages
const getInitialMessages = (projectId: string): ChatMessage[] => [
  {
    id: '1',
    personaId: 'alex',
    personaName: 'Alex',
    text: 'Welcome! I can help you refine your pitch and project strategy. What aspect of your project would you like to work on today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60)
  }
];

export const GroupChat: React.FC<GroupChatProps> = ({ projectId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load initial messages
    setMessages(getInitialMessages(projectId));
  }, [projectId]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePersonaClick = (persona: Persona) => {
    setSelectedPersona(persona);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      personaId: 'user',
      personaName: 'User',
      text: newMessage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');

    // Generate AI response based on the message content
    setTimeout(() => {
      generateAIResponse(newMessage);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string) => {
    // Mock responses from different personas based on the message content
    const responses: Record<string, string[]> = {
      alex: [
        "That's a great point about your pitch. Have you considered focusing more on the market size?",
        "I think your value proposition is strong, but let's clarify the revenue model.",
        "Your competitive analysis looks good. Consider adding more about your unique advantages."
      ],
      eleanor: [
        "From an industry perspective, this approach makes a lot of sense. Have you looked at similar cases?",
        "The market trends support your hypothesis, but be prepared for questions about scaling.",
        "Your solution addresses a real pain point. I've seen similar problems in other companies."
      ],
      natalie: [
        "Consider how users will experience this feature. Is the onboarding process intuitive?",
        "The user flow makes sense, but I'd suggest simplifying the first interaction.",
        "From a UX perspective, this might create friction. Let's think about alternative approaches."
      ]
    };

    // Determine which persona should respond
    let respondingPersona: Persona;
    
    if (selectedPersona && selectedPersona.id !== 'user') {
      // If a specific persona is selected, they respond
      respondingPersona = selectedPersona;
    } else {
      // Otherwise pick a random persona
      const availablePersonas = personas.filter(p => p.id !== 'user');
      respondingPersona = availablePersonas[Math.floor(Math.random() * availablePersonas.length)];
    }
    
    // Get a random response for the persona
    const personaResponses = responses[respondingPersona.id] || ["I'm not sure about that, can you elaborate?"];
    const responseText = personaResponses[Math.floor(Math.random() * personaResponses.length)];
    
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      personaId: respondingPersona.id,
      personaName: respondingPersona.name,
      text: responseText,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, aiResponse]);
    setSelectedPersona(null); // Reset selected persona after response
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Group Chat</h3>
      </div>
      
      {/* Persona selection */}
      <div className="flex overflow-x-auto p-4 gap-3 border-b">
        {personas.filter(p => p.id !== 'user').map((persona) => (
          <div 
            key={persona.id}
            onClick={() => handlePersonaClick(persona)}
            className={`flex-shrink-0 flex flex-col items-center cursor-pointer p-2 rounded-lg ${
              selectedPersona?.id === persona.id ? 'bg-gray-100' : ''
            }`}
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mb-2 flex items-center justify-center">
              <div className="text-xl text-gray-500">{persona.name.charAt(0)}</div>
            </div>
            <span className="text-sm font-medium">{persona.name}</span>
          </div>
        ))}
      </div>
      
      {/* Chat messages */}
      <div className="h-80 overflow-y-auto p-4">
        {messages.map((message) => {
          const isUser = message.personaId === 'user';
          return (
            <div key={message.id} className={`mb-4 ${isUser ? 'ml-12' : ''}`}>
              <div className="flex items-start">
                {!isUser && (
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-sm font-semibold">{message.personaName.charAt(0)}</span>
                    </div>
                  </div>
                )}
                <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
                  <div className={`inline-block rounded-lg p-3 max-w-[80%] ${
                    isUser ? 'bg-deep-blue text-white' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    <span>{isUser ? 'You' : message.personaName}</span>
                  </div>
                </div>
                {isUser && (
                  <div className="flex-shrink-0 ml-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 text-sm">You</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t flex items-center">
        <div className="flex-1">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <Button 
          onClick={handleSendMessage}
          className="ml-2"
          disabled={!newMessage.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {/* If a persona is selected, show their role */}
      {selectedPersona && selectedPersona.id !== 'user' && (
        <div className="px-4 py-2 bg-gray-50 text-sm">
          Messaging <span className="font-semibold">{selectedPersona.name}</span> - <span className="text-gray-600">{selectedPersona.role}</span>
        </div>
      )}
    </div>
  );
};

export default GroupChat;