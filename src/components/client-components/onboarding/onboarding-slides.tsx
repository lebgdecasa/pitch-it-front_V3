"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket, FileText, MessageSquare, PieChart, ChevronLeft,
  ChevronRight, Check, X, Users, Presentation, BarChart,
  LineChart, TrendingUp, Target, ArrowUpRight, LightbulbIcon
} from 'lucide-react';
import { Button } from '../../ui/button';
import { useOnboarding } from '@/contexts/onboarding-context';
import { useRouter } from 'next/navigation';

// Animation variants for slide transitions
const slideVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
    },
  }),
};

// Content for each slide
const slides = [
  {
    title: "Welcome to Pitch-it!",
    description:
      "Your all-in-one platform for creating, refining, and presenting startup pitches that get results. Let's take a quick tour of what you can do here.",
    icon: <Rocket className="h-16 w-16 text-indigo-500" />,
    bgColor: "from-blue-50 to-indigo-50",
    illustration: (
      <div className="flex justify-center my-6">
        <div className="relative h-48 w-48 bg-blue-100 rounded-full flex items-center justify-center">
          <Rocket className="h-24 w-24 text-blue-500" />
          <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-indigo-500" />
          </div>
          <div className="absolute bottom-0 left-0 h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
            <Target className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>
    ),
    features: [
      { text: "Create compelling pitch decks", icon: <FileText className="h-5 w-5 text-blue-500" /> },
      { text: "Get expert feedback", icon: <MessageSquare className="h-5 w-5 text-blue-500" /> },
      { text: "Track investor interest", icon: <PieChart className="h-5 w-5 text-blue-500" /> },
    ]
  },
  {
    title: "Create and Manage Projects",
    description:
      "Start by creating a new project. Define your startup's mission, target market, and key value propositions.",
    icon: <FileText className="h-16 w-16 text-green-500" />,
    bgColor: "from-green-50 to-emerald-50",
    illustration: (
      <div className="flex justify-center my-6">
        <div className="border-2 border-green-200 rounded-lg p-4 w-64 bg-white shadow-md">
          <div className="h-6 w-3/4 bg-green-100 rounded mb-4"></div>
          <div className="h-4 w-full bg-green-50 rounded mb-3"></div>
          <div className="h-4 w-5/6 bg-green-50 rounded mb-3"></div>
          <div className="h-4 w-4/6 bg-green-50 rounded mb-3"></div>
          <div className="flex justify-end mt-4">
            <div className="h-8 w-16 bg-green-500 rounded flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    ),
    steps: [
      "Click on 'New Project' to get started",
      "Fill in your project details and industry",
      "Add team members and their roles",
      "Set milestones and funding goals"
    ]
  },
  {
    title: "Build Your Pitch Deck",
    description:
      "Create a compelling pitch deck that tells your story and showcases your potential.",
    icon: <Presentation className="h-16 w-16 text-purple-500" />,
    bgColor: "from-purple-50 to-pink-50",
    illustration: (
      <div className="flex justify-center my-6">
        <div className="relative w-64 h-48 bg-purple-100 rounded-lg flex flex-col justify-center items-center">
          <div className="absolute -top-4 -right-4 h-12 w-12 bg-pink-200 rounded-full flex items-center justify-center">
            <ArrowUpRight className="h-6 w-6 text-pink-600" />
          </div>
          <Presentation className="h-16 w-16 text-purple-600 mb-2" />
          <div className="h-3 w-24 bg-purple-300 rounded mb-1"></div>
          <div className="h-3 w-32 bg-purple-200 rounded"></div>
        </div>
      </div>
    ),
    sections: [
      { title: "Problem Statement", description: "Define the problem you're solving" },
      { title: "Solution", description: "Showcase your unique approach" },
      { title: "Market Size", description: "Outline your target market" },
      { title: "Traction", description: "Share your progress and milestones" }
    ]
  },
  {
    title: "Get Feedback and Iterate",
    description:
      "Share your pitch to get feedback from experts and investors. Use insights to refine your message.",
    icon: <MessageSquare className="h-16 w-16 text-amber-500" />,
    bgColor: "from-amber-50 to-yellow-50",
    illustration: (
      <div className="flex justify-center gap-4 my-6">
        <div className="h-32 w-32 rounded-lg bg-amber-100 flex items-center justify-center">
          <div className="relative">
            <MessageSquare className="h-16 w-16 text-amber-500" />
            <div className="absolute bottom-0 right-0 h-8 w-8 bg-amber-400 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="h-6 w-28 bg-amber-200 rounded"></div>
          <div className="h-6 w-24 bg-amber-300 rounded"></div>
          <div className="h-6 w-32 bg-amber-200 rounded"></div>
        </div>
      </div>
    ),
    feedbackTypes: [
      { type: "Expert Review", icon: <Users className="h-5 w-5 text-amber-500" /> },
      { type: "AI Analysis", icon: <BarChart className="h-5 w-5 text-amber-500" /> },
      { type: "Peer Feedback", icon: <MessageSquare className="h-5 w-5 text-amber-500" /> }
    ]
  },
  {
    title: "Analyze Investor Interest",
    description:
      "Track how investors interact with your pitch and use analytics to improve your fundraising strategy.",
    icon: <PieChart className="h-16 w-16 text-red-500" />,
    bgColor: "from-red-50 to-orange-50",
    illustration: (
      <div className="flex justify-center my-6">
        <div className="w-64 h-48 bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="h-4 w-16 bg-red-100 rounded"></div>
            <div className="flex space-x-1">
              <div className="h-3 w-3 bg-red-200 rounded"></div>
              <div className="h-3 w-3 bg-red-300 rounded"></div>
              <div className="h-3 w-3 bg-red-400 rounded"></div>
            </div>
          </div>
          <div className="flex items-end h-24 space-x-4 mb-2">
            <div className="h-1/3 w-8 bg-red-200 rounded-t"></div>
            <div className="h-2/3 w-8 bg-red-300 rounded-t"></div>
            <div className="h-1/2 w-8 bg-red-400 rounded-t"></div>
            <div className="h-full w-8 bg-red-500 rounded-t"></div>
            <div className="h-3/4 w-8 bg-red-400 rounded-t"></div>
          </div>
          <div className="flex justify-between">
            <LineChart className="h-6 w-6 text-red-500" />
            <PieChart className="h-6 w-6 text-red-500" />
            <BarChart className="h-6 w-6 text-red-500" />
          </div>
        </div>
      </div>
    ),
    metrics: [
      "Pitch view time",
      "Deck engagement rates",
      "Investor follow-up rate",
      "Investment interest signals"
    ]
  }
];

export const OnboardingSlides = () => {
  const {
    currentStep,
    totalSteps,
    goToNextStep,
    goToPrevStep,
    skipOnboarding,
    completeOnboarding
  } = useOnboarding();

  const router = useRouter();
  const [[page, direction], setPage] = React.useState([0, 0]);

  // Update page when currentStep changes
  React.useEffect(() => {
    setPage([currentStep, currentStep > page ? 1 : -1]);
  }, [currentStep, page]);

  // Handle onboarding completion
  const handleComplete = () => {
    completeOnboarding();
    router.push('/dashboard');
  };

  // Handle onboarding skip
  const handleSkip = () => {
    skipOnboarding();
    router.push('/dashboard');
  };

  // Determine if this is the last slide
  const isLastSlide = currentStep === totalSteps - 1;

  return (
    <div className="h-full flex flex-col">
      {/* Progress indicator */}
      <div className="flex justify-center mt-8 mb-4">
        <div className="flex space-x-2">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-12 rounded-full ${
                i === currentStep ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-grow relative overflow-hidden">
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br ${slides[currentStep].bgColor}`}
        >
          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                {slides[currentStep].icon}
                <h2 className="text-3xl font-bold ml-4">{slides[currentStep].title}</h2>
              </div>

              <p className="text-gray-600 text-lg mb-6">
                {slides[currentStep].description}
              </p>

              {/* Slide illustration */}
              <div className="mb-6">
                {slides[currentStep].illustration}
              </div>

              {/* Slide-specific content */}
              <div className="mb-8">
                {/* Welcome slide features */}
                {currentStep === 0 && slides[0].features && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {slides[0].features.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        {feature.icon}
                        <span className="ml-2 text-gray-700">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Project creation steps */}
                {currentStep === 1 && slides[1].steps && (
                  <div className="space-y-3">
                    {slides[1].steps.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-500 mr-3">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pitch deck sections */}
                {currentStep === 2 && slides[2].sections && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slides[2].sections.map((section, index) => (
                      <div key={index} className="p-4 border border-purple-100 rounded-lg">
                        <h3 className="font-semibold text-purple-700">{section.title}</h3>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Feedback types */}
                {currentStep === 3 && slides[3].feedbackTypes && (
                  <div className="space-y-4">
                    {slides[3].feedbackTypes.map((item, index) => (
                      <div key={index} className="flex items-center p-3 bg-amber-50 rounded-lg">
                        {item.icon}
                        <div className="ml-3">
                          <span className="font-medium text-amber-700">{item.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Investor metrics */}
                {currentStep === 4 && slides[4].metrics && (
                  <div className="grid grid-cols-2 gap-3">
                    {slides[4].metrics.map((metric, index) => (
                      <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg">
                        <Check className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-gray-700">{metric}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center p-8">
        <div>
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={goToPrevStep}
              className="flex items-center"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500"
          >
            Skip <X className="ml-2 h-4 w-4" />
          </Button>

          <Button
            onClick={isLastSlide ? handleComplete : goToNextStep}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isLastSlide ? (
              <>
                Get Started <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
