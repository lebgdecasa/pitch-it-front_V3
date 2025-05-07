import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PitchDimension } from '../../types/pitch-assistant';

interface PitchExampleProps {
  dimension: PitchDimension;
}

const PitchExample: React.FC<PitchExampleProps> = ({ dimension }) => {
  const [showExample, setShowExample] = useState(false);
  
  return (
    <div className="mt-3">
      <button
        onClick={() => setShowExample(!showExample)}
        className="text-xs flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        {showExample ? (
          <>
            <ChevronUp size={14} className="mr-1" />
            Hide example
          </>
        ) : (
          <>
            <ChevronDown size={14} className="mr-1" />
            See example
          </>
        )}
      </button>
      
      {showExample && (
        <div className="mt-2 text-xs bg-white p-2 rounded border border-gray-200">
          <p className="text-gray-700 italic">{dimension.example}</p>
        </div>
      )}
    </div>
  );
};

export default PitchExample;