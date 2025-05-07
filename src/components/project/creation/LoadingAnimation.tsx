// src/components/project/creation/LoadingAnimation.tsx
import React from 'react';

interface LoadingAnimationProps {
  size?: number;
  color?: string;
}

export default function LoadingAnimation({ 
  size = 24,
  color = '#3B82F6'
}: LoadingAnimationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeDasharray="31.415926535897932 31.415926535897932"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}