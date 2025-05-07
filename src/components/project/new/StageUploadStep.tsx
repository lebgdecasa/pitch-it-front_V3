// src/components/project/new/StageUploadStep.tsx
import React from 'react';
import { Button } from '../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Upload } from 'lucide-react';

interface StageUploadStepProps {
  data: {
    stage: string;
    hasFiles?: boolean;
  };
  onDataChange: (data: { stage: string; hasFiles?: boolean }) => void;
  onNext: () => void;
  onBack: () => void;
}

const stages = [
  'Idea',
  'Prototype',
  'MVP',
  'Pre-seed',
  'Seed',
  'Series A',
  'Later-stage'
];

export const StageUploadStep: React.FC<StageUploadStepProps> = ({
  data,
  onDataChange,
  onNext,
  onBack
}) => {
  const [error, setError] = React.useState('');

  const validate = (): boolean => {
    if (!data.stage) {
      setError('Please select a project stage');
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

  const showUploadZone = !['Idea', 'Prototype'].includes(data.stage);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Project Stage</label>
          <Select
            value={data.stage}
            onValueChange={(value) => onDataChange({ ...data, stage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        {showUploadZone && (
          <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors">
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div>
                <p className="text-base font-medium">Upload project files</p>
                <p className="text-sm text-gray-500">
                  Drag and drop your files here or click to browse
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Create Project
        </Button>
      </div>
    </div>
  );
};