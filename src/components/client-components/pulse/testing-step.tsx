import React, { useState, useEffect } from 'react';
import { Slider } from '@/ui/slider';
import { Users, Clock, DollarSign, Check } from 'lucide-react';

interface TestingStepProps {
  testing: {
    quantity: number;
    methods: {
      remoteTests: boolean;
      aiAssistedCalls: boolean;
      surveys: boolean;
      interviews: boolean;
    };
  };
  updateTesting: (testing: any) => void;
  calculateCost: () => number;
  calculateETA: () => string;
}

const TestingStep: React.FC<TestingStepProps> = ({
  testing,
  updateTesting,
  calculateCost,
  calculateETA
}) => {
  const [cost, setCost] = useState(calculateCost());
  const [eta, setEta] = useState(calculateETA());

  // Update cost and ETA when testing options change
  useEffect(() => {
    setCost(calculateCost());
    setEta(calculateETA());
  }, [testing, calculateCost, calculateETA]);

  // Handler for quantity slider
  const handleQuantityChange = (value: number[]) => {
    updateTesting({
      ...testing,
      quantity: value[0]
    });
  };

  // Handler for method toggles
  const handleMethodChange = (method: string) => {
    updateTesting({
      ...testing,
      methods: {
        ...testing.methods,
        [method]: !testing.methods[method as keyof typeof testing.methods]
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Parameters</h3>
        <p className="text-sm text-gray-600 mb-4">
          Define the scope and methodology of your user testing.
        </p>
      </div>

      {/* Participant quantity slider */}
      <div className="bg-gray-50 p-5 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-900">Number of Participants</h4>
          <span className="text-lg font-semibold text-blue-600">{testing.quantity}</span>
        </div>

        <div className="px-2 mb-6">
          <Slider
            defaultValue={[testing.quantity]}
            min={5}
            max={100}
            step={5}
            onValueChange={handleQuantityChange}
          />

          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">5</span>
            <span className="text-xs text-gray-500">25</span>
            <span className="text-xs text-gray-500">50</span>
            <span className="text-xs text-gray-500">75</span>
            <span className="text-xs text-gray-500">100</span>
          </div>
        </div>

        <div className="flex items-center bg-blue-50 p-3 rounded-md">
          <Users className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-sm text-blue-700">
            {testing.quantity < 15
              ? 'Recommended for early feedback'
              : testing.quantity < 30
              ? 'Good sample size for qualitative insights'
              : 'Large sample provides statistical significance'}
          </span>
        </div>
      </div>

      {/* Testing Methods */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Testing Methods</h4>
        <p className="text-sm text-gray-600 mb-4">
          Select how you want to collect feedback from participants. You can combine multiple methods.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Remote Usability Tests */}
          <div
            onClick={() => handleMethodChange('remoteTests')}
            className={`rounded-lg border p-4 cursor-pointer transition-colors ${
              testing.methods.remoteTests
                ? 'bg-blue-50 border-blue-300'
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-start">
              <input
                type="checkbox"
                id="remoteTests"
                checked={testing.methods.remoteTests}
                onChange={() => handleMethodChange('remoteTests')}
                className="rounded text-blue-600 mr-3 mt-1"
              />
              <div>
                <label
                  htmlFor="remoteTests"
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  Remote Usability Tests
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Recorded sessions of users interacting with your product
                </p>
                <div className="mt-2 flex items-center">
                  <DollarSign className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">+$15 per participant</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI-Assisted Calls */}
          <div
            onClick={() => handleMethodChange('aiAssistedCalls')}
            className={`rounded-lg border p-4 cursor-pointer transition-colors ${
              testing.methods.aiAssistedCalls
                ? 'bg-blue-50 border-blue-300'
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-start">
              <input
                type="checkbox"
                id="aiAssistedCalls"
                checked={testing.methods.aiAssistedCalls}
                onChange={() => handleMethodChange('aiAssistedCalls')}
                className="rounded text-blue-600 mr-3 mt-1"
              />
              <div>
                <label
                  htmlFor="aiAssistedCalls"
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  AI-Assisted Calls
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Phone interviews with AI-powered conversation guidance
                </p>
                <div className="mt-2 flex items-center">
                  <DollarSign className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">+$15 per participant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Surveys */}
          <div
            onClick={() => handleMethodChange('surveys')}
            className={`rounded-lg border p-4 cursor-pointer transition-colors ${
              testing.methods.surveys
                ? 'bg-blue-50 border-blue-300'
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-start">
              <input
                type="checkbox"
                id="surveys"
                checked={testing.methods.surveys}
                onChange={() => handleMethodChange('surveys')}
                className="rounded text-blue-600 mr-3 mt-1"
              />
              <div>
                <label
                  htmlFor="surveys"
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  Surveys
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Structured questionnaires with qualitative and quantitative data
                </p>
                <div className="mt-2 flex items-center">
                  <Check className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">Included in base price</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interviews */}
          <div
            onClick={() => handleMethodChange('interviews')}
            className={`rounded-lg border p-4 cursor-pointer transition-colors ${
              testing.methods.interviews
                ? 'bg-blue-50 border-blue-300'
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-start">
              <input
                type="checkbox"
                id="interviews"
                checked={testing.methods.interviews}
                onChange={() => handleMethodChange('interviews')}
                className="rounded text-blue-600 mr-3 mt-1"
              />
              <div>
                <label
                  htmlFor="interviews"
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  1-on-1 Interviews
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  In-depth conversations with expert moderation
                </p>
                <div className="mt-2 flex items-center">
                  <DollarSign className="h-3 w-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">+$25 per participant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost & Timeline Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mt-6">
        <h4 className="font-medium text-gray-900 mb-4">Summary</h4>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Estimated Cost</span>
            </div>
            <span className="font-semibold text-gray-900">${cost.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Estimated Turnaround</span>
            </div>
            <span className="font-semibold text-gray-900">{eta}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingStep;
