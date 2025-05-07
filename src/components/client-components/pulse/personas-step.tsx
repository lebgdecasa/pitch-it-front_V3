import React, { useState } from 'react';
import { X, Plus, UserPlus, Users } from 'lucide-react';
import { useAppContext } from '../../../providers/app-provider';
import { Button } from '../../../components/ui/button';

interface PersonasStepProps {
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
  updatePersonas: (personas: any) => void;
  projectId: string;
}

const PersonasStep: React.FC<PersonasStepProps> = ({ personas, updatePersonas, projectId }) => {
  const { state } = useAppContext();
  const project = state.projects.find(p => p.id === projectId);
  
  const [customQuestion, setCustomQuestion] = useState('');
  
  // AI-generated personas based on project data
  const suggestedPersonas = [
    {
      id: 'persona1',
      name: 'Tech-savvy Professionals',
      description: 'Career-focused individuals who embrace technology in their daily work',
      demographics: '25-45 years old, urban, college-educated',
      behaviors: ['Early adopters', 'Heavy smartphone users', 'Values efficiency']
    },
    {
      id: 'persona2',
      name: 'Small Business Owners',
      description: 'Entrepreneurs looking for solutions to optimize their business operations',
      demographics: '30-55 years old, diverse locations, business-minded',
      behaviors: ['Cost-conscious', 'Time-strapped', 'Practical decision makers']
    },
    {
      id: 'persona3',
      name: 'Digital Parents',
      description: 'Parents who use digital tools to manage family life and responsibilities',
      demographics: '28-45 years old, suburban, family-oriented',
      behaviors: ['Research-driven', 'Safety-conscious', 'Community-focused']
    },
    {
      id: 'persona4',
      name: project?.industry === 'Healthcare' ? 'Health Conscious Consumers' : 'Eco-conscious Consumers',
      description: project?.industry === 'Healthcare' 
        ? 'Individuals actively managing their health and wellness' 
        : 'People who prioritize sustainability in their purchasing decisions',
      demographics: '22-65 years old, health-focused, higher income',
      behaviors: project?.industry === 'Healthcare' 
        ? ['Wellness-oriented', 'Health tracker users', 'Prevention-focused'] 
        : ['Research brands', 'Willing to pay premium for sustainable options', 'Minimize waste']
    },
    {
      id: 'persona5',
      name: 'Budget Shoppers',
      description: 'Price-sensitive consumers looking for the best value',
      demographics: '18-65 years old, varied locations, value-driven',
      behaviors: ['Comparison shoppers', 'Coupon users', 'Brand-flexible']
    }
  ];

  // Handler to toggle persona selection
  const handlePersonaToggle = (persona: any) => {
    const isSelected = personas.selected.some(p => p.id === persona.id);
    
    if (isSelected) {
      // Remove from selected
      updatePersonas({
        ...personas,
        selected: personas.selected.filter(p => p.id !== persona.id)
      });
    } else {
      // Add to selected
      updatePersonas({
        ...personas,
        selected: [...personas.selected, persona]
      });
    }
  };

  // Handler to add custom screener question
  const handleAddQuestion = () => {
    if (customQuestion.trim() !== '') {
      updatePersonas({
        ...personas,
        customScreenerQuestions: [...personas.customScreenerQuestions, customQuestion]
      });
      setCustomQuestion('');
    }
  };

  // Handler to remove custom screener question
  const handleRemoveQuestion = (index: number) => {
    updatePersonas({
      ...personas,
      customScreenerQuestions: personas.customScreenerQuestions.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Target Personas</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose the user personas that best represent your target audience. We&apos;ll recruit testers who match these profiles.
        </p>
      </div>

      <div className="bg-amber-50 p-4 rounded-md mb-6">
        <div className="flex">
          <Users className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            We recommend selecting 1-3 personas for focused feedback. Each additional persona increases the diversity of perspectives.
          </p>
        </div>
      </div>

      {/* AI-generated personas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestedPersonas.map(persona => {
          const isSelected = personas.selected.some(p => p.id === persona.id);
          
          return (
            <div
              key={persona.id}
              onClick={() => handlePersonaToggle(persona)}
              className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                isSelected 
                  ? 'bg-blue-50 border-blue-300' 
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">{persona.name}</h4>
                <input 
                  type="checkbox" 
                  checked={isSelected} 
                  onChange={() => handlePersonaToggle(persona)} 
                  className="rounded text-blue-600 h-5 w-5"
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{persona.description}</p>
              <div className="mt-3">
                <span className="text-xs font-medium text-gray-500 block mb-1">Demographics</span>
                <p className="text-xs text-gray-700">{persona.demographics}</p>
              </div>
              <div className="mt-2">
                <span className="text-xs font-medium text-gray-500 block mb-1">Behaviors</span>
                <div className="flex flex-wrap gap-1">
                  {persona.behaviors.map((behavior, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">
                      {behavior}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Screener Questions */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-900 mb-2">Custom Screener Questions (Optional)</h4>
        <p className="text-sm text-gray-600 mb-4">
          Add specific qualifying questions for test participants. These help ensure we find the right users for your testing.
        </p>
        
        <div className="space-y-3 mb-4">
          {personas.customScreenerQuestions.map((question, index) => (
            <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
              <span className="text-sm text-gray-700 flex-grow">{question}</span>
              <button 
                onClick={() => handleRemoveQuestion(index)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="e.g., Have you purchased a subscription service in the last 3 months?"
            className="flex-grow p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <Button 
            onClick={handleAddQuestion}
            disabled={customQuestion.trim() === ''}
            variant="outline"
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 text-sm text-gray-600">
          <UserPlus className="h-4 w-4 inline mr-1" />
          <span>You can add up to 5 custom screening questions</span>
        </div>
      </div>
    </div>
  );
};

export default PersonasStep;