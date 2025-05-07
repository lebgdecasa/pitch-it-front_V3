"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Download, ArrowLeft, Printer } from 'lucide-react';
import { useAppContext } from '../../../../providers/app-provider';
import { Button } from '../../../../components/ui/button';

// Define slide components for each type of slide
const CoverSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="flex flex-col justify-center items-center text-center h-full">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
    <p className="text-xl md:text-2xl text-gray-700 mb-8">{content.subtitle}</p>
    <p className="text-gray-600 mt-12">{content.presenter}</p>
  </div>
);

const ProblemSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    <p className="text-lg mb-8">{content.description}</p>
    <ul className="space-y-4 mt-auto">
      <li className="flex items-start">
        <span className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 flex-shrink-0">1</span>
        <span className="text-lg">{content.point1}</span>
      </li>
      <li className="flex items-start">
        <span className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 flex-shrink-0">2</span>
        <span className="text-lg">{content.point2}</span>
      </li>
      <li className="flex items-start">
        <span className="h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3 flex-shrink-0">3</span>
        <span className="text-lg">{content.point3}</span>
      </li>
    </ul>
  </div>
);

const SolutionSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    <p className="text-lg mb-8">{content.description}</p>
    <ul className="space-y-4 mt-auto">
      <li className="flex items-start">
        <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 flex-shrink-0">✓</span>
        <span className="text-lg">{content.point1}</span>
      </li>
      <li className="flex items-start">
        <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 flex-shrink-0">✓</span>
        <span className="text-lg">{content.point2}</span>
      </li>
      <li className="flex items-start">
        <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 flex-shrink-0">✓</span>
        <span className="text-lg">{content.point3}</span>
      </li>
    </ul>
  </div>
);

const MarketSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    <p className="text-lg mb-8">{content.description}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-auto">
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-deep-blue mb-2">{content.stat1?.split(' ')[0]}</div>
        <p>{content.stat1?.split(' ').slice(1).join(' ')}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-deep-blue mb-2">{content.stat2?.split(' ')[0]}</div>
        <p>{content.stat2?.split(' ').slice(1).join(' ')}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <div className="text-2xl font-bold text-deep-blue mb-2">{content.stat3?.split(' ')[0]}</div>
        <p>{content.stat3?.split(' ').slice(1).join(' ')}</p>
      </div>
    </div>
  </div>
);

const ProductSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-2">{content.feature1}</h3>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-2">{content.feature2}</h3>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-2">{content.feature3}</h3>
      </div>
    </div>
    
    <p className="text-lg mt-auto">{content.description}</p>
  </div>
);

const TractionSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
        <div className="text-3xl font-bold text-green-700 mb-1">{content.metric1?.split(' ')[0]}</div>
        <p className="text-green-800">{content.metric1?.split(' ').slice(1).join(' ')}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
        <div className="text-3xl font-bold text-green-700 mb-1">{content.metric2?.split(' ')[0]}</div>
        <p className="text-green-800">{content.metric2?.split(' ').slice(1).join(' ')}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
        <div className="text-3xl font-bold text-green-700 mb-1">{content.metric3?.split(' ')[0]}</div>
        <p className="text-green-800">{content.metric3?.split(' ').slice(1).join(' ')}</p>
      </div>
    </div>
    
    <p className="text-lg mt-auto">{content.description}</p>
  </div>
);

const TeamSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    
    <div className="space-y-6 mb-8">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <span className="text-xl font-bold text-gray-500">{content.member1?.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-semibold">{content.member1}</h3>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <span className="text-xl font-bold text-gray-500">{content.member2?.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-semibold">{content.member2}</h3>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <span className="text-xl font-bold text-gray-500">{content.member3?.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-semibold">{content.member3}</h3>
        </div>
      </div>
    </div>
    
    <p className="text-lg mt-auto">{content.description}</p>
  </div>
);

const CompetitionSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    
    <div className="space-y-4 mb-8">
      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
        <p className="text-gray-800">{content.competitor1}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
        <p className="text-gray-800">{content.competitor2}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
        <p className="text-gray-800">{content.competitor3}</p>
      </div>
    </div>
    
    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 mt-auto">
      <p className="text-lg font-medium">Our Advantage:</p>
      <p className="text-gray-800">{content.advantage}</p>
    </div>
  </div>
);

const BusinessModelSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    
    <div className="space-y-4 mb-8">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="font-medium text-deep-blue">{content.pricing1}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="font-medium text-deep-blue">{content.pricing2}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="font-medium text-deep-blue">{content.pricing3}</p>
      </div>
    </div>
    
    <div className="mt-auto p-4 bg-amber-50 rounded-lg">
      <p className="text-amber-800 font-medium">{content.projection}</p>
    </div>
  </div>
);

const FinancialsSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    
    <div className="grid grid-cols-1 gap-4 mb-8">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-1">Current Metrics</h3>
        <p className="text-gray-800">{content.current}</p>
      </div>
      
      <div className="flex items-center my-2">
        <hr className="flex-1 border-gray-200" />
        <span className="px-3 text-gray-500">Projections</span>
        <hr className="flex-1 border-gray-200" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800 font-medium">{content.projection}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800 font-medium">{content.projection2}</p>
        </div>
      </div>
    </div>
    
    <div className="mt-auto bg-blue-50 p-4 rounded-lg">
      <p className="text-deep-blue font-medium">Efficiency Metrics:</p>
      <p className="text-gray-800">{content.efficiency}</p>
    </div>
  </div>
);

const AskSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="h-full flex flex-col">
    <h2 className="text-3xl font-bold mb-6 text-deep-blue">{content.title}</h2>
    
    <div className="bg-deep-blue text-white p-6 rounded-lg mb-8 text-center">
      <p className="text-2xl font-bold">{content.ask}</p>
    </div>
    
    <div className="space-y-4 mb-6">
      <h3 className="font-semibold text-lg">Use of Funds:</h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <span className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 flex-shrink-0">1</span>
          <span>{content.use1}</span>
        </li>
        <li className="flex items-start">
          <span className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 flex-shrink-0">2</span>
          <span>{content.use2}</span>
        </li>
        <li className="flex items-start">
          <span className="h-6 w-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-3 flex-shrink-0">3</span>
          <span>{content.use3}</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-auto bg-gray-50 p-4 rounded-lg text-center">
      <p className="text-gray-700 font-medium">{content.timeline}</p>
    </div>
  </div>
);

const ContactSlide = ({ content }: { content: Record<string, string> }) => (
  <div className="flex flex-col justify-center items-center text-center h-full">
    <h2 className="text-3xl font-bold mb-10">{content.title}</h2>
    
    <div className="space-y-3 mb-8">
      <p className="text-xl font-semibold">{content.name}</p>
      <p className="text-gray-700">{content.email}</p>
      <p className="text-gray-700">{content.phone}</p>
      <p className="text-gray-700">{content.website}</p>
    </div>
  </div>
);

// Main component to render different slide types
const SlideRenderer = ({ type, content }: { type: string; content: Record<string, string> }) => {
  switch (type) {
    case 'cover':
      return <CoverSlide content={content} />;
    case 'problem':
      return <ProblemSlide content={content} />;
    case 'solution':
      return <SolutionSlide content={content} />;
    case 'market':
      return <MarketSlide content={content} />;
    case 'product':
      return <ProductSlide content={content} />;
    case 'traction':
      return <TractionSlide content={content} />;
    case 'team':
      return <TeamSlide content={content} />;
    case 'competition':
      return <CompetitionSlide content={content} />;
    case 'business-model':
      return <BusinessModelSlide content={content} />;
    case 'financials':
      return <FinancialsSlide content={content} />;
    case 'ask':
      return <AskSlide content={content} />;
    case 'contact':
      return <ContactSlide content={content} />;
    default:
      return <div className="h-full flex items-center justify-center">Slide type not supported</div>;
  }
};

export default function ProjectDeck() {
  const params = useParams();
  const router = useRouter();
  const { state } = useAppContext();
  const { projects } = state;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Find the current project using the ID from the URL params
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  const project = projects.find(p => p.id === projectId);
  
  // If project not found or no pitch deck, redirect to 404 or project page
  useEffect(() => {
    if (!project || !project.pitchDeck) {
      router.push('/projects');
    }
  }, [project, router]);
  
  if (!project || !project.pitchDeck) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p>Project or pitch deck not found</p>
      </div>
    );
  }
  
  const { slides } = project.pitchDeck;
  const totalSlides = slides.length;
  
  // Navigation functions
  const goToNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prevIndex => prevIndex + 1);
    }
  };
  
  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prevIndex => prevIndex - 1);
    }
  };
  
  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
    }
  };
  
  // Handle printing of the deck
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center print:hidden">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="mr-4"
          >
            <Link href={`/project/${project.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">{project.name} - Pitch Deck</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Deck
          </Button>
          <Button 
            variant="outline" 
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Slide thumbnails - sidebar */}
        <div className="w-full lg:w-64 bg-white border-r border-gray-200 p-4 overflow-auto print:hidden">
          <div className="space-y-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-full text-left p-3 rounded-md truncate ${
                  index === currentSlideIndex 
                    ? "bg-blue-100 border border-blue-300" 
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-2">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium truncate">
                    {slide.content.title || `Slide ${index + 1}`}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Current slide display */}
        <div className="flex-1 flex flex-col">
          {/* Slide content */}
          <div className="flex-1 flex justify-center items-center p-4 lg:p-8">
            <div className="w-full max-w-4xl aspect-[16/9] bg-white rounded-lg shadow-lg p-10 overflow-hidden">
              {slides[currentSlideIndex] && (
                <SlideRenderer
                  type={slides[currentSlideIndex].type}
                  content={slides[currentSlideIndex].content}
                />
              )}
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-sm text-gray-500">
              Slide {currentSlideIndex + 1} of {totalSlides}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            size: landscape;
            margin: 0.5cm;
          }
        }
      `}</style>
    </div>
  );
}