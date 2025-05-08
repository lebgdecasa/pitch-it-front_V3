import React from 'react';
import { Info } from 'lucide-react';

interface ObjectivesStepProps {
  objectives: {
    problemValidation: boolean;
    pricingFeedback: boolean;
    usabilityTesting: boolean;
    conceptTesting: boolean;
    customObjective: string;
  };
  updateObjectives: (objectives: any) => void;
}

const ObjectivesStep: React.FC<ObjectivesStepProps> = ({ objectives, updateObjectives }) => {
  // Handle checkbox changes
  const handleCheckboxChange = (key: string) => {
    updateObjectives({
      ...objectives,
      [key]: !objectives[key as keyof typeof objectives],
    });
  };

  // Handle text input changes
  const handleCustomObjectiveChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateObjectives({
      ...objectives,
      customObjective: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">What are your research objectives?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select the primary goals for your user testing. This helps us tailor the feedback collection process.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-4">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            Focusing on specific objectives will lead to more actionable insights. We recommend selecting 1-2 primary objectives.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem Validation */}
        <div
          onClick={() => handleCheckboxChange('problemValidation')}
          className={`rounded-lg border cursor-pointer p-4 transition-colors ${
            objectives.problemValidation
              ? 'bg-blue-50 border-blue-300'
              : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
          }`}
        >
          <div className="flex items-start">
            <input
              type="checkbox"
              id="problemValidation"
              checked={objectives.problemValidation}
              onChange={() => handleCheckboxChange('problemValidation')}
              className="rounded text-blue-600 mr-3 mt-1"
            />
            <div>
              <label
                htmlFor="problemValidation"
                className="font-medium text-gray-900 cursor-pointer"
              >
                Problem Validation
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Confirm if your target users actually experience the problem you&apos;re solving
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Feedback */}
        <div
          onClick={() => handleCheckboxChange('pricingFeedback')}
          className={`rounded-lg border cursor-pointer p-4 transition-colors ${
            objectives.pricingFeedback
              ? 'bg-blue-50 border-blue-300'
              : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
          }`}
        >
          <div className="flex items-start">
            <input
              type="checkbox"
              id="pricingFeedback"
              checked={objectives.pricingFeedback}
              onChange={() => handleCheckboxChange('pricingFeedback')}
              className="rounded text-blue-600 mr-3 mt-1"
            />
            <div>
              <label
                htmlFor="pricingFeedback"
                className="font-medium text-gray-900 cursor-pointer"
              >
                Pricing Feedback
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Gauge willingness to pay and validate your pricing model
              </p>
            </div>
          </div>
        </div>

        {/* Usability Testing */}
        <div
          onClick={() => handleCheckboxChange('usabilityTesting')}
          className={`rounded-lg border cursor-pointer p-4 transition-colors ${
            objectives.usabilityTesting
              ? 'bg-blue-50 border-blue-300'
              : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
          }`}
        >
          <div className="flex items-start">
            <input
              type="checkbox"
              id="usabilityTesting"
              checked={objectives.usabilityTesting}
              onChange={() => handleCheckboxChange('usabilityTesting')}
              className="rounded text-blue-600 mr-3 mt-1"
            />
            <div>
              <label
                htmlFor="usabilityTesting"
                className="font-medium text-gray-900 cursor-pointer"
              >
                Trust and Credibility Assessment
              </label>
              <p className="text-sm text-gray-600 mt-1">
              Gauge whether users perceive your brand, product, or website as trustworthy
              </p>
            </div>
          </div>
        </div>

        {/* Concept Testing */}
        <div
          onClick={() => handleCheckboxChange('conceptTesting')}
          className={`rounded-lg border cursor-pointer p-4 transition-colors ${
            objectives.conceptTesting
              ? 'bg-blue-50 border-blue-300'
              : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
          }`}
        >
          <div className="flex items-start">
            <input
              type="checkbox"
              id="conceptTesting"
              checked={objectives.conceptTesting}
              onChange={() => handleCheckboxChange('conceptTesting')}
              className="rounded text-blue-600 mr-3 mt-1"
            />
            <div>
              <label
                htmlFor="conceptTesting"
                className="font-medium text-gray-900 cursor-pointer"
              >
                Concept Testing
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Evaluate the viability and appeal of your business concept
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Objective */}
      <div className="mt-6">
        <label htmlFor="customObjective" className="block text-sm font-medium text-gray-700 mb-1">
          Custom Research Objective (Optional)
        </label>
        <textarea
          id="customObjective"
          rows={3}
          value={objectives.customObjective}
          onChange={handleCustomObjectiveChange}
          placeholder="Describe any specific insights you're looking to gather..."
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
    </div>
  );
};

export default ObjectivesStep;
