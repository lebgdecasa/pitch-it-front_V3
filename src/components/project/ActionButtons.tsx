// src/components/project/ActionButtons.tsx

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
// Corrected import: Only Tooltip is available from your custom component
import { Tooltip } from '../../components/ui/tooltip';
import { Users, Activity, FileEdit, Video } from 'lucide-react';

interface ProjectState {
  hasChatted: boolean;
  hasPulse: boolean;
  hasEditedDeck: boolean;
}

interface ActionButtonsProps {
  projectId: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ projectId }) => {
  const [projectState, setProjectState] = useState<ProjectState>({
    hasChatted: false,
    hasPulse: false,
    hasEditedDeck: false
  });

  const isVirtualPitchUnlocked = () => {
    return projectState.hasChatted && projectState.hasPulse && projectState.hasEditedDeck;
  };

  const handleButtonClick = (action: keyof ProjectState) => {
    setProjectState(prev => ({
      ...prev,
      [action]: true
    }));

    // Note: Checking projectState immediately after setProjectState might use stale state.
    // For more complex scenarios or if immediate reaction to the new state is critical here,
    // consider using useEffect or checking based on a 'nextState' variable.
    // However, for this specific navigation, if 'isVirtualPitchUnlocked' relies on multiple states
    // and 'hasChatted' is the last one to be set, this logic might be what's intended.
    const nextState = { ...projectState, [action]: true };
    const pitchUnlockedAfterThisAction = nextState.hasChatted && nextState.hasPulse && nextState.hasEditedDeck;

    if (action === 'hasChatted' && pitchUnlockedAfterThisAction) {
      window.location.href = `/project/${projectId}/virtual-vc/setup`;
      return;
    }
  };

  const renderButton = (
    icon: React.ReactNode,
    label: string,
    action: keyof ProjectState,
    isLocked = false
  ) => {
    const button = (
      <Button
        variant="outline"
        size="lg"
        className="w-full mb-3 flex items-center justify-start space-x-3 h-14"
        onClick={() => handleButtonClick(action)}
        disabled={isLocked}
      >
        <span className={`${isLocked ? 'text-gray-400' : 'text-primary'}`}>
          {icon}
        </span>
        <span className={`${isLocked ? 'text-gray-400' : 'text-gray-700'}`}>
          {label}
        </span>
      </Button>
    );

    if (isLocked) {
      return (
        <Tooltip
          key={label}
          // Now you can pass JSX directly to the content prop
          content={<p>Complete earlier steps to unlock</p>}
        >
          {button}
        </Tooltip>
      );
    }

    return <div key={label}>{button}</div>;
  };

  return (
    <div className="w-full space-y-2">
      {renderButton(
        <Users className="h-5 w-5" />,
        'Chat with Personas',
        'hasChatted'
      )}
      {renderButton(
        <Activity className="h-5 w-5" />,
        'Run Pulse',
        'hasPulse'
      )}
      {renderButton(
        <FileEdit className="h-5 w-5" />,
        'Edit Pitch Deck',
        'hasEditedDeck'
      )}
      {renderButton(
        <Video className="h-5 w-5" />,
        'Virtual VC Pitch',
        'hasChatted',
        !isVirtualPitchUnlocked()
      )}
    </div>
  );
};

export default ActionButtons;
