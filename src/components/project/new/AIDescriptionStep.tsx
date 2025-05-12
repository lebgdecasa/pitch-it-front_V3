// src/components/project/new/AIDescriptionStep.tsx
import React from 'react';
import { Button } from '../../../components/ui/button';
import { Textarea } from '../../../components/ui/textarea';
import PitchAssistant from '../../pitch-assistant/PitchAssistant';
import { checkDimensions } from '../../pitch-assistant/pitch-dimensions';
import PitchExample from '../../pitch-assistant/PitchExample';
import { PitchDimension } from '@/types/pitch-assistant';

interface AIDescriptionStepProps {
  data: {
    description: string;
  };
  onDataChange: (data: { description: string }) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AIDescriptionStep: React.FC<AIDescriptionStepProps> = ({
  data,
  onDataChange,
  onNext,
  onBack
}) => {
  const [error, setError] = React.useState('');
  const [showAssistant, setShowAssistant] = React.useState(true);

  const { covered, next, feedback } = checkDimensions(data.description);

  const validate = (): boolean => {
    if (!data.description.trim()) {
      setError('Description is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Project Description</h3>
          </div>

          {next && (
            <div className="mt-4 mb-2 bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium text-gray-700 mb-1 text-sm">Tell me more about:</h4>
              <p className="text-sm font-semibold text-deep-blue">{next.name}</p>
              <p className="text-xs text-gray-600 mt-1">{next.description}</p>
              <PitchExample dimension={next} />
            </div>
          )}

          <Textarea
            value={data.description}
            onChange={(e) => onDataChange({ description: e.target.value })}
            placeholder="Describe your project. The AI assistant will guide you to cover all important aspects."
            className="h-64"
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          {feedback && (
            <div className="mt-4 mb-6 border-l-4 border-indigo-500 bg-indigo-50 p-3 rounded-r-md">
              <p className="text-sm text-gray-800">{feedback}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>

      <div className="md:col-span-1 bg-white rounded-lg border shadow-sm">
        <PitchAssistant
          coveredDimensions={covered}
          onClose={() => setShowAssistant(false)}
        />
      </div>
    </div>
  );
};
