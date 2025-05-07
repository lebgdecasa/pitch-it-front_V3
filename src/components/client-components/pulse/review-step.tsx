import React from 'react';
import { CheckCircle, Flag, Users, Target, BarChart } from 'lucide-react';

interface ReviewStepProps {
  formData: {
    objectives: {
      problemValidation: boolean;
      pricingFeedback: boolean;
      usabilityTesting: boolean;
      conceptTesting: boolean;
      customObjective: string;
    };
    personas: {
      selected: Array<{
        id: string;
        name: string;
        description: string;
        demographics: string;
        behaviors: string[];
      }>;
      customScreenerQuestions: string[];
    };
    testing: {
      quantity: number;
      methods: {
        remoteTests: boolean;
        aiAssistedCalls: boolean;
        surveys: boolean;
        interviews: boolean;
      };
    };
  };
  projectName: string;
  cost: number;
  eta: string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ 
  formData, 
  projectName,
  cost,
  eta
}) => {
  // Helper function to get selected objectives
  const getSelectedObjectives = () => {
    const objectives = [];
    
    if (formData.objectives.problemValidation) objectives.push('Problem Validation');
    if (formData.objectives.pricingFeedback) objectives.push('Pricing Feedback');
    if (formData.objectives.usabilityTesting) objectives.push('Usability Testing');
    if (formData.objectives.conceptTesting) objectives.push('Concept Testing');
    
    return objectives;
  };
  
  // Helper function to get selected methods
  const getSelectedMethods = () => {
    const methods = [];
    
    if (formData.testing.methods.remoteTests) methods.push('Remote Usability Tests');
    if (formData.testing.methods.aiAssistedCalls) methods.push('AI-Assisted Calls');
    if (formData.testing.methods.surveys) methods.push('Surveys');
    if (formData.testing.methods.interviews) methods.push('1-on-1 Interviews');
    
    return methods;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your Request</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please review your Real-World Pulse setup before submission.
        </p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h4 className="font-medium text-blue-800 flex items-center mb-2">
          <CheckCircle className="h-5 w-5 mr-2" />
          Summary for {projectName}
        </h4>
        <p className="text-sm text-blue-700">
          You&apos;re commissioning user feedback from {formData.testing.quantity} participants 
          across {formData.personas.selected.length} user personas. 
          Estimated delivery in {eta}.
        </p>
      </div>
      
      {/* Research Objectives */}
      <div className="bg-white p-5 rounded-lg border border-gray-200">
        <div className="flex items-center mb-3">
          <Flag className="h-5 w-5 text-gray-500 mr-2" />
          <h4 className="font-medium text-gray-900">Research Objectives</h4>
        </div>
        
        <div className="pl-7">
          {getSelectedObjectives().length > 0 ? (
            <ul className="list-disc text-sm text-gray-700 space-y-1 ml-4">
              {getSelectedObjectives().map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No objectives selected</p>
          )}
          
          {formData.objectives.customObjective && (
            <div className="mt-2">
              <span className="text-sm font-medium text-gray-700">Custom objective:</span>
              <p className="text-sm text-gray-700 mt-1">{formData.objectives.customObjective}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Target Personas */}
      <div className="bg-white p-5 rounded-lg border border-gray-200">
        <div className="flex items-center mb-3">
          <Users className="h-5 w-5 text-gray-500 mr-2" />
          <h4 className="font-medium text-gray-900">Target Personas</h4>
        </div>
        
        <div className="pl-7 space-y-3">
          {formData.personas.selected.length > 0 ? (
            formData.personas.selected.map(persona => (
              <div key={persona.id} className="pb-2 mb-2 border-b border-gray-100">
                <h5 className="font-medium text-gray-800 mb-1">{persona.name}</h5>
                <p className="text-sm text-gray-600">{persona.description}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No personas selected</p>
          )}
          
          {formData.personas.customScreenerQuestions.length > 0 && (
            <div className="mt-3">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Screener Questions:</h5>
              <ul className="list-decimal text-sm text-gray-700 space-y-1 ml-4">
                {formData.personas.customScreenerQuestions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Testing Methods */}
      <div className="bg-white p-5 rounded-lg border border-gray-200">
        <div className="flex items-center mb-3">
          <Target className="h-5 w-5 text-gray-500 mr-2" />
          <h4 className="font-medium text-gray-900">Testing Parameters</h4>
        </div>
        
        <div className="pl-7">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-700">Number of participants:</span>
            <span className="font-medium text-gray-900">{formData.testing.quantity}</span>
          </div>
          
          <h5 className="text-sm font-medium text-gray-700 mb-2">Selected methods:</h5>
          {getSelectedMethods().length > 0 ? (
            <ul className="list-disc text-sm text-gray-700 space-y-1 ml-4">
              {getSelectedMethods().map((method, index) => (
                <li key={index}>{method}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No methods selected</p>
          )}
        </div>
      </div>
      
      {/* Cost Summary */}
      <div className="bg-white p-5 rounded-lg border border-gray-200">
        <div className="flex items-center mb-3">
          <BarChart className="h-5 w-5 text-gray-500 mr-2" />
          <h4 className="font-medium text-gray-900">Cost & Timeline</h4>
        </div>
        
        <div className="pl-7">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-700">Total Cost:</span>
            <span className="font-bold text-gray-900">${cost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-700">Expected Delivery:</span>
            <span className="font-medium text-gray-900">{eta}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-600">
        <p>
          By clicking &quot;Submit Order,&quot; you agree to commission this research. 
          You&apos;ll have an opportunity to provide any additional materials or context 
          after payment. You can track the progress of your research in real-time 
          after submission.
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;