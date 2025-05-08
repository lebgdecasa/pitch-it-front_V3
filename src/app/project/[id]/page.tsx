// src/app/project/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Edit, Download } from 'lucide-react';
import ActionButtons from '../../../components/project/ActionButtons';
import analysisByProjectId from '../../../mocks/analysis-data';
import { AnalysisSection } from '../../../components/project/dashboard/AnalysisSection';
import { Button } from '../../../components/ui/button';
import { useAppContext } from '../../../providers/app-provider';
import { ProjectStage } from '../../../types';
import { MetricsBadges } from '../../../components/client-components/project/metrics-badges';
import PersonaCard from '../../../components/client-components/persona/PersonaCard';
import PersonaModal from '../../../components/client-components/persona/PersonaModal';
import { mockChatPersonas } from '../../../mocks';
import { financialMetrics } from '../../../mocks/financial-metrics';

// Component for showing pitch details in a clean way
const PitchDetail = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-4">
    <h4 className="text-sm font-medium text-gray-500 mb-1">{label}</h4>
    <p className="text-gray-800">{value || "Not defined yet"}</p>
  </div>
);

// Sample persona details for enhancing the mock data
const personaDetails = [
  {
    jobTitle: "Target Customer",
    needsSnippet: "Looking for solutions that address their pain points.",
    needsDetails: "Seeks practical solutions that solve real problems. Values clear understanding of benefits and ease of use.",
    background: "Representative of your target market with specific needs and challenges.",
    goals: ["Find effective solutions", "Improve current processes", "Get good value for money"],
    challenges: ["Current solutions are inadequate", "Limited time and resources", "Need for reliable support"],
    preferredCommunication: "Clear, benefit-focused communication with concrete examples and demonstrations."
  },
  {
    jobTitle: "Industry Expert",
    needsSnippet: "Evaluates solution viability and market fit.",
    needsDetails: "Assesses whether solutions effectively address industry challenges and can be implemented successfully.",
    background: "20+ years of industry experience with deep domain knowledge.",
    goals: ["Identify practical solutions", "Evaluate technical feasibility", "Assess market potential"],
    challenges: ["Understanding new technologies", "Evaluating implementation ease", "Assessing scalability"],
    preferredCommunication: "Detailed technical information with clear practical applications."
  },
  {
    jobTitle: "Business Advisor",
    needsSnippet: "Provides strategic guidance on business development.",
    needsDetails: "Helps refine business model and go-to-market strategy. Offers feedback on pitch effectiveness.",
    background: "Experienced entrepreneur with multiple successful ventures.",
    goals: ["Help develop solid business models", "Refine market strategy", "Improve pitch effectiveness"],
    challenges: ["Ensuring business viability", "Market positioning", "Resource allocation"],
    preferredCommunication: "Strategic discussions with concrete examples and metrics."
  }
];

// Define the StageUIDetail interface
interface StageUIDetail {
  color: string;
  label: string;
  description: string;
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { state } = useAppContext();
  const { projects } = state;
  const project = projects.find(p => p.id === params.id);

