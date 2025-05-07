// src/components/client-components/persona/PersonaCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { getAccentColors } from '../../../mocks/personas';
import type { EnhancedPersona } from '../../../mocks/personas';

interface PersonaCardProps {
  persona: EnhancedPersona;
  isSelected: boolean;
  onShowDetails: () => void;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({
  persona,
  isSelected,
  onShowDetails,
}) => {
  const accentColors = getAccentColors(persona.accentColor);
  const colors = accentColors || { light: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300', ring: 'ring-gray-300', hover: 'hover:border-gray-400' };

  const placeholderAvatar = (
    <div className={`w-14 h-14 ${colors.light} rounded-full flex items-center justify-center ${colors.text}`}>
      <span className="text-xl font-semibold">{persona.name[0]}</span>
    </div>
  );

  return (
    <div
      className={`bg-white p-4 rounded-lg border ${
        isSelected
          ? `${colors.border} ring-2 ${colors.ring}`
          : 'border-gray-200'
      } shadow-sm hover:shadow-md transition-all ${colors.hover} cursor-pointer`}
      onClick={onShowDetails}
    >
      <div className="flex flex-col space-y-3">
        {/* Primary Detail */}
        <div className={`${colors.light} p-2 rounded-md`}>
          <p className={`${colors.text} font-medium text-sm`}>
            {persona.primaryDetail}
          </p>
        </div>

        {/* Avatar and Basic Info */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
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

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium text-gray-900 truncate">
              {persona.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">
              {persona.jobTitle}
            </p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {persona.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
