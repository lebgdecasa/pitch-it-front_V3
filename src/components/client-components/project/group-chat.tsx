// src/components/client-components/project/group-chat.tsx

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Send } from 'lucide-react';
import { Button } from '../../ui/button';
import { PersonaModal } from '../persona/PersonaModal';
import { ChatPersona } from '../../../types';

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
  projectName: string;
}

// Mock data for personas (avatars, names, roles for chat display)
const personas: Persona[] = [
  {
    id: 'alan',
    name: 'Alan',
    role: 'Freelance Animator and Content Creator',
    avatar: '/assets/avatars/alex-chen.jpg'
  },
  {
    id: 'brenda',
    name: 'Brenda',
    role: 'Marketing Manager at a Tech Startup',
    avatar: '/assets/avatars/sarah-johnson.jpg'
  },
  {
    id: 'marcus',
    name: 'Marcus',
    role: 'Independent Online Educator',
    avatar: '/assets/avatars/marcus-williams.jpg'
  },
  {
    id: 'danielle',
    name: 'Danielle',
    role: 'Project Advisor',
    avatar: '/assets/avatars/amara-okonkwo.jpg'
  },
  {
    id: 'user',
    name: 'User',
    role: 'You',
    avatar: '/assets/avatars/user.png'
  }
];

// Hardcoded detailed persona information for the modal
const personaDetails = [
  {
    id: 'alan',
    jobTitle: "Freelance Animator and Content Creator",
    needsSnippet: "Seeks efficient and creative tools to streamline animation and storytelling.",
    needsDetails: "Needs to create engaging animated podcasts quickly and efficiently, maintain a consistent brand voice, experiment with different character voices without hiring voice actors, save time on scriptwriting and emotion adaptation, and build a loyal audience.",
    background: "Represents the growing segment of independent animators and content creators who constantly seek efficient, creative tools. Early adopters of new technologies, they influence peers through their work and innovation.",
    goals: ["Produce high-quality content faster", "Expand audience reach", "Maintain creative control and brand consistency"],
    challenges: ["Time-consuming animation and voice production", "High costs for professional voice actors", "Limited emotional range of standard AI voices"],
    preferredCommunication: "Animation forums, YouTube animation communities, Patreon, Discord servers for animators, online animation courses."
  },
  {
    id: 'brenda',
    jobTitle: "Marketing Manager at a Tech Startup",
    needsSnippet: "Aims to integrate podcasts into brand marketing with minimal friction.",
    needsDetails: "Needs to create high-quality branded podcasts, maintain a consistent brand voice, experiment with different voice styles, save time on scriptwriting and emotional adaptation, track podcast performance metrics, and generate leads through audio content.",
    background: "Represents the growing trend of marketers using podcasts as a strategic channel for brand building and lead generation. They require tools that align tightly with brand standards and provide measurable ROI.",
    goals: ["Enhance brand presence through audio content", "Generate qualified leads via podcasts", "Maintain strong brand voice and authenticity"],
    challenges: ["Producing quality content consistently under time pressure", "Maintaining emotional authenticity in AI-generated voices", "Measuring and optimizing podcast performance"],
    preferredCommunication: "Marketing conferences, marketing blogs, LinkedIn marketing groups, podcasting communities, online marketing courses."
  },
  {
    id: 'marcus',
    jobTitle: "Independent Online Educator",
    needsSnippet: "Wants scalable, time-saving solutions to grow educational content output.",
    needsDetails: "Needs to create engaging educational podcasts quickly and efficiently, maintain a consistent and personal teaching style, experiment with different voice styles, save time on scriptwriting and emotion adaptation, build a loyal student base, and generate sustainable revenue.",
    background: "Represents the booming online education economy, looking for scalable tools to produce authentic, high-quality educational content while keeping direct connection with students.",
    goals: ["Expand reach with more content formats", "Deliver high-quality lessons efficiently", "Build loyal communities of learners"],
    challenges: ["Managing time across content creation and student engagement", "Maintaining authentic teaching style with automation", "Standing out in a saturated education market"],
    preferredCommunication: "Online education platforms, educational forums, social media groups for educators, podcasting communities, online course marketplaces."
  },
  {
    id: 'danielle',
    jobTitle: "Project Advisor",
    needsSnippet: "Provides strategic guidance and industry insights.",
    needsDetails: "Looking for clear value proposition and market fit. Wants to understand the business model and revenue streams. Concerned about scaling potential and competitive positioning.",
    background: "15+ years in venture capital with a focus on SaaS and marketplace startups. Former founder of two successful companies.",
    goals: ["Identify promising investment opportunities", "Help founders build sustainable businesses", "Create long-term partnerships with entrepreneurs"],
    challenges: ["Limited time for evaluating pitches", "Finding companies with genuine innovation", "Balancing portfolio with varied risk levels"],
    preferredCommunication: "Direct, data-driven communication with clear evidence supporting claims."
  }
];

