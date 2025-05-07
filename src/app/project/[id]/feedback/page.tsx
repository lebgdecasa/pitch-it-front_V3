'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, MessageSquare, ThumbsUp, ThumbsDown, Filter, Download, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { projectData } from '../../../../mocks';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// Mock investor feedback data
const mockFeedbackData = [
  {
    id: 'f1',
    investor: {
      name: 'Alex Rivera',
      avatar: '/assets/avatars/investor-1.png',
      firm: 'Sequoia Capital',
      role: 'Partner'
    },
    date: '2023-04-18',
    rating: 8,
    feedback: 'Strong founding team with relevant experience. The market opportunity is significant, and your traction so far is impressive. I have concerns about the go-to-market strategy and how you plan to acquire customers at scale.',
    strengths: ['Team expertise', 'Market size', 'Early traction'],
    concerns: ['Customer acquisition strategy', 'Competitive landscape'],
    recommendation: 'Schedule follow-up',
    slideComments: [
      { slideNumber: 2, comment: 'Your solution is compelling, but I would emphasize the unique technology advantage more.' },
      { slideNumber: 5, comment: 'The financial projections seem ambitious - be prepared to defend these numbers in detail.' }
    ],
    status: 'read'
  },
  {
    id: 'f2',
    investor: {
      name: 'Sarah Chen',
      avatar: '/assets/avatars/investor-2.png',
      firm: 'Andreessen Horowitz',
      role: 'Principal'
    },
    date: '2023-04-15',
    rating: 7,
    feedback: "You've identified an interesting problem space and your product shows promise. Your team has the right mix of technical and business talent. I'm concerned about the current burn rate and timeline to profitability. Would like to see more detail on unit economics.",
    strengths: ['Product innovation', 'Technical moat', 'Team composition'],
    concerns: ['Burn rate', 'Path to profitability', 'Unit economics'],
    recommendation: 'Not a fit at this time',
    slideComments: [
      { slideNumber: 3, comment: "Market size calculation methodology seems sound, but I'd like to see more data on the serviceable addressable market." },
      { slideNumber: 7, comment: "Your competitive analysis is thorough, but I think you're underestimating the threat from Competitor X." }
    ],
    status: 'unread'
  },
  {
    id: 'f3',
    investor: {
      name: 'Michael Johnson',
      avatar: '/assets/avatars/investor-3.png',
      firm: 'Lightspeed Ventures',
      role: 'Managing Director'
    },
    date: '2023-04-12',
    rating: 9,
    feedback: 'Extremely impressed by the team and product execution. Your understanding of customer pain points is excellent, and the solution addresses them directly. The business model is scalable and I see a clear path to strong unit economics. Would like to continue the conversation.',
    strengths: ['Product-market fit', 'Scalable business model', 'Customer focus'],
    concerns: ['International expansion strategy'],
    recommendation: 'Interested in investing',
    slideComments: [
      { slideNumber: 1, comment: 'Great problem statement - clearly articulated and compelling.' },
      { slideNumber: 4, comment: 'Your go-to-market strategy is well-thought-out.' },
      { slideNumber: 6, comment: 'Impressive early customer testimonials - these validate the need.' }
    ],
    status: 'read'
  }
];

