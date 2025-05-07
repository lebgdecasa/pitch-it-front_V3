"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of our onboarding context
interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  isOnboardingCompleted: boolean;
  isOnboardingSkipped: boolean;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (step: number) => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
}

// Create the context with default values
const OnboardingContext = createContext<OnboardingContextType>({
  currentStep: 0,
  totalSteps: 5,
  isOnboardingCompleted: false,
  isOnboardingSkipped: false,
  goToNextStep: () => {},
  goToPrevStep: () => {},
  goToStep: () => {},
  completeOnboarding: () => {},
  skipOnboarding: () => {}
});

// Create provider component
export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(false);
  const [isOnboardingSkipped, setIsOnboardingSkipped] = useState<boolean>(false);
  
  const totalSteps = 5; // Welcome, Project Creation, Pitch Deck, Feedback, Investor Dashboard
  
  // Check local storage on initial load
  useEffect(() => {
    const onboardingStatus = localStorage.getItem('pitch-it-onboarding');
    
    if (onboardingStatus === 'completed') {
      setIsOnboardingCompleted(true);
    } else if (onboardingStatus === 'skipped') {
      setIsOnboardingSkipped(true);
    }
  }, []);

  // Functions to navigate through steps
  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };
  
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };
  
  // Functions to complete or skip onboarding
  const completeOnboarding = () => {
    setIsOnboardingCompleted(true);
    localStorage.setItem('pitch-it-onboarding', 'completed');
  };
  
  const skipOnboarding = () => {
    setIsOnboardingSkipped(true);
    localStorage.setItem('pitch-it-onboarding', 'skipped');
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        isOnboardingCompleted,
        isOnboardingSkipped,
        goToNextStep,
        goToPrevStep,
        goToStep,
        completeOnboarding,
        skipOnboarding
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook for using the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};