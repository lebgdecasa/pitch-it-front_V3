"use client";

import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { vcPersonas } from '@/mocks/pitch-data';

interface PersonaSelectorProps {
  personas: typeof vcPersonas;
  selectedPersonaId: string;
  onSelectPersona: (id: string) => void;
}

export default function PersonaSelector({
  personas,
  selectedPersonaId,
  onSelectPersona
}: PersonaSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {personas.map((persona) => (
        <div
          key={persona.id}
          className={`relative cursor-pointer rounded-lg border p-4 hover:border-purple-300 ${
            selectedPersonaId === persona.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
          }`}
          onClick={() => onSelectPersona(persona.id)}
        >
          <div className="flex items-center">
            <div className="mr-4">
              <div className="h-16 w-16 rounded-full overflow-hidden relative">
                <Image
                  src={persona.avatarUrl}
                  alt={persona.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-medium">{persona.name}</h3>
              <p className="text-sm text-gray-500">{persona.role}</p>
              <p className="text-xs text-purple-600 mt-1">{persona.specialty}</p>
            </div>
            {selectedPersonaId === persona.id && (
              <CheckCircle2 className="absolute top-4 right-4 h-5 w-5 text-purple-500" />
            )}
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>{persona.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
