"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChatPersona } from '../../../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { Button } from '../../ui/button';

interface PersonaSelectorProps {
  projectId: string;
  personas: ChatPersona[];
  onSelectPersona: (personaId: string) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  projectId,
  personas,
  onSelectPersona
}) => {
  // Filter out the founder persona - we don't want to show it in the selector
  const filteredPersonas = personas.filter(p => p.role !== 'founder');

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Select a persona to chat with</h2>
        <p className="text-gray-500">
          Chat with different personas to get feedback and insights for your project
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPersonas.map(persona => (
          <Card key={persona.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              {persona.avatarUrl ? (
                <Image
                  src={persona.avatarUrl}
                  alt={persona.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              ) : (
                <div className="w-15 h-15 bg-gray-100 rounded-full flex items-center justify-center text-deep-blue">
                  <span className="text-xl font-semibold">{persona.name[0]}</span>
                </div>
              )}
              <div>
                <CardTitle className="text-lg">{persona.name}</CardTitle>
                <CardDescription>
                  {persona.role.charAt(0).toUpperCase() + persona.role.slice(1)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-gray-600 text-sm">
                {getPersonaDescription(persona.role)}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full justify-center text-sm py-1.5 bg-indigo-600 hover:bg-indigo-700"
                onClick={() => onSelectPersona(persona.id)}
              >
                Chat with {persona.name.split(' ')[0]}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Helper function to get persona descriptions based on their role
const getPersonaDescription = (role: string): string => {
  switch (role) {
    case 'investor':
      return 'Get feedback on your pitch from the investor perspective. Focus on your business model, market opportunity, and traction.';
    case 'mentor':
      return 'Receive guidance on strategy, execution, and growth from an experienced startup mentor.';
    case 'customer':
      return 'Understand how potential customers perceive your product, its value proposition, and pain points it addresses.';
    default:
      return 'Chat about your project and get valuable insights.';
  }
};
