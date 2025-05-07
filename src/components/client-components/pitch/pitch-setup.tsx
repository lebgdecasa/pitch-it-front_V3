"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Users, ClipboardList, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Label } from '../../../ui/label';
import { Separator } from '../../../ui/separator';
import PersonaSelector from './persona-selector';
import DifficultySlider from './difficulty-slider';
import PaymentDialog from './payment-dialog';
import { vcPersonas } from '@/mocks/pitch-data';

interface PitchSetupProps {
  projectId: string;
  projectName: string;
}

export default function PitchSetup({ projectId, projectName }: PitchSetupProps) {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState(vcPersonas[0].id);
  const [difficulty, setDifficulty] = useState(50);
  const [duration, setDuration] = useState<'short' | 'standard'>('standard');
  const [mode, setMode] = useState<'practice' | 'evaluation'>('practice');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleStartPitch = () => {
    if (mode === 'evaluation') {
      // For evaluation mode, show payment dialog
      setShowPaymentDialog(true);
    } else {
      // For practice mode, start immediately without payment
      saveConfigAndNavigate();
    }
  };

  const handlePaymentComplete = () => {
    setShowPaymentDialog(false);
    saveConfigAndNavigate();
  };

  const saveConfigAndNavigate = () => {
    // Save configuration to local storage
    const selectedPersonaObj = vcPersonas.find(p => p.id === selectedPersona);
    const config = {
      personaId: selectedPersona,
      personaName: selectedPersonaObj?.name || '',
      personaSpecialty: selectedPersonaObj?.specialty || '',
      difficulty,
      duration,
      mode,
      startTime: new Date().toISOString()
    };

    localStorage.setItem(`pitch-session-${projectId}`, JSON.stringify(config));
    router.push(`/project/${projectId}/pitch/session`);
  };

  return (
    <div className="space-y-6">
      <Card className="border border-purple-100">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="text-lg text-purple-800">Configure Your Pitch Session</CardTitle>
          <CardDescription>Customize your virtual pitching experience</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Investor Persona Selection */}
            <div>
              <Label className="text-base font-medium text-gray-900 block mb-3">Select Investor Persona</Label>
              <PersonaSelector
                personas={vcPersonas}
                selectedPersonaId={selectedPersona}
                onSelectPersona={setSelectedPersona}
              />
            </div>

            <Separator className="my-6" />

            {/* Difficulty Level */}
            <div>
              <Label className="text-base font-medium text-gray-900 block mb-3">
                Conversation Difficulty
              </Label>
              <DifficultySlider
                difficulty={difficulty}
                onChange={setDifficulty}
              />
            </div>

            <Separator className="my-6" />

            {/* Session Options */}
            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-900 block mb-3">Session Options</Label>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Duration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      duration === 'short' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setDuration('short')}
                  >
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium mb-1">Short Session (5 min)</h5>
                        <p className="text-sm text-gray-500">Quick elevator pitch with basic feedback</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      duration === 'standard' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setDuration('standard')}
                  >
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium mb-1">Standard Session (15 min)</h5>
                        <p className="text-sm text-gray-500">Full pitch with in-depth questions and feedback</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Mode</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      mode === 'practice' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setMode('practice')}
                  >
                    <div className="flex items-start">
                      <ClipboardList className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium mb-1">Practice Mode</h5>
                        <p className="text-sm text-gray-500">Free mode with basic feedback</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      mode === 'evaluation' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setMode('evaluation')}
                  >
                    <div className="flex items-start">
                      <Briefcase className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center">
                          <h5 className="font-medium mb-1">Evaluation Mode</h5>
                          <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded">Pro</span>
                        </div>
                        <p className="text-sm text-gray-500">Detailed analysis and scoring of your pitch</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-100">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-800 mb-1">Session Information</h4>
                <p className="text-sm text-blue-700">
                  {mode === 'practice' ?
                    'Practice Mode is free but has limited feedback. For comprehensive analysis and detailed scoring, upgrade to Evaluation Mode.' :
                    'Evaluation Mode costs $49 and provides detailed scoring, analysis, and recommendations from our AI investors.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end">
            <Button
              variant="default"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleStartPitch}
            >
              Start Pitch Session
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      {showPaymentDialog && (
        <PaymentDialog
          projectId={projectId}
          projectName={projectName}
          amount={49}
          onClose={() => setShowPaymentDialog(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}