export default function FeedbackPage() {
  const { id } = useParams();
  const router = useRouter();
  // Define a minimal type for the project
  type Project = { id: string | string[]; [key: string]: any };
  // Find the project, asserting projectData is an array and providing a fallback
  const project = (projectData as unknown as Project[]).find((p) => p.id === id) || (projectData as unknown as Project[])[0];

  const [feedbacks, setFeedbacks] = useState(mockFeedbackData);
  type Feedback = typeof mockFeedbackData[number];

  const [activeFeedback, setActiveFeedback] = useState<Feedback | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    rating: 'all',
    recommendation: 'all',
    status: 'all'
  });

  const handleBack = () => {
    router.push(`/project/${id}`);
  };

  const handleFeedbackSelect = (feedback: Feedback) => {
    setActiveFeedback(feedback);
    if (feedback && feedback.status === 'unread') {
      // Mark as read
      setFeedbacks(feedbacks.map(f =>
        f.id === feedback.id ? { ...f, status: 'read' } : f
      ));
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleApplyFilters = () => {
    setFilterDialogOpen(false);
    toast.success('Filters applied');
  };

  const handleShareFeedback = () => {
    setShareDialogOpen(false);
    toast.success('Feedback summary shared to your email');
  };

  const handleDownloadFeedback = () => {
    toast.success('Feedback summary downloaded');
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filters.rating !== 'all') {
      const ratingFilter = parseInt(filters.rating);
      const ratingMin = ratingFilter;
      const ratingMax = ratingFilter + 2;
      if (feedback.rating < ratingMin || feedback.rating > ratingMax) {
        return false;
      }
    }

    if (filters.recommendation !== 'all' && feedback.recommendation !== filters.recommendation) {
      return false;
    }

    if (filters.status !== 'all' && feedback.status !== filters.status) {
      return false;
    }

    return true;
  });

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ChevronLeft size={18} className="mr-1" />
              Back to Project
            </button>
            <h1 className="text-xl font-bold">Investor Feedback</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterDialogOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 flex items-center text-gray-600"
            >
              <Filter size={16} className="mr-1" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Feedback List Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-500">
              {filteredFeedbacks.length} {filteredFeedbacks.length === 1 ? 'response' : 'responses'}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredFeedbacks.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No feedback matches your filters
              </div>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  onClick={() => handleFeedbackSelect(feedback)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${activeFeedback?.id === feedback.id ? 'bg-blue-50' : ''} ${feedback.status === 'unread' ? 'border-l-4 border-l-blue-500' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0 overflow-hidden">
                      <Image src={feedback.investor.avatar} alt={feedback.investor.name} className="w-full h-full object-cover" width={40} height={40} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">{feedback.investor.name}</h3>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${feedback.status === 'unread' ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{feedback.investor.firm}</p>
                      <p className="text-sm text-gray-400 mt-1">{feedback.date}</p>
                      <div className="flex items-center mt-2">
                        <div
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            feedback.rating >= 8 ? 'bg-green-100 text-green-800' :
                            feedback.rating >= 6 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          Rating: {feedback.rating}/10
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Feedback Detail */}
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          {activeFeedback ? (
            <div className="max-w-3xl mx-auto px-6 py-8">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Feedback Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                        <Image src={activeFeedback.investor.avatar} alt={activeFeedback.investor.name} className="w-full h-full object-cover" width={48} height={48} />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg">{activeFeedback.investor.name}</h2>
                        <p className="text-gray-600">{activeFeedback.investor.role} at {activeFeedback.investor.firm}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">{activeFeedback.date}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendation & Rating */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="mb-4 sm:mb-0">
                      <span className="text-sm text-gray-500 block mb-1">Recommendation</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        activeFeedback.recommendation === 'Interested in investing' ? 'bg-green-100 text-green-800' :
                        activeFeedback.recommendation === 'Schedule follow-up' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activeFeedback.recommendation}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Overall Rating:</span>
                      <div
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          activeFeedback.rating >= 8 ? 'bg-green-100 text-green-800' :
                          activeFeedback.rating >= 6 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {activeFeedback.rating}/10
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Feedback */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-medium text-lg mb-3">General Feedback</h3>
                  <p className="text-gray-700 whitespace-pre-line">{activeFeedback.feedback}</p>
                </div>

                {/* Strengths & Concerns */}
                <div className="p-6 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-3">
                        <ThumbsUp size={16} className="text-green-600 mr-2" />
                        <h3 className="font-medium text-lg">Strengths</h3>
                      </div>
                      <ul className="space-y-2">
                        {activeFeedback.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-2"></span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center mb-3">
                        <ThumbsDown size={16} className="text-red-600 mr-2" />
                        <h3 className="font-medium text-lg">Concerns</h3>
                      </div>
                      <ul className="space-y-2">
                        {activeFeedback.concerns.map((concern, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-2"></span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Slide-Specific Comments */}
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-3">Slide Comments</h3>
                  <div className="space-y-4">
                    {activeFeedback.slideComments.map((comment, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center mb-2">
                          <div className="bg-blue-100 text-blue-800 rounded-full px-2 py-0.5 text-xs font-medium">
                            Slide {comment.slideNumber}
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
                  <button
                    onClick={handleDownloadFeedback}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                  <button
                    onClick={() => setShareDialogOpen(true)}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                  >
                    <Share2 size={16} className="mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-1">No Feedback Selected</h3>
                <p className="text-gray-500">Select feedback from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Feedback</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Rating</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.rating === 'all'}
                    onChange={() => handleFilterChange('rating', 'all')}
                    className="mr-2"
                  />
                  All ratings
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.rating === '8'}
                    onChange={() => handleFilterChange('rating', '8')}
                    className="mr-2"
                  />
                  8-10 (High)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.rating === '5'}
                    onChange={() => handleFilterChange('rating', '5')}
                    className="mr-2"
                  />
                  5-7 (Medium)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.rating === '1'}
                    onChange={() => handleFilterChange('rating', '1')}
                    className="mr-2"
                  />
                  1-4 (Low)
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Recommendation</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.recommendation === 'all'}
                    onChange={() => handleFilterChange('recommendation', 'all')}
                    className="mr-2"
                  />
                  All recommendations
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.recommendation === 'Interested in investing'}
                    onChange={() => handleFilterChange('recommendation', 'Interested in investing')}
                    className="mr-2"
                  />
                  Interested in investing
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.recommendation === 'Schedule follow-up'}
                    onChange={() => handleFilterChange('recommendation', 'Schedule follow-up')}
                    className="mr-2"
                  />
                  Schedule follow-up
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.recommendation === 'Not a fit at this time'}
                    onChange={() => handleFilterChange('recommendation', 'Not a fit at this time')}
                    className="mr-2"
                  />
                  Not a fit at this time
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Status</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.status === 'all'}
                    onChange={() => handleFilterChange('status', 'all')}
                    className="mr-2"
                  />
                  All statuses
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.status === 'unread'}
                    onChange={() => handleFilterChange('status', 'unread')}
                    className="mr-2"
                  />
                  Unread only
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={filters.status === 'read'}
                    onChange={() => handleFilterChange('status', 'read')}
                    className="mr-2"
                  />
                  Read only
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setFilterDialogOpen(false)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Feedback</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter email address"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Include</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  General feedback
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Strengths & concerns
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Slide comments
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Add a note (optional)</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 resize-none h-20"
                placeholder="Add a note to include with the shared feedback"
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setShareDialogOpen(false)}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleShareFeedback}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Share Feedback
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
