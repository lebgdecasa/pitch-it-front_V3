import React from 'react';
import { Check, ChevronUp, ChevronDown, X } from 'lucide-react';
import { PitchDimension } from '../../types/pitch-assistant';
import PitchExample from './PitchExample';

interface PitchAssistantProps {
  coveredDimensions: PitchDimension[];
  nextDimension: PitchDimension | null;
  feedbackMessage: string;
  onClose: () => void;
}

const PitchAssistant: React.FC<PitchAssistantProps> = ({
  coveredDimensions,
  nextDimension,
  feedbackMessage,
  onClose
}) => {
  // Import all dimensions
  const { pitchDimensions } = require('./pitch-dimensions');
  const percentComplete = Math.floor((coveredDimensions.length / pitchDimensions.length) * 100);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-900 flex items-center">
          <span className="text-indigo-600 mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 9L15.5 14M8.5 14V9M12 12V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2C16.714 2 19.071 2 20.535 3.464C21.509 4.438 21.863 5.807 21.95 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          Pitch Assistant
        </h3>
        <button 
          onClick={onClose} 
          className="md:hidden p-1 rounded-full hover:bg-gray-100"
          aria-label="Close assistant"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Progress section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span className="font-medium text-gray-700">Progress</span>
          <span className="text-gray-600">{percentComplete}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
      </div>

      {/* Dimensions checklist */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">Key Dimensions</h4>
        <div className="space-y-2">
          {pitchDimensions.map((dimension: PitchDimension) => {
            const isCovered = coveredDimensions.some(d => d.id === dimension.id);
            return (
              <div 
                key={dimension.id} 
                className={`p-2 rounded-md flex items-center justify-between ${
                  isCovered ? 'bg-green-50' : 'bg-white'
                }`}
              >
                <span className="text-sm">{dimension.name}</span>
                <div 
                  className={`w-5 h-5 flex items-center justify-center rounded-full ${
                    isCovered ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  {isCovered && <Check size={12} className="text-white" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback section */}
      {feedbackMessage && (
        <div className="mb-6 border-l-4 border-indigo-500 bg-indigo-50 p-3 rounded-r-md">
          <p className="text-sm text-gray-800">{feedbackMessage}</p>
        </div>
      )}

      {/* Next dimension prompt */}
      {nextDimension && (
        <div className="mb-6 bg-gray-50 p-3 rounded-md">
          <h4 className="font-medium text-gray-700 mb-1 text-sm">Tell me more about:</h4>
          <p className="text-sm font-semibold text-deep-blue">{nextDimension.name}</p>
          <p className="text-xs text-gray-600 mt-1">{nextDimension.description}</p>
          
          {/* Example toggle */}
          <PitchExample dimension={nextDimension} />
        </div>
      )}
    </div>
  );
};

export default PitchAssistant;