import React, { useEffect, useState } from 'react';
import { Circle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '@/ui/card';

const TOTAL_DURATION = 8000; // 8 seconds total
const MOCK_PROJECT_ID = '123';

interface AnalysisStep {
  id: number;
  label: string;
  completed: boolean;
}

export const AnalysisProgress: React.FC = () => {
  const router = useRouter();
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { id: 1, label: 'Reading documents', completed: false },
    { id: 2, label: 'Running key-trend analysis', completed: false },
    { id: 3, label: 'Running netnographic analysis', completed: false },
    { id: 4, label: 'Computing financial metrics', completed: false },
    { id: 5, label: 'Generating personas', completed: false },
    { id: 6, label: 'Creating initial pitch deck', completed: false },
  ]);

  useEffect(() => {
    // Calculate time per step
    const stepDuration = TOTAL_DURATION / steps.length;

    // Progressively complete steps
    steps.forEach((step, index) => {
      setTimeout(() => {
        setSteps(prevSteps =>
          prevSteps.map(s =>
            s.id === step.id ? { ...s, completed: true } : s
          )
        );

        // Navigate after last step is complete
        if (index === steps.length - 1) {
          setTimeout(() => {
            router.push(`/project/project-4`);
          }, 500); // Small delay before navigation
        }
      }, stepDuration * index);
    });
  }, [router]);

  return (
    <div className="fixed inset-0 bg-gray-50/90 backdrop-blur-sm flex items-center justify-center">
      <Card className="w-full max-w-xl p-8 shadow-lg">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Analyzing Your Project
          </h2>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-300 ${
                  step.completed ? 'bg-green-50' : 'bg-white'
                }`}
              >
                <div className="transition-transform duration-300 transform">
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    step.completed ? 'text-green-700' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm text-center text-gray-500 mt-6">
            Please wait while we analyze your project data
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AnalysisProgress;
