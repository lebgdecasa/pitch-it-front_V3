import React, { useState } from 'react';
import { Lock, ChevronRight, BarChart3, PieChart, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface GateTileProps {
  projectId: string;
  type: 'pulse' | 'pitch';
  isLocked?: boolean;
  hasEnoughActivity?: boolean;
}

export const GateTiles = ({ projectId, type, isLocked = true, hasEnoughActivity = false }: GateTileProps) => {
  const [showModal, setShowModal] = useState(false);
  
  if (type === 'pulse') {
    return (
      <div className={`relative rounded-lg overflow-hidden ${hasEnoughActivity ? 'bg-gradient-to-r from-emerald-100 to-blue-100 border-emerald-300' : 'bg-white border-gray-200'} border shadow-sm`}>
        <div className="p-5">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <BarChart3 className={`h-5 w-5 mr-2 ${hasEnoughActivity ? 'text-emerald-600' : 'text-gray-500'}`} />
              <h3 className="text-lg font-semibold text-gray-900">Real-World Pulse</h3>
            </div>
            {isLocked && !hasEnoughActivity && (
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded flex items-center">
                <Lock className="h-3 w-3 mr-1" /> Locked
              </span>
            )}
            {hasEnoughActivity && (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded flex items-center">
                Ready
              </span>
            )}
          </div>
          
          {isLocked && !hasEnoughActivity ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Get real-world feedback on your idea from targeted customer personas. Unlock this feature by adding more details to your pitch and engaging with expert chat.
              </p>
              <div className="flex justify-between items-center">
                <div className="h-2 bg-gray-200 rounded-full w-3/4">
                  <div className="h-2 bg-gray-400 rounded-full w-1/4"></div>
                </div>
                <span className="text-xs text-gray-500">25%</span>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-700 mb-4">
                Your project has enough expert feedback to start gathering real-world validation. Start collecting valuable insights from your target market.
              </p>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Start validation journey <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </>
          )}
        </div>
        
        {/* Real-World Pulse Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Real-World Pulse</h3>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Get invaluable feedback from real users in your target market. Outside feedback helps validate your assumptions and refine your product before investing significant resources.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <p className="text-sm text-blue-800">
                    Starting at $299 for 5 testers. Results delivered within 3-5 business days.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">How it works</h4>
                    <ol className="space-y-3 text-sm text-gray-600 list-decimal list-inside">
                      <li>Choose your research objectives</li>
                      <li>Select target user personas</li>
                      <li>Pick your preferred research method</li>
                      <li>Review and submit your request</li>
                    </ol>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <Link 
                    href={`/project/${projectId}/pulse/wizard`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Start now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Pitch VC Gate Tile
  return (
    <div className={`relative rounded-lg overflow-hidden ${hasEnoughActivity ? 'bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-300' : 'bg-white border-gray-200'} border shadow-sm`}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <PieChart className={`h-5 w-5 mr-2 ${hasEnoughActivity ? 'text-purple-600' : 'text-gray-500'}`} />
            <h3 className="text-lg font-semibold text-gray-900">Virtual VC Pitch</h3>
          </div>
          {isLocked && !hasEnoughActivity && (
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded flex items-center">
              <Lock className="h-3 w-3 mr-1" /> Locked
            </span>
          )}
          {hasEnoughActivity && (
            <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded flex items-center">
              Available
            </span>
          )}
        </div>
        
        {isLocked && !hasEnoughActivity ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Practice your pitch with AI-powered VC personas. Get feedback on your delivery and content. Complete the Real-World Pulse step first to unlock this feature.
            </p>
            <div className="flex justify-between items-center">
              <div className="h-2 bg-gray-200 rounded-full w-3/4">
                <div className="h-2 bg-gray-400 rounded-full w-0"></div>
              </div>
              <span className="text-xs text-gray-500">0%</span>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-700 mb-4">
              You&apos;ve completed the Real-World Pulse stage! Now practice your pitch with AI investors who will challenge and improve your presentation.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
            >
              Start pitch practice <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </>
        )}
      </div>
      
      {/* Virtual VC Pitch Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Virtual VC Pitch Session</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Pressure-test your pitch with AI-powered investors. Get immediate feedback on your presentation skills, content, and answers to tough questions.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-md mb-6">
                <p className="text-sm text-purple-800">
                  Pro Feature: Pitch simulations with detailed reports starting at $49 per session.
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Customize your experience</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Choose your investor persona (SaaS, Fintech, Climate, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Set conversation difficulty level</span>
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Practice mode or full evaluation</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <Link 
                  href={`/project/${projectId}/pitch/setup`}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Configure pitch
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};