// Sample initial messages
const getInitialMessages = (projectId: string, projectName: any): ChatMessage[] => [
  {
    id: '1',
    personaId: 'alan',
    personaName: 'Alan',
    text: `Welcome to the strategy session for ${projectName}! I\'m Alan. I\'ve reviewed the concept of your AI-powered dubbing platform. The \'emotion preservation\' aspect is particularly interesting. To start, what\'s the biggest challenge you\'re currently facing with your pitch or overall project strategy?`,
    timestamp: new Date(Date.now() - 1000 * 60 * 60)
  }
];

export const GroupChat: React.FC<GroupChatProps> = ({ projectId, projectName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentPersona, setModalContentPersona] = useState<Persona | null>(null);

  useEffect(() => {
    // Load initial messages
    setMessages(getInitialMessages(projectId, projectName));
  }, [projectId, projectName]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePersonaClick = (persona: Persona) => {
    setSelectedPersona(persona);
    setModalContentPersona(persona);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContentPersona(null);
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
      generateAIResponse(userMessage.text);
    }, 1000);
  };

  const generateAIResponse = (userMessageText: string) => {
    const responses: Record<string, string[]> = {
      alan: [
        "That's a great point about your pitch. Have you considered focusing more on the market size?",
        "I think your value proposition is strong, but let's clarify the revenue model.",
        "Your competitive analysis looks good. Consider adding more about your unique advantages."
      ],
      brenda: [
        "From a marketing perspective, this is compelling. How will you reach your target audience?",
        "The branding potential is huge. Let's brainstorm some campaign ideas.",
        "What are your key performance indicators for marketing success?"
      ],
      marcus: [
        "As an educator, I see the value in this. How will you ensure user engagement?",
        "The learning curve seems manageable. Have you thought about tutorials or guides?",
        "What kind of support will be available for new users?"
      ],
      danielle: [
        "From an industry perspective, this approach makes a lot of sense. Have you looked at similar cases?",
        "The market trends support your hypothesis, but be prepared for questions about scaling.",
        "Your solution addresses a real pain point. I've seen similar problems in other companies."
      ]
    };

    let respondingPersona: Persona;

    if (selectedPersona && selectedPersona.id !== 'user') {
      respondingPersona = selectedPersona;
    } else {
      const availablePersonas = personas.filter(p => p.id !== 'user');
      respondingPersona = availablePersonas[Math.floor(Math.random() * availablePersonas.length)];
    }

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
    setSelectedPersona(null);
  };

  const advisorPersonas = personas.filter(p => p.id === 'danielle');
  const customerPersonas = personas.filter(p => ['alan', 'brenda', 'marcus'].includes(p.id));

  const currentPersonaDetails = modalContentPersona
    ? personaDetails.find(p => p.id === modalContentPersona.id)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Group Chat</h3>
      </div>

      {/* Persona selection */}
      <div className="flex justify-between items-start p-4 gap-3 border-b">
        <div className="flex flex-col items-center">
          {advisorPersonas.map((persona) => (
            <div
              key={persona.id}
              onClick={() => handlePersonaClick(persona)}
              className={`flex-shrink-0 flex flex-col items-center cursor-pointer p-2 rounded-lg ${
                selectedPersona?.id === persona.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mb-2 flex items-center justify-center">
                <Image
                  src={persona.avatar}
                  alt={`${persona.name}'s avatar`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-medium">{persona.name}</span>
              <span className="text-xs text-gray-500">{persona.role}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          {customerPersonas.map((persona) => (
            <div
              key={persona.id}
              onClick={() => handlePersonaClick(persona)}
              className={`flex-shrink-0 flex flex-col items-center cursor-pointer p-2 rounded-lg ${
                selectedPersona?.id === persona.id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mb-2 flex items-center justify-center">
                <Image
                  src={persona.avatar}
                  alt={`${persona.name}'s avatar`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </div>
              <span className="text-sm font-medium">{persona.name}</span>
              <span className="text-xs text-gray-500">{persona.role}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-80 overflow-y-auto p-4">
        {messages.map((message) => {
          const isUser = message.personaId === 'user';
          const persona = personas.find(p => p.id === message.personaId);
          return (
            <div key={message.id} className={`mb-4 ${isUser ? 'ml-12' : ''}`}>
              <div className="flex items-start">
                {!isUser && persona && (
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={persona.avatar}
                        alt={`${persona.name}'s avatar`}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
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

      {isModalOpen && modalContentPersona && currentPersonaDetails && (
        <PersonaModal
          persona={{
            id: modalContentPersona.id,
            name: modalContentPersona.name,
            role: modalContentPersona.role,
            avatarUrl: modalContentPersona.avatar,
          } as ChatPersona}
          isOpen={isModalOpen}
          onClose={closeModal}
          jobTitle={currentPersonaDetails.jobTitle}
          needsDetails={currentPersonaDetails.needsDetails}
          background={currentPersonaDetails.background}
          goals={currentPersonaDetails.goals}
          challenges={currentPersonaDetails.challenges}
          preferredCommunication={currentPersonaDetails.preferredCommunication}
        />
      )}
    </div>
  );
};

export default GroupChat;
