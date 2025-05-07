"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingProvider, useOnboarding } from '../../../src/contexts/onboarding-context';
import { OnboardingSlides } from '../../../src/components/client-components/onboarding/onboarding-slides';
import { Loader2 } from 'lucide-react';

// Wrapper component to enforce onboarding checks
const OnboardingContent = () => {
  const { isOnboardingCompleted, isOnboardingSkipped } = useOnboarding();
  const router = useRouter();
  
  // Redirect if onboarding is already completed or skipped
  useEffect(() => {
    if (isOnboardingCompleted || isOnboardingSkipped) {
      router.push('/dashboard');
    }
  }, [isOnboardingCompleted, isOnboardingSkipped, router]);
  
  // Show loading state during potential redirect
  if (isOnboardingCompleted || isOnboardingSkipped) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }
  
  return (
    <div className="h-screen overflow-hidden">
      <OnboardingSlides />
    </div>
  );
};

// Main page component wrapped with provider
export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}