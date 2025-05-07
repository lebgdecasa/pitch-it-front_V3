// src/components/project/dashboard/NextSteps.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { MessageSquare, BarChart2, Presentation, Video, Share2, Lock } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card } from '@/ui/card';
import { Tooltip } from '../../../components/ui/tooltip';
import { NextStep } from '../../../mocks/next-steps';

interface NextStepsProps {
  steps: NextStep[];
  completedSteps: string[];
  projectId: string;
}

const iconMap = {
  chat: MessageSquare,
  chart: BarChart2,
  presentation: Presentation,
  video: Video,
  share: Share2,
};

export default function NextSteps({ steps, completedSteps, projectId }: NextStepsProps) {
  const isStepUnlocked = (step: NextStep): boolean => {
    if (!step.isLocked) return true;
    return step.unlockCondition.requiredSteps.every(
      requiredStep => completedSteps.includes(requiredStep)
    );
  };

  const renderStepButton = (step: NextStep) => {
    const Icon = iconMap[step.icon];
    const isUnlocked = isStepUnlocked(step);
    const buttonContent = (
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4" />
        <span>{step.action}</span>
        {!isUnlocked && <Lock className="h-4 w-4 ml-1" />}
      </div>
    );

    return (

        <Tooltip content={step.tooltip ?? step.action}>
            <div className="w-full">
              {isUnlocked ? (
                <Button
                  variant="default"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/project/${projectId}${step.href}`}>
                    {buttonContent}
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start opacity-75"
                  disabled
                >
                  {buttonContent}
                </Button>
              )}
            </div>
        </Tooltip>
    );
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {renderStepButton(step)}
          </div>
        ))}
      </div>
    </Card>
  );
}
