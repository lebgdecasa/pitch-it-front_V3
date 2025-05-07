import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';

interface InteractiveReportProps {
  projectId: string;
  pulseData: {
    userScore: number;
    sentimentCloud: { text: string; value: number; sentiment: 'positive' | 'neutral' | 'negative' }[];
    userQuotes: { text: string; userName: string; persona: string; sentiment: 'positive' | 'neutral' | 'negative' }[];
    painPoints: { category: string; count: number; importance: number }[];
    recommendations: string[];
    participantDemographics: { label: string; value: number }[];
  };
}

const InteractiveReport: React.FC<InteractiveReportProps> = ({ projectId, pulseData }) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showFullReport, setShowFullReport] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const handleNextQuote = useCallback(() => {
    if (currentQuoteIndex < pulseData.userQuotes.length - 1) {
      setCurrentQuoteIndex(prev => prev + 1);
    } else {
      setCurrentQuoteIndex(0);
    }
  }, [currentQuoteIndex, pulseData.userQuotes.length]);
  
  const handlePrevQuote = () => {
    if (currentQuoteIndex > 0) {
      setCurrentQuoteIndex(prev => prev - 1);
    } else {
      setCurrentQuoteIndex(pulseData.userQuotes.length - 1);
    }
  };
  
  // Auto-rotate quotes
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextQuote();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [currentQuoteIndex, pulseData.userQuotes.length, handleNextQuote]);
  
  // Get sentiment color
  const getSentimentColor = (sentiment: 'positive' | 'neutral' | 'negative') => {
    switch (sentiment) {
      case 'positive': return '#10b981';
      case 'neutral': return '#6b7280';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };
  
  // Get score color and label
  const getScoreInfo = (score: number) => {
    if (score >= 8) {
      return { color: '#10b981', label: 'Excellent' };
    } else if (score >= 6.5) {
      return { color: '#0ea5e9', label: 'Good' };
    } else if (score >= 5) {
      return { color: '#f59e0b', label: 'Average' };
    } else if (score >= 3.5) {
      return { color: '#f97316', label: 'Needs Improvement' };
    } else {
      return { color: '#ef4444', label: 'Critical Issues' };
    }
  };
  
  const { color: scoreColor, label: scoreLabel } = getScoreInfo(pulseData.userScore);
  
  // Color array for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="space-y-8">
      {/* User Score Gauge */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Satisfaction Score</h3>
        
        <div className="flex flex-col items-center">
          <div className="relative h-40 w-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="block text-4xl font-bold" style={{ color: scoreColor }}>{pulseData.userScore.toFixed(1)}</span>
                <span className="text-sm text-gray-500">out of 10</span>
              </div>
            </div>
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#e5e7eb" 
                strokeWidth="10" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="45"
                fill="none" 
                stroke={scoreColor}
                strokeWidth="10"
                strokeDasharray={`${pulseData.userScore * 28.27} 282.7`}
                strokeDashoffset="70.7"
                transform="rotate(-90 50 50)"
              />
            </svg>
          </div>
          <div className="mt-4 text-center">
            <span className="font-medium text-lg" style={{ color: scoreColor }}>{scoreLabel}</span>
            <p className="text-sm text-gray-600 mt-1">Based on feedback from {pulseData.userQuotes.length} participants</p>
          </div>
        </div>
      </div>
      
      {/* User Quotes Carousel */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Quotes</h3>
        
        <div className="relative">
          <div 
            className="overflow-hidden"
            ref={carouselRef}
          >
            <div className="min-h-[140px]">
              {pulseData.userQuotes.map((quote, index) => (
                <div 
                  key={index}
                  className={`transition-opacity duration-300 ${currentQuoteIndex === index ? 'opacity-100' : 'opacity-0 absolute'}`}
                  style={{ display: currentQuoteIndex === index ? 'block' : 'none' }}
                >
                  <blockquote className="border-l-4 pl-4 mb-4" style={{ borderColor: getSentimentColor(quote.sentiment) }}>
                    <p className="text-lg text-gray-700 italic">{quote.text}</p>
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{quote.userName}</p>
                      <p className="text-sm text-gray-500">{quote.persona}</p>
                    </div>
                    
                    <div>
                      {quote.sentiment === 'positive' && <ThumbsUp className="h-5 w-5 text-green-500" />}
                      {quote.sentiment === 'negative' && <ThumbsDown className="h-5 w-5 text-red-500" />}
                      {quote.sentiment === 'neutral' && <AlertCircle className="h-5 w-5 text-gray-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <button 
              onClick={handlePrevQuote}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Previous quote"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
            
            <div className="flex space-x-1">
              {pulseData.userQuotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuoteIndex(index)}
                  className={`h-2 w-2 rounded-full ${currentQuoteIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNextQuote}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Next quote"
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Sentiment Word Cloud (simplified version) */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Themes</h3>
        
        <div className="flex flex-wrap justify-center gap-2 py-4">
          {pulseData.sentimentCloud.map((word, index) => (
            <div 
              key={index} 
              className="px-3 py-2 rounded-full" 
              style={{ 
                backgroundColor: `${getSentimentColor(word.sentiment)}20`,
                color: getSentimentColor(word.sentiment),
                fontSize: `${Math.max(0.8, Math.min(1.5, 0.8 + (word.value / 50)))}rem`,
              }}
            >
              {word.text}
            </div>
          ))}
        </div>
      </div>
      
      {/* Pain Point Clusters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pain Point Analysis</h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={pulseData.painPoints.sort((a, b) => b.importance - a.importance)}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                angle={-45} 
                textAnchor="end" 
                height={70}
                interval={0}
              />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} mentions`, 'Frequency']} />
              <Bar 
                dataKey="count" 
                name="Mentions" 
                fill="#0ea5e9"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Expanded insights section - only shown when expanded */}
      {showFullReport && (
        <>
          {/* Participant Demographics */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Participant Demographics</h3>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pulseData.participantDemographics}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pulseData.participantDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value} participants`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            
            <ul className="space-y-3">
              {pulseData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-sm mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      {/* Toggle full report button */}
      <div className="text-center">
        <button
          onClick={() => setShowFullReport(!showFullReport)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          {showFullReport ? 'Show Less' : 'View Full Report'}
        </button>
      </div>
    </div>
  );
};

export default InteractiveReport;