  // State for persona selection and modal
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewingPersona, setViewingPersona] = useState<number | null>(null);

  if (!project) {
    // If the project is not found, redirect to a 404 page
    console.error(`Project with ID '${params.id}' not found.`);
    notFound();
  }

  const stageInfo: Partial<Record<ProjectStage, StageUIDetail>> = {
    [ProjectStage.IDEATION]: {
      color: 'bg-blue-100 text-blue-800',
      label: 'Ideation',
      description: 'Define your business idea and core concept.'
    },
    [ProjectStage.VALIDATION]: { // Added
      color: 'bg-purple-100 text-purple-800',
      label: 'Validation',
      description: 'Validate your idea and test assumptions.'
    },
    [ProjectStage.DEVELOPMENT]: {
      color: 'bg-blue-100 text-gray-800', // Note: dashboard uses purple for validation, consider if this should be different
      label: 'Development',
      description: 'Develop and refine your business plan.'
    },
    [ProjectStage.PITCH_DECK]: { // This was missing from your original ProjectPage stageInfo, but present in dashboard's ProjectCard
      color: 'bg-amber-100 text-amber-800',
      label: 'Pitch Deck',
      description: 'Prepare your pitch deck for presentation.' // Added from dashboard's ProjectCard, you might have this as DECK_CREATION
    },
    [ProjectStage.DECK_CREATION]: { // Renamed from PITCH_DECK in dashboard's ProjectCard if this is the intended mapping
      color: 'bg-amber-100 text-amber-800',
      label: 'Deck Creation',
      description: 'Create your pitch presentation.'
    },
    [ProjectStage.REFINEMENT]: {
      color: 'bg-green-100 text-green-800',
      label: 'Refinement',
      description: 'Perfect your pitch and presentation.'
    },
    [ProjectStage.INVESTOR_READY]: { // Added
      color: 'bg-green-100 text-green-800',
      label: 'Investor Ready',
      description: 'Your project is ready for investor review.'
    }
    // Add other stages like TESTING if they are used and need a detail page view
  };

  const currentStageDetails = stageInfo[project.stage];

  if (!currentStageDetails) {
    // This case implies that the project's stage is not configured for display.
    // Calling notFound() is a reasonable way to handle this, similar to project not found.
    console.error(`Display details for project stage '${project.stage}' are not defined.`);
    notFound();
  }
  const { color, label, description } = currentStageDetails;

  // Determine the next stage for the project
  const getNextStage = () => {
    switch (project.stage) {
      case ProjectStage.IDEATION:
        return ProjectStage.DEVELOPMENT;
      case ProjectStage.DEVELOPMENT:
        return ProjectStage.DECK_CREATION;
      case ProjectStage.DECK_CREATION:
        return ProjectStage.REFINEMENT;
      default:
        return null;
    }
  };

  // Handle persona selection
  const handleSelectPersona = (index: number) => {
    setSelectedIndex(index);
    console.log(`navigate to /project/${params.id}/chat?persona=${index}`);
  };

  // Handle modal open/close
  const handleShowPersonaDetails = (index: number) => {
    setViewingPersona(index);
  };

  const handleCloseModal = () => {
    setViewingPersona(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Back link and project title */}
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex items-center mt-2">
              <span className={`${color} text-xs px-2 py-1 rounded-full font-medium mr-2`}>{label}</span>
              <span className="text-gray-500 text-sm">{description}</span>
            </div>
          </div>

          <div className="flex mt-4 md:mt-0 space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/project/${project.id}/edit`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
            {(project.stage === ProjectStage.DECK_CREATION || project.stage === ProjectStage.REFINEMENT) && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download Deck
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Project details */}
        <div className="lg:col-span-2">
          {/* Metrics Badges */}
          <div className="mb-6">
            <MetricsBadges
              cac={financialMetrics.cac}
              cltv={financialMetrics.cltv}
              ratio={financialMetrics.cacCltvRatio}
              tam={financialMetrics.tam}
              potentialEarnings={financialMetrics.potentialEarnings}
              marketGrowthRate={financialMetrics.marketGrowthRate}
              projectedMarketShare={financialMetrics.projectedMarketShare}
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-600 mb-6">{project.description}</p>

            {/* Display fullDescription if available */}
            {project.pitch.fullDescription && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Full Project Description</h3>
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                  {project.pitch.fullDescription}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <PitchDetail label="Problem" value={project.pitch.problem} />
              <PitchDetail label="Solution" value={project.pitch.solution} />
              <PitchDetail label="Target Market" value={project.pitch.targetMarket} />
              <PitchDetail label="Business Model" value={project.pitch.businessModel} />
              <PitchDetail label="Competition" value={project.pitch.competition} />
              <PitchDetail label="Unique Selling Point" value={project.pitch.uniqueSellingPoint} />
              <PitchDetail label="Marketing Strategy" value={project.pitch.marketingStrategy} />
            </div>
          </div>

          {/* Analysis Section */}
          <div className="mb-6">
            <AnalysisSection
              analyses={analysisByProjectId[project.id] || []}
              onAnalysisClick={(analysis) => {
                console.log('Analysis clicked:', analysis);
              }}
            />
          </div>

          {/* Target Personas Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Target Audience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockChatPersonas.slice(0, 3).map((persona, index) => (
                <div
                  key={persona.id} // Key moved to the wrapper div
                  onClick={() => handleSelectPersona(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault(); // Prevent default action for space (scrolling)
                      handleSelectPersona(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg" // Added for accessibility and UX
                >
                  <PersonaCard
                    // key prop removed from here
                    persona={{
                      ...persona, // Spread existing ChatPersona properties (e.g., id, name, avatar)
                      jobTitle: personaDetails[index].jobTitle,
                      needsSnippet: personaDetails[index].needsSnippet,
                      primaryDetail: persona.name, // Assuming 'name' from ChatPersona is the primary detail
                      description: personaDetails[index].background, // Using 'background' from personaDetails as description
                      accentColor: '#6B7280', // Default accent color
                    }}
                    isSelected={selectedIndex === index}
                    // onClick prop removed as it's not supported by PersonaCard
                    onShowDetails={() => handleShowPersonaDetails(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pitch Deck Preview */}
          {(project.stage === ProjectStage.DECK_CREATION || project.stage === ProjectStage.REFINEMENT) && project.pitchDeck?.slides.length ? (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pitch Deck</h2>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/project/${project.id}/deck`}>Edit Deck</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.pitchDeck.slides.slice(0, 6).map((slide) => (
                  <div key={slide.id} className="aspect-[16/9] bg-gray-100 rounded border flex items-center justify-center p-2">
                    <div className="text-center">
                      <p className="font-medium">{slide.content.title || "Slide"}</p>
                      <p className="text-xs text-gray-500">{slide.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Right column: Action Buttons */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <ActionButtons projectId={project.id} />
          </div>
        </div>
      </div>

      {/* Persona Modal */}
      {viewingPersona !== null && (
        <PersonaModal
          persona={mockChatPersonas[viewingPersona]}
          isOpen={viewingPersona !== null}
          onClose={handleCloseModal}
          jobTitle={personaDetails[viewingPersona].jobTitle}
          needsDetails={personaDetails[viewingPersona].needsDetails}
          background={personaDetails[viewingPersona].background}
          goals={personaDetails[viewingPersona].goals}
          challenges={personaDetails[viewingPersona].challenges}
          preferredCommunication={personaDetails[viewingPersona].preferredCommunication}
        />
      )}
    </div>
  );
}
