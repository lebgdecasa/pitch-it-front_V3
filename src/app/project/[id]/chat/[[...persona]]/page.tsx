"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ChatThread } from '@/components/client-components/chat/ChatThread';
import { PersonaSelector } from '@/components/client-components/chat/PersonaSelector';
import { useAppContext } from '@/providers/app-provider';
import { mockChatPersonas, createMockChatMessages } from '@/mocks';

export default function ChatPage() {
  const params = useParams();
  const projectId = params.id as string;
  const personaParam = params.persona as string[] | undefined;
  const { state } = useAppContext();
  const { projects } = state;
  const project = projects.find(p => p.id === projectId);

  // If persona ID is provided in the URL, select that persona
  // Otherwise, default to null (thread selector view)
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(
    personaParam?.length ? personaParam[0] : null
  );

  // Find the currently selected persona object
  const selectedPersona = selectedPersonaId
    ? mockChatPersonas.find(p => p.id === selectedPersonaId) || null
    : null;

  // Set page title based on selected persona
  const pageTitle = selectedPersona
    ? `Chat with ${selectedPersona.name}`
    : "Project Chat";

  if (!project) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Back link and project title */}
      <div className="mb-6">
        <Link href={`/project/${projectId}`} className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to Project</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{pageTitle}</h1>
            <p className="text-gray-500 mt-1">{project.name}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6">
        {selectedPersonaId ? (
          // Show the chat thread for the selected persona
          <ChatThread
            projectId={projectId}
            personaId={selectedPersonaId}
            onSelectDifferentPersona={() => setSelectedPersonaId(null)}
          />
        ) : (
          // Show persona selector if no persona is selected
          <PersonaSelector
            projectId={projectId}
            personas={mockChatPersonas}
            onSelectPersona={(id) => setSelectedPersonaId(id)}
          />
        )}
      </div>
    </div>
  );
}
