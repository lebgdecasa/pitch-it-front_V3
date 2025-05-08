// src/components/client-components/persona/PersonaCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { getAccentColors } from '../../../mocks/personas';
import type { EnhancedPersona } from '../../../mocks/personas';

interface PersonaCardProps {
  persona: EnhancedPersona;
  onShowDetails: () => void;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({
  persona,
  onShowDetails,
}) => {
  const colors = getAccentColors(persona.accentColor);

  const placeholderAvatar = (
    <div className={`w-14 h-14 ${colors?.light ?? 'bg-gray-100'} rounded-full flex items-center justify-center ${colors?.text ?? 'text-gray-800'}`}>
      <span className="text-xl font-semibold">{persona.name[0]}</span>
    </div>
  );

  return (
    <div
      className={`bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md cursor-pointer transition-shadow`}
      onClick={onShowDetails}
    >
      <div className="flex items-center mb-3">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-3">
          {persona.avatarUrl ? (
            <Image
              src={persona.avatarUrl}
              alt={persona.name}
              width={56}
              height={56}
              className="rounded-full"
            />
          ) : placeholderAvatar}
        </div>
        {/* Basic Info */}
        <div>
          <h3 className={`font-semibold ${colors?.text ?? 'text-gray-900'}`}>{persona.name}</h3>
          <p className="text-sm text-gray-600">{persona.jobTitle}</p>
        </div>
      </div>
      {/* Needs Snippet */}
      <div className="mb-3">
        <p className="text-sm text-gray-700">{persona.needsSnippet}</p>
      </div>
    </div>
  );
};

export default PersonaCard;
