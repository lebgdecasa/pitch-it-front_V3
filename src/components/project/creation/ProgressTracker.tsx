// src/components/project/creation/ProgressTracker.tsx
"use client";

import React, { useEffect, useState } from 'react';
import LoadingAnimation from './LoadingAnimation';
import { Card } from '@/ui/card';
import { Progress } from '@/ui/progress';
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: number; // in seconds
}

const initialSteps: Step[] = [
  {
    id: 'details',
    title: 'Project Details',
    description: 'Processing project information and requirements',
    status: 'pending',
    estimatedTime: 30
  },
  {
    id: 'analysis',
    title: 'Analysis Computation',
    description: 'Analyzing market data and project viability',
    status: 'pending',
    estimatedTime: 60
  },
  {
    id: 'documents',
    title: 'Document Processing',
    description: 'Processing and organizing project documents',
    status: 'pending',
    estimatedTime: 45
  },
  {
    id: 'deck',
    title: 'Pitch Deck Generation',
    description: 'Creating initial pitch deck from project data',
    status: 'pending',
    estimatedTime: 30
  }
];

export default function ProgressTracker() {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(
    initialSteps.reduce((acc, step) => acc + step.estimatedTime, 0)
  );

  useEffect(() => {
    // Simulated progress update
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const currentStep = newSteps[currentStepIndex];

        if (currentStep && currentStep.status !== 'completed') {
          currentStep.status = 'in-progress';

          // Simulate step completion
          if (Math.random() < 0.1) {
            currentStep.status = 'completed';
            if (currentStepIndex < newSteps.length - 1) {
              setCurrentStepIndex(prev => prev + 1);
            }
          }
        }

        return newSteps;
      });

      // Update overall progress
      setOverallProgress(prev => {
        const newProgress = Math.min(prev + 1, 100);
        if (newProgress === 100) {
          clearInterval(interval);
        }
        return newProgress;
      });

      // Update remaining time
      setRemainingTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStepIndex]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Creating Your Project</h2>
          <p className="text-muted-foreground">
            Estimated time remaining: {formatTime(remainingTime)}
          </p>
        </div>

        <Progress value={overallProgress} className="w-full h-2" />

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                step.status === 'in-progress' ? 'bg-blue-50' : ''
              }`}
            >
              {step.status === 'completed' ? (
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
              ) : step.status === 'in-progress' ? (
                <LoadingAnimation size={24} />
              ) : (
                <Clock className="w-6 h-6 text-gray-400 flex-shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">
                    {step.title}
                  </h3>
                  {index < steps.length - 1 && step.status === 'completed' && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>

              <div className="text-sm text-muted-foreground">
                {step.status === 'completed' ? (
                  'Completed'
                ) : step.status === 'in-progress' ? (
                  'In Progress'
                ) : (
                  'Pending'
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
