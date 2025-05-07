"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useAppContext } from '../../providers/app-provider';
import { createNewProject } from '../../mocks';
import PitchAssistant from '../../components/pitch-assistant/PitchAssistant';
import { checkDimensions } from '../../components/pitch-assistant/pitch-dimensions';
import { PitchDimension } from '@/types/pitch-assistant';

// Step 1 - Project Basics Form
const ProjectBasicsForm = ({
  formData,
  onChange
}: {
  formData: { name: string; industry: string; };
  onChange: (field: string, value: string) => void;
}) => {
  return (
    <div className="space-y-6 py-4">
      <div>
        <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
          Project Name
        </label>
        <input
          id="project-name"
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-deep-blue focus:border-deep-blue"
          placeholder="e.g., EcoDelivery"
        />
      </div>

      <div>
        <label htmlFor="project-industry" className="block text-sm font-medium text-gray-700 mb-1">
          Industry
        </label>
        <select
          id="project-industry"
          value={formData.industry}
          onChange={(e) => onChange('industry', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-deep-blue focus:border-deep-blue"
        >
          <option value="" disabled>Select an industry</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Logistics">Logistics</option>
          <option value="Food & Beverage">Food & Beverage</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

// Step 2 - Interactive Pitch Description
const PitchDescriptionForm = ({
  fullDescription,
  onChange,
  coveredDimensions,
  nextDimension,
  feedbackMessage
}: {
  fullDescription: string;
  onChange: (value: string) => void;
  coveredDimensions: PitchDimension[];
  nextDimension: PitchDimension | null;
  feedbackMessage: string;
}) => {
  const [showAssistant, setShowAssistant] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when first mounting
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="py-4">
      <div className="flex flex-col md:flex-row gap-4 relative">
        {/* Main textarea */}
        <div className="flex-1">
          <label htmlFor="pitch-description" className="block text-sm font-medium text-gray-700 mb-1">
            Pitch Description
          </label>
          <textarea
            ref={textareaRef}
            id="pitch-description"
            rows={18}
            value={fullDescription}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-deep-blue focus:border-deep-blue"
            placeholder="Describe your business idea in detail. Cover all important aspects like the problem you're solving, your solution, target audience, etc."
          ></textarea>
        </div>

        {/* Mobile assistant toggle */}
        <div className="md:hidden">
          <Button
            onClick={() => setShowAssistant(!showAssistant)}
            className="fixed bottom-4 right-4 z-10 rounded-full px-4 py-2 bg-indigo-500 text-white shadow-lg flex items-center"
          >
            {showAssistant ? <X className="mr-2 h-4 w-4" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Pitch Assistant
          </Button>
        </div>

        {/* Assistant panel - shows as sidebar on desktop, bottom sheet on mobile */}
        {showAssistant && (
          <div
            className="fixed md:static bottom-0 left-0 right-0 md:w-80 bg-white shadow-lg md:shadow-none rounded-t-lg md:rounded-lg border border-gray-200 z-20 transform transition-transform max-h-[90vh] md:max-h-none overflow-auto"
          >
            <PitchAssistant
              coveredDimensions={coveredDimensions}
              nextDimension={nextDimension}
              feedbackMessage={feedbackMessage}
              onClose={() => setShowAssistant(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// Review & Create Step
const ReviewStep = ({
  formData,
  fullDescription
}: {
  formData: { name: string; industry: string; };
  fullDescription: string;
}) => {
  return (
    <div className="py-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-lg mb-4">Project Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Project Name</p>
            <p className="text-gray-900">{formData.name || 'Not specified'}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Industry</p>
            <p className="text-gray-900">{formData.industry || 'Not specified'}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-500">Full Description</p>
            <div className="bg-white p-3 border border-gray-200 rounded-md mt-1 whitespace-pre-wrap">
              {fullDescription || 'No description provided.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WizardPage() {
  const { state, dispatch } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    name: '',
    industry: ''
  });

  const [fullDescription, setFullDescription] = useState('');
  const [coveredDimensions, setCoveredDimensions] = useState<PitchDimension[]>([]);
  const [nextDimension, setNextDimension] = useState<PitchDimension | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Start by describing your business idea.');
  const [isApiLoading, setIsApiLoading] = useState(false);

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setFullDescription(value);

    // Use API if available or local heuristics
    const apiUrl = process.env.NEXT_PUBLIC_MGX_API;
    if (apiUrl) {
      // Set loading state
      setIsApiLoading(true);

      // API-based check with debouncing
      const timeout = setTimeout(() => {
        fetch(`${apiUrl}/check_description_completeness`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description: value })
        })
          .then(res => res.json())
          .then(data => {
            setCoveredDimensions(data.coveredDimensions || []);
            setNextDimension(data.nextDimension || null);
            setFeedbackMessage(data.feedback || '');
            setIsApiLoading(false);
          })
          .catch(err => {
            console.error('Error checking description completeness:', err);
            // Fallback to client-side heuristics
            const { covered, next, feedback } = checkDimensions(value);
            setCoveredDimensions(covered);
            setNextDimension(next);
            setFeedbackMessage(feedback);
            setIsApiLoading(false);
          });
      }, 500); // Debounce for 500ms

      return () => clearTimeout(timeout);
    } else {
      // Use client-side heuristics
      const { covered, next, feedback } = checkDimensions(value);
      setCoveredDimensions(covered);
      setNextDimension(next);
      setFeedbackMessage(feedback);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Create the project
      if (state.user) {
        const newProject = createNewProject(
          state.user.id,
          formData.name,
          '', // Empty description field as it's now stored in fullDescription
          formData.industry,
          fullDescription // Pass fullDescription directly to createNewProject
        );

        // We don't need to update the pitch object as fullDescription is already set

        dispatch({ type: 'CREATE_PROJECT', payload: newProject });

        // Redirect to the new project page
        window.location.href = `/project/${newProject.id}`;
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const stepContent = [
    <ProjectBasicsForm key="step1" formData={formData} onChange={handleFormChange} />,
    <PitchDescriptionForm
      key="step2"
      fullDescription={fullDescription}
      onChange={handleDescriptionChange}
      coveredDimensions={coveredDimensions}
      nextDimension={nextDimension}
      feedbackMessage={feedbackMessage}
    />,
    <ReviewStep key="step3" formData={formData} fullDescription={fullDescription} />
  ];

  const stepTitles = [
    "Project Basics",
    "Pitch Assistant",
    "Review & Create"
  ];

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !formData.name || !formData.industry;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-600 hover:text-deep-blue mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600 mt-1">Let&apos;s bring your business idea to life</p>
        </div>

        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 < currentStep
                    ? 'bg-green-500 text-white'
                    : index + 1 === currentStep
                    ? 'bg-deep-blue text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                <span className={`text-xs mt-1 ${
                  index + 1 === currentStep ? 'text-deep-blue font-medium' : 'text-gray-500'
                }`}>
                  {title}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 h-1 w-full bg-gray-200">
            <div
              className={`h-full ${isApiLoading && currentStep === 2 ? 'bg-deep-blue animate-pulse' : 'bg-deep-blue'}`}
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="mb-8">
          {stepContent[currentStep - 1]}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentStep === 1}
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              Continue
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Create Project
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
