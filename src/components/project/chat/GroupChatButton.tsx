// src/components/project/chat/GroupChatButton.tsx
"use client";

import React from 'react';
import { Button } from '../../../components/ui/button';
import { MessageCircle } from 'lucide-react';

interface GroupChatButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const GroupChatButton: React.FC<GroupChatButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <Button
        onClick={onClick}
        disabled={disabled}
        size="lg"
        className="w-full py-6 text-lg font-medium bg-indigo-600 hover:bg-indigo-700 
                   shadow-lg hover:shadow-xl transition-all duration-200 
                   flex items-center justify-center space-x-2"
      >
        <MessageCircle className="h-6 w-6" />
        <span>Chat with Personas</span>
      </Button>
    </div>
  );
};

export default GroupChatButton;