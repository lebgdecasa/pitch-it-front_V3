// src/components/project/ActionButtons.tsx

import React from 'react';
import { Button } from '../../components/ui/button';
// Corrected import: Only Tooltip is available from your custom component
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Users, Activity, FileEdit, Video } from 'lucide-react';

interface ActionButtonsProps {
  projectId: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ projectId }) => {
  const renderButton = (
    icon: React.ReactNode,
    label: string,
    redirectUrl: string
  ) => {
    return (
      <Button
        variant="outline"
        size="lg"
        className="w-full mb-3 flex items-center justify-start space-x-3 h-14 bg-blue-500 text-white"
        onClick={() => window.location.href = redirectUrl}
      >
        <span className="text-white">
          {icon}
        </span>
        <span className="text-white">
          {label}
        </span>
      </Button>
    );
  };

  return (
    <div className="w-full space-y-2">
      {renderButton(
        <Users className="h-5 w-5" />, 'Chat with Personas', `/project/${projectId}/chat`)}
      {renderButton(
        <Activity className="h-5 w-5" />, 'Run Pulse', `/project/${projectId}/pulse`)}
      {renderButton(
        <FileEdit className="h-5 w-5" />, 'Edit Pitch Deck', `/project/${projectId}/deck/edit`)}
      {renderButton(
        <Video className="h-5 w-5" />, 'Virtual VC Pitch', `/project/${projectId}/virtual-vc/setup`)}
    </div>
  );
};

export default ActionButtons;
