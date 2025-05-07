"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';
import ObjectivesStep from '../../../../../components/client-components/pulse/objectives-step';
import PersonasStep from '../../../../../components/client-components/pulse/personas-step';
import TestingStep from '../../../../../components/client-components/pulse/testing-step';
import ReviewStep from '../../../../../components/client-components/pulse/review-step';
import PaymentDialog from '../../../../../components/client-components/pulse/payment-dialog';
import { useAppContext } from '../../../../../providers/app-provider';

export default function PulseWizardPage() {
  const { id } = useParams() as { id: string };
  const { state } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  // State for all form data across steps
  const [formData, setFormData] = useState({
    objectives: {
      problemValidation: false,
      pricingFeedback: false,
      usabilityTesting: false,
      conceptTesting: false,
      customObjective: ''
    },
    personas: {
      selected: [],
      customScreenerQuestions: []
    },
    testing: {
      quantity: 5,
      methods: {
        remoteTests: false,
        aiAssistedCalls: false,
        surveys: true,
        interviews: false
      }
    }
  });

  // Get project details
  const project = state.projects.find(p => p.id === id);
  
  // Calculated values based on selections
  const calculateCost = () => {
    let baseCost = formData.testing.quantity * 60; // $60 per tester
    
    // Additional costs based on methods
    if (formData.testing.methods.aiAssistedCalls) baseCost += formData.testing.quantity * 15;
    if (formData.testing.methods.interviews) baseCost += formData.testing.quantity * 25;
    
    return baseCost;
  };
  
  const calculateETA = () => {
    let baseDays = 3; // Base days
    
    // Additional days based on quantity and methods
    if (formData.testing.quantity > 20) baseDays += 1;
    if (formData.testing.quantity > 50) baseDays += 2;
    if (formData.testing.methods.interviews) baseDays += 2;
    
    return `${baseDays}-${baseDays + 2} business days`;
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Show payment dialog when finishing the last step
      setShowPaymentDialog(true);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = () => {
    // Redirect to results page after successful payment
    window.location.href = `/project/${id}/pulse/results`;
  };
  
  // Update form data from child components
  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };
  
  const stepContent = [
    <ObjectivesStep 
      key="objectives" 
      objectives={formData.objectives}
      updateObjectives={(data) => updateFormData('objectives', data)}
    />,
    <PersonasStep 
      key="personas" 
      personas={formData.personas}
      updatePersonas={(data) => updateFormData('personas', data)}
      projectId={id}
    />,
    <TestingStep 
      key="testing" 
      testing={formData.testing}
      updateTesting={(data) => updateFormData('testing', data)}
      calculateCost={calculateCost}
      calculateETA={calculateETA}
    />,
    <ReviewStep 
      key="review" 
      formData={formData}
      projectName={project?.name || 'Your Project'}
      cost={calculateCost()}
      eta={calculateETA()}
    />
  ];
  
  const stepTitles = [
    "Research Objectives",
    "Target Personas",
    "Testing Methods",
    "Review & Submit"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <Link href={`/project/${id}`} className="inline-flex items-center text-sm text-gray-600 hover:text-deep-blue mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Project
        </Link>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Real-World Pulse Setup</h1>
          <p className="text-gray-600 mt-1">Get valuable feedback from your target audience</p>
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
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                <span className={`text-xs mt-1 ${
                  index + 1 === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-2 h-1 w-full bg-gray-200">
            <div 
              className="h-full bg-blue-600" 
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
          
          <Button onClick={handleNext}>
            {currentStep < totalSteps ? (
              <>
                Continue
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : 'Review Order'}
          </Button>
        </div>
      </div>

      {/* Payment Dialog */}
      <PaymentDialog 
        open={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        onSubmit={handleSubmit}
        amount={calculateCost()}
        projectName={project?.name || 'Your Project'}
      />
    </div>
  );